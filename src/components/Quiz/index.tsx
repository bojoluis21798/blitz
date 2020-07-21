import React, {useState, useEffect, Fragment} from "react";
import {useParams} from "react-router-dom";
import {Container, Question, Choices} from "./styles";
import {useLocalStore, useObserver} from "mobx-react";

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

    const quizStore = useLocalStore<IQuizStore>(()=>({
        questions: [],
        index: 0,
        hasCompleted: false,
        get hasLoaded(){
            return this.questions.length > 0;
        },
        get currentQuestion(){ 
            return this.questions[this.index].question;
        },
        get currentChoices(){
            let choices:string[] = this.questions[this.index].incorrect_answers.slice(); 
            choices.splice(Math.floor(Math.random()*10)%4, 0, this.questions[this.index].correct_answer);
            return choices;
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

    useEffect(()=>{
        fetch(`https://opentdb.com/api.php?amount=10&category=${id}&difficulty=easy&type=multiple`)
        .then(response=>response.json())
        .then(data=>{
            quizStore.questions = data.results;
            console.log(quizStore.questions);
        })
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
        },1000)
    }
    
    console.log("Has Loaded: "+quizStore.hasLoaded);

    return useObserver(()=>(
        <Container>
            {!quizStore.hasLoaded && <p>Loading...</p>}

            {
                quizStore.hasLoaded &&
                <Fragment>
                    <Question>Question: {quizStore.currentQuestion}</Question>
                    {quizStore.currentChoices.map((choice,index)=>
                            <Choices key={index} 
                                    eval={quizStore.evaluateAnswer(choice)}
                                    reveal={reveal}
                                    onClick={handleChoiceClick}
                            >{choice}</Choices>
                        )
                    }
                </Fragment>
            }     
        </Container>
    ));
}