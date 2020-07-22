import React, {useState, useEffect, Fragment} from "react";
import {useParams} from "react-router-dom";
import {Container, Question, Choices, Difficulty} from "./styles";
import {useLocalStore, useObserver} from "mobx-react";
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
    difficulty:string;
    hasLoaded:boolean;
    hasCompleted:boolean;
    currentChoices:string[];
    next():void;
    evaluateAnswer(choice:string):AnswerEval;
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

    const quizStore = useLocalStore<IQuizStore>(()=>({
        questions: [],
        index: 0,
        hasCompleted: false,
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
                this.index++;
            }else{
                this.hasCompleted = true;
            }
        },
        evaluateAnswer(choice){
            return (choice === this.questions[this.index].correct_answer)? AnswerEval.CORRECT: AnswerEval.WRONG;
        }
    }))

    const [reveal, setReveal] = useState<boolean>(false);
    const [hasFetchError, setHasFetchError] = useState<boolean>(false);

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

    let timer:NodeJS.Timeout = null;

    useEffect(()=>{
        return clearTimeout(timer);
    });

    function handleChoiceClick(){
        setReveal(true);
        timer = setTimeout(()=>{
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
                            >{parse(choice)}</Choices>
                        )
                    }
                    <Difficulty>Difficulty: {quizStore.difficulty}</Difficulty>
                </Fragment>
            }     
        </Container>
    ));
}