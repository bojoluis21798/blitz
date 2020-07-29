import React, {useState, useEffect, Fragment, useRef} from "react";
import {useParams, Redirect} from "react-router-dom";
import {withRouter} from "react-router";
import * as Styled from "./styles";
import {Loading} from "../styles";
import {useLocalStore, useObserver} from "mobx-react";
import {reaction} from "mobx";
import {useStore} from "../../store";
import parse from "html-react-parser";
import {Textfit} from "react-textfit";

interface IQuestion{
    category:string;
    correct_answer:string;
    difficulty:string;
    incorrect_answers:string[];
    question:string;
    type:string;
}

export enum AnswerEval {
    CORRECT = "correct",
    WRONG = "wrong",
}

interface IChoice {
    eval: AnswerEval;
    text: string;
    isClicked: boolean;
}

interface IQuizStore {
    questions: IQuestion[];
    index: number;
    currentQuestion:string;
    category: string;
    timeRemaining: number;
    hasLoaded:boolean;
    hasFailed:boolean;
    hasCompleted:boolean;
    currentChoices:IChoice[];
    correctCount: number,
    next():void;
    resetTimer():void;
    pauseTimer():void;
}

// question length
const easyLength = 10;
const mediumLength = 7;
const hardLength = 3;
// wait time in before transitioning to the next question
const waitTime = 1000;
// Time given to answer question
const timeRemaining = 15;

//Timeout IDs
let timerID:NodeJS.Timeout = null;
let waitID:NodeJS.Timeout = null;
let transID:NodeJS.Timeout = null;
//let completedWaitID:NodeJS.Timeout = null;

export const Quiz = withRouter(({history}) => {
    const {id} = useParams();
    const {store} = useStore();      

    const quizStore = useLocalStore<IQuizStore>(()=>({
        questions: [],
        index: 0,
        hasCompleted: false,
        hasFailed: false,
        timeRemaining: timeRemaining,
        hasLoaded: false,
        correctCount: 0,
        get currentQuestion(){ 
            return this.questions[this.index].question;
        },
        get currentChoices(){
            let choices:IChoice[] = [];

            this.questions[this.index].incorrect_answers.forEach(answer=>choices.push({
                text: answer,
                eval:AnswerEval.WRONG,
                isClicked: false
            }));

            choices.splice(Math.floor(Math.random()*10)%4, 0, 
                {
                    text: this.questions[this.index].correct_answer,
                    eval: AnswerEval.CORRECT,
                    isClicked: false
                });
            return choices;
        },
        get category(){
            return this.questions[this.index].category;
        },
        next(){
            if(this.index+1 < this.questions.length){
                this.index++;
            }else{
                this.hasCompleted = true;
                clearInterval(timerID);
            }
        },
        resetTimer(){
            clearInterval(timerID);
            this.timeRemaining = timeRemaining;

            timerID = setInterval(()=>{
                if(this.timeRemaining > 0){
                    this.timeRemaining--;
                } else {
                    this.hasFailed = true;
                    clearInterval(timerID);
                }
            },1000);
        },
        pauseTimer(){
            clearInterval(timerID);
        }
    }))

    const [reveal, setReveal] = useState<boolean>(false);
    const [hasFetchError, setHasFetchError] = useState<boolean>(false);

    const fetchResponses = async () => {
        const settings = [
            {
                difficulty:"easy",
                length: easyLength
            }, {
                difficulty:"medium",
                length: mediumLength
            }, {
                difficulty: "hard",
                length: hardLength
            }];

        let resultsMap = settings.map(async (setting)=>{
            try{
                let response = await fetch(`https://opentdb.com/api.php?amount=${setting.length}&category=${id}&difficulty=${setting.difficulty}&type=multiple`);
                let data = await response.json();
                return data.results;
            }catch(e){
                setHasFetchError(true)
            };
        })

        let results = await Promise.all(resultsMap);

        results.forEach((result)=>{
            quizStore.questions = quizStore.questions.concat(result);
        });

        quizStore.hasLoaded = true;
        quizStore.resetTimer();
    }

    useEffect(()=>{
        fetchResponses();
    },[]);

    useEffect(()=>{
        transID = setTimeout(()=>{
            window.scrollTo(0, 0);
            clearTimeout(transID);
        },500);
    },[])

    useEffect(()=>{
        return ()=>{
            clearTimeout(waitID);
            clearInterval(timerID);
            clearTimeout(transID);
        }
    },[]);

    const handleRetryClick = ()=>{
        quizStore.questions = [];
        quizStore.hasCompleted = false;
        quizStore.hasFailed = false;
        quizStore.hasLoaded = false;
        fetchResponses();
    }

    const handleBackClick = () => {
        history.push({
            pathname: "/",
            state: {previousScreen: 1}
        })
    }

    const handleChoiceClick = (choice:IChoice)=>{
        quizStore.pauseTimer();
        
        choice.isClicked = true;
        if(choice.eval === AnswerEval.CORRECT){
            quizStore.correctCount++;
        }

        setReveal(true);
        waitID = setTimeout(()=>{
            quizStore.next();
            quizStore.resetTimer();
            choice.isClicked = false;
            setReveal(false);
        },waitTime)
    }

    return useObserver(()=>(
        <>
            {!quizStore.hasLoaded && 
                <Styled.Container justify="center">  
                    <Loading/>
                </Styled.Container>
            }
            {
                (quizStore.hasLoaded && !(quizStore.hasFailed || quizStore.hasCompleted)) &&
                <Styled.Container justify="space-between">
                    <Styled.HeadBack>
                        <Styled.Header>
                            <Styled.Back onClick={handleBackClick}>
                                <Styled.BackImage/>
                            </Styled.Back>
                            <Styled.TopInfo>
                                <Styled.Category>{quizStore.category}</Styled.Category>
                            </Styled.TopInfo>
                        </Styled.Header>
                        <Styled.Question>
                            <Textfit style={{height:'100%', width:"100%", display:"flex", alignItems:"center"}}>
                                {parse(quizStore.currentQuestion)}
                            </Textfit>
                        </Styled.Question>
                    </Styled.HeadBack>
                    <Styled.ChoicesContainer>   
                        {quizStore.currentChoices.map((choice,index)=>
                            <Styled.Choices
                                    key={index}
                                    eval={choice.eval}
                                    isClicked={choice.isClicked}
                                    reveal={reveal}
                                    onClick={(e)=>handleChoiceClick(choice)}
                                    disabled={reveal}
                            >  
                                {parse(choice.text)}
                            </Styled.Choices>
                        )}
                    </Styled.ChoicesContainer>
                    <Styled.Timer timeRemaining={quizStore.timeRemaining} timeTotal={timeRemaining}></Styled.Timer>
                </Styled.Container>
            }
            {
                (quizStore.hasCompleted || quizStore.hasFailed) &&
                <Styled.Container 
                    justify="space-around"
                    color={quizStore.hasCompleted ? "green":"red"}>
                    <Styled.StatusFinal>
                        {quizStore.hasCompleted ? "Success!": "Failed!"}
                    </Styled.StatusFinal>
                    <Styled.FinalScoreDisplay>
                        <Styled.FinalScoreText>
                            {quizStore.correctCount}/{quizStore.questions.length}
                        </Styled.FinalScoreText>
                    </Styled.FinalScoreDisplay>
                    <Styled.OptionsContainer>
                        <Styled.OptionsButtons onClick={handleRetryClick}>Retry</Styled.OptionsButtons>
                        <Styled.OptionsButtons onClick={handleBackClick}>Select Category</Styled.OptionsButtons>
                    </Styled.OptionsContainer>
                </Styled.Container>
            }  
        </>
    ));
});