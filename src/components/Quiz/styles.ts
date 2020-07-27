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
    justify-content: ${props=>props.loaded ? 'space-between': 'center'};
    background-color:#000121;
    height:100%;
`;

export const Question = styled.div`
    display:flex;
    text-align:center;
    justify-content:center;
    align-items:center;
    font-weight: 900;
    height: 8em;
    width: 90%;
    margin:3vw;
    color:white;
`;

export const Difficulty = styled.div`
    font-size: 3vw;
    @media(max-width:1024px){
        font-size: 5vw;
    }
    font-weight: 100;
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
    padding-bottom: 1em;
`;

export const Header = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width: 90%;
    @media(max-width:1024px){
        padding-top: 5vw;
    }
    padding-top: 1vw;
`;

export const Category = styled.span`
    @media(max-width:1024px){
        font-size: 7vw;
    }
    font-size: 4vw;
    font-weight: 100;
    color:white;
`;

export const Back = styled.div`
    background-image: url('${require('../../assets/back.png').default}');
    background-size: 100% 100%;
    @media(max-width:1024px){
        height: 10vw;
        width: 10vw;
    }
    height: 4vw;
    width: 4vw;
    position:absolute;
    left:1%;
`;

export const TopInfo = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    color:white;
    justify-content:center;
`;

export const Choices = styled.button<ChoicesProps>`
    border-radius: 1em;
    border:none;
    outline:none;
    @media(max-width:1024px){
        width: 85vw;
        height: 25vw;
        font-size: 6vw;
    }
    box-shadow: 2px 2px 10px black;
    display: flex;
    justify-content:center;
    align-items:center;
    height: 7.5vw;
    width: 44vw;
    font-size: 4vw;
    text-align:center;
    font-weight: 100;
    color: ${props=>props.eval === AnswerEval.CORRECT && props.reveal ? "white": "black"};
    background-color: ${props=>props.eval === AnswerEval.CORRECT && props.reveal ? `green`:`white`};
`;