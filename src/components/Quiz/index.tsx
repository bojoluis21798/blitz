import React, {useState, useEffect, Fragment} from "react";
import {useParams, Redirect} from "react-router-dom";
import {Container, Question, Choices, Difficulty, Timer} from "./styles";
import {useLocalStore, useObserver} from "mobx-react";
import {when} from "mobx";
import parse from "html-react-parser";

interface IQuestion{
    category:string;
    correct_answer:string;
    difficulty:string;
    incorrect_answers:string[];
    question:string;
    type:string;
}

interface IQuizStore {
    questions: IQuestion[];
    index: number;
    currentQuestion:string;
    timeRemaining: number;
    difficulty:string;
    hasLoaded:boolean;
    hasFailed:boolean;
    hasCompleted:boolean;
    currentChoices:string[];
    next():void;
    evaluateAnswer(choice:string):AnswerEval;
    startTimer():void;
}

export enum AnswerEval {
    CORRECT = "correct",
    WRONG = "wrong",
}


export const Quiz = () => {
    const {id} = useParams();

    // question length
    const easyLength = 10;
    const mediumLength = 7;
    const hardLength = 3;
    const maxLength = easyLength+mediumLength+hardLength;
    // wait time in before transitioning to the next question
    const waitTime = 500;
    // Time given to answer question
    const timeRemaining = 15;

    let timerID:NodeJS.Timeout = null;
    let waitID:NodeJS.Timeout = null;
    let completedWaitID:NodeJS.Timeout = null;

    const quizStore = useLocalStore<IQuizStore>(()=>({
        questions: [],
        index: 0,
        hasCompleted: false,
        hasFailed: false,
        timeRemaining: timeRemaining,
        get hasLoaded(){
            return this.questions.length === maxLength;
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
            return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        },
        next(){
            if(this.index+1 < this.questions.length){
                this.resetTimer();
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
        }
    }))

    const [reveal, setReveal] = useState<boolean>(false);
    const [hasFetchError, setHasFetchError] = useState<boolean>(false);
    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

    useEffect(()=>{
        when(
            ()=>quizStore.hasLoaded,
            ()=>quizStore.startTimer()
        );

        when(
            ()=>quizStore.hasCompleted || quizStore.hasFailed,
            ()=>{
                clearInterval(timerID);
                completedWaitID = setTimeout(()=>{
                    setShouldRedirect(true);
                },1000)
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
            })
        }

        fetchResponses();
    },[]);

    useEffect(()=>{
        return ()=>{
            clearTimeout(waitID);
            clearInterval(timerID);
            clearTimeout(completedWaitID);
        }
    },[]);

    function handleChoiceClick(){
        setReveal(true);
        waitID = setTimeout(()=>{
            quizStore.next();
            setReveal(false);
        },waitTime)
    }

    return useObserver(()=>(
        <Container>
            {!quizStore.hasLoaded && <p>Loading...</p>}

            {
                quizStore.hasLoaded &&
                <Fragment>
                    <Question>Question: {parse(quizStore.currentQuestion)}</Question>
                    {quizStore.currentChoices.map((choice,index)=>
                            <Choices key={index} 
                                    eval={quizStore.evaluateAnswer(choice)}
                                    reveal={reveal}
                                    onClick={handleChoiceClick}
                                    disabled={reveal}
                            >{parse(choice)}</Choices>
                        )
                    }
                    <Difficulty>Difficulty: {quizStore.difficulty}</Difficulty>
                    <Timer>{quizStore.timeRemaining}</Timer>
                </Fragment>
            }

            {
                quizStore.hasCompleted &&
                <p>Completed...</p>
            }     

            {
                quizStore.hasFailed && 
                <p>Failed ...</p>
            }

            {
                shouldRedirect &&
                <Redirect to="/"/>
            }
        </Container>
    ));
}