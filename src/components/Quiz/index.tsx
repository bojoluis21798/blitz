import React, {useState, useEffect, Fragment} from "react";
import {useParams} from "react-router-dom";
import {Container, Question, Choices} from "./styles";

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

export const Quiz = () => {
    const {id} = useParams();
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [index, setIndex] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<string>("");
    const [currentChoices, setCurrentChoices] = useState<string[]>([]);
    const [reveal, setReveal] = useState<boolean>(false);

    useEffect(()=>{
        fetch(`https://opentdb.com/api.php?amount=10&category=${id}&difficulty=easy&type=multiple`)
        .then(response=>response.json())
        .then(data=>{
            setQuestions(data.results);
        })
    },[])
    
    
    useEffect(()=>{
        if(questions.length > 0){
            //put all choices in one array; randomly insert correct answer to incorrect answers array
            let choices:string[] = questions[index].incorrect_answers.slice(); 
            choices.splice(Math.floor(Math.random()*10)%4, 0, questions[index].correct_answer);
            
            setCurrentChoices(choices);

            setCurrentQuestion(questions[index].question);
        }
    },[questions,index]);

    function handleChoiceClick(){
        setReveal(true);
        let timer = setTimeout(()=>{
            setIndex(index+1);
            setReveal(false);
        },1000)

        clearTimeout(timer);
    }
    //determines if choice is correct or wrong
    function handleEval(currentChoice:string, correctAnswer:string):AnswerEval {
        return (currentChoice === correctAnswer)? AnswerEval.CORRECT: AnswerEval.WRONG;
    }

    return(
        <Container>
            {(questions.length === 0) && <p>Loading...</p>}

            {
                (questions.length > 0) &&
                <Fragment>
                    <Question>Question: {questions[index].question}</Question>
                    {currentChoices.map((choice,index)=>
                            <Choices key={index} 
                                    eval={handleEval(choice, questions[index].correct_answer)}
                                    reveal={reveal}
                                    onClick={handleChoiceClick}
                            >{choice}</Choices>
                        )
                    }
                </Fragment>
            }
            
            
            
        </Container>
    );
}