import styled from "styled-components";
import {AnswerEval} from "./index"

const border = `border: 1px solid black;`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Question = styled.div`
    ${border}
`;

interface ChoicesProps {
    eval:AnswerEval;
    reveal:boolean;
}

export const Choices = styled.div<ChoicesProps>`
    ${border}
    background-color: ${props=>props.eval === AnswerEval.CORRECT && props.reveal ? `green`:`white`};
`;