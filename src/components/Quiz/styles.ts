import styled from "styled-components";
import {AnswerEval} from "./index"

const border = `border: 1px solid black;`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color:white;
    width:100%;
    height:100%;
`;

export const Question = styled.div`
    ${border}
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
}

export const Choices = styled.button<ChoicesProps>`
    ${border}
    background-color: ${props=>props.eval === AnswerEval.CORRECT && props.reveal ? `green`:`white`};
`;