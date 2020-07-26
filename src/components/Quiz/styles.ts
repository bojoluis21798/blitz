import styled from "styled-components";
import {AnswerEval} from "./index";

const border = `border: 1px solid black;`;

interface ContainerProps {
    loaded:boolean;
}
export const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color:white;
    ${props=>props.loaded?"":"height:100%;"}
`;

export const Question = styled.div`
    display:flex;
    text-align:center;
    justify-content:center;
    align-items:center;
    font-weight: 900;
    height: 9em;
    width: 90%;
    margin:0.5em;
`;

export const Difficulty = styled.div`
    ${border}
`;

export const Timer = styled.div`
    ${border}
`;

export const Score = styled.div`
    ${border}
`;

interface ChoicesProps {
    eval:AnswerEval;
    reveal:boolean;
    disabled:boolean;
}

export const ChoicesContainer = styled.div`
    display: grid;
    grid-gap: 3vw;
    grid-template-columns: repeat(2,1fr);
    @media(max-width:1024px){
        grid-gap: 1vh;
        grid-template-columns:1fr;
    }
`;


export const Choices = styled.button<ChoicesProps>`
    ${border}
    @media(max-width:1024px){
        width: 85vw;
        height: 25vw;
        font-size: 6vw;
    }
    display: flex;
    font-size: 3vw;
    justify-content:center;
    align-items:center;
    height: 10vw;
    width: 40vw;
    text-align:center;
    font-weight: 100;
    background-color: ${props=>props.eval === AnswerEval.CORRECT && props.reveal ? `green`:`white`};
`;