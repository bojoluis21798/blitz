import React, {useState, useEffect, Fragment, useRef} from "react";
import {useParams, Redirect} from "react-router-dom";
import {withRouter} from "react-router";
import * as Styled from "./styles";
import {Loading} from "../styles";
import {useLocalStore, useObserver} from "mobx-react";
import {when} from "mobx";
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

export enum EDifficulty {
    EASY = "Easy",
    MEDIUM = "Medium",
    HARD = "Hard"
}

interface IQuizStore {
    questions: IQuestion[];
    index: number;
    currentQuestion:string;
    category: string;
    timeRemaining: number;
    difficulty:EDifficulty;
    hasLoaded:boolean;
    hasFailed:boolean;
    hasCompleted:boolean;
    score:number;
    currentChoices:string[];
    correctCount: {
        easy: number;
        medium: number;
        hard: number;
    },
    addScore(num:number):void;
    next():void;
    evaluateAnswer(choice:string):AnswerEval;
    startTimer():void;
    resetTimer():void;
    pauseTimer():void;
}

export enum AnswerEval {
    CORRECT = "correct",
    WRONG = "wrong",
}

// question length
const easyLength = 10;
const mediumLength = 7;
const hardLength = 3;
// points added for each difficulty
const easyPoints = 1;
const mediumPoints = 3;
const hardPoints = 5;
// wait time in before transitioning to the next question
const waitTime = 500;
// Time given to answer question
const timeRemaining = 15;
// coin rewards for each correct answer per difficulty
const easyReward = 20;
const mediumReward = 30;
const hardReward = 50; 

//Timeout IDs
let timerID:NodeJS.Timeout = null;
let waitID:NodeJS.Timeout = null;
//let completedWaitID:NodeJS.Timeout = null;

export const Quiz = withRouter(({history}) => {
    //const {id} = useParams();
    const id = 9;
    const {store} = useStore();      
    
    const buttonRef:React.RefObject<HTMLButtonElement>[] = [
        useRef(null), useRef(null), useRef(null), useRef(null)
    ];

    const quizStore = useLocalStore<IQuizStore>(()=>({
        questions: [],
        index: 0,
        hasCompleted: false,
        hasFailed: false,
        timeRemaining: timeRemaining,
        hasLoaded: false,
        score: 0,
        correctCount: {
            easy: 0,
            medium: 0,
            hard: 0,
        },
        get currentQuestion(){ 
            return this.questions[this.index].question;
        },
        get currentChoices(){
            let choices:string[] = this.questions[this.index].incorrect_answers.slice(); 
            choices.splice(Math.floor(Math.random()*10)%4, 0, this.questions[this.index].correct_answer);
            return choices;
        },
        get difficulty(){
            const difficulty = this.questions[this.index].difficulty;
            switch(difficulty){
                case "easy":
                    return EDifficulty.EASY;
                case "medium":
                    return EDifficulty.MEDIUM;
                case "hard":
                    return EDifficulty.HARD;
            }
        },
        get category(){
            return this.questions[this.index].category;
        },
        addScore(num){
            this.score += num;
        },
        next(){
            if(this.index+1 < this.questions.length){
                this.index++;
            }else{
                this.hasCompleted = true;
            }
        },
        evaluateAnswer(choice){
            return (choice === this.questions[this.index].correct_answer)? AnswerEval.CORRECT: AnswerEval.WRONG;
        },
        startTimer(){
            timerID = setInterval(()=>{
                if(this.timeRemaining > 0){
                    this.timeRemaining--;
                } else {
                    this.hasFailed = true;
                    clearInterval(timerID);
                }
            },1000);
        },
        resetTimer(){
            clearInterval(timerID);
            this.timeRemaining = timeRemaining;

            this.startTimer();
        },
        pauseTimer(){
            clearInterval(timerID);
        }
    }))

    const [reveal, setReveal] = useState<boolean>(false);
    const [hasFetchError, setHasFetchError] = useState<boolean>(false);
    //const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

    useEffect(()=>{
        /*when(
            ()=>quizStore.hasLoaded,
            ()=>quizStore.startTimer()
        );*/

        when(
            ()=>quizStore.hasCompleted || quizStore.hasFailed,
            ()=>{
                clearInterval(timerID);
                /*completedWaitID = setTimeout(()=>{
                    setShouldRedirect(true);
                },1000)*/
            }
        );
    }, []);

    useEffect(()=>{
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
        }

        fetchResponses();
    },[]);

    useEffect(()=>{
        return ()=>{
            clearTimeout(waitID);
            clearInterval(timerID);
            //clearTimeout(completedWaitID);
        }
    },[]);

    const handleBackClick = () => {
        history.push({
            pathname: "/",
            state: {previousScreen: 1}
        })
    }

    const handleChoiceClick = (ref:React.RefObject<HTMLButtonElement>, choice:string, difficulty:EDifficulty)=>{
        quizStore.pauseTimer();
        
        if(quizStore.evaluateAnswer(choice)===AnswerEval.CORRECT){
            ref.current.style.backgroundColor = "green";
            switch(difficulty){
                case EDifficulty.EASY:
                    quizStore.correctCount.easy++;
                    quizStore.addScore(easyPoints);
                    break;
                case EDifficulty.MEDIUM:
                    quizStore.correctCount.medium++;
                    quizStore.addScore(mediumPoints);
                    break;
                case EDifficulty.HARD:
                    quizStore.correctCount.hard++;
                    quizStore.addScore(hardPoints);
                    break;
            }
        }else{
            ref.current.style.backgroundColor = "red";
            ref.current.style.color = "white";
        }

        setReveal(true);
        waitID = setTimeout(()=>{
            quizStore.next();
            quizStore.resetTimer();
            ref.current.style.backgroundColor = "";
            ref.current.style.color = "";
            setReveal(false);
        },waitTime)
    }

    return useObserver(()=>(
        <Styled.Container loaded={quizStore.hasLoaded}>    
            {!quizStore.hasLoaded && <Loading/>}

            {
                (quizStore.hasLoaded && !(quizStore.hasFailed || quizStore.hasCompleted)) &&
                <>
                    <Styled.Header>
                        <Styled.Back onClick={handleBackClick}></Styled.Back>
                        <Styled.TopInfo>
                            <Styled.Category>{quizStore.category}</Styled.Category>
                        </Styled.TopInfo>
                    </Styled.Header>
                    <Styled.Question>
                        <Textfit style={{height:'100%', width:"100%", display:"flex", alignItems:"center"}}>
                            {parse(quizStore.currentQuestion)}
                        </Textfit>
                    </Styled.Question>
                    <Styled.ChoicesContainer>   
                        {quizStore.currentChoices.map((choice,index)=>
                            <Styled.Choices
                                    key={index}
                                    eval={quizStore.evaluateAnswer(choice)}
                                    reveal={reveal}
                                    ref={buttonRef[index]}
                                    onClick={(e)=>handleChoiceClick(buttonRef[index], choice, quizStore.difficulty)}
                                    disabled={reveal}
                            >  
                                {parse(choice)}
                            </Styled.Choices>
                        )}
                    </Styled.ChoicesContainer>
                    <Styled.Timer>{quizStore.timeRemaining}</Styled.Timer>
                </>
            }

            {
                (quizStore.hasCompleted || quizStore.hasFailed) &&
                <>
                    <h1>Your Final Score: {quizStore.score}</h1>
                    <h1>Easy: {quizStore.correctCount.easy} x {easyPoints}</h1>
                    <h1>Medium: {quizStore.correctCount.medium} x {mediumPoints}</h1>
                    <h1>Hard: {quizStore.correctCount.hard} x {hardPoints}</h1>
                    {quizStore.hasCompleted ? <h1>Completed</h1>:<h1>Failed</h1>}
                </>
            }  
        </Styled.Container>
    ));
});