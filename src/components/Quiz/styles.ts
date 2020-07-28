import styled, {keyframes} from "styled-components";
import {AnswerEval} from "./index";

const border = `border: 1px solid black;`;

interface ContainerProps {
    justify: string;
    color?: string;
}
export const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${props=>props.justify};
    background-color: ${props=>props.color || 'white'};
    height:100%;
    overflow-x:hidden;
`;

export const StatusFinal = styled.span`
    @media(max-width: 1024px){
        font-size: 20vw;
        margin: 5vw;
    }
    font-size: 10vw;
    color:white;
    font-weight: 900;
`; 

export const OptionsButtons = styled.button`
    border-radius: 2vw;
    @media(max-width: 1024px){
        margin: 1vw;
        heigth: 45vw;
        width: 45vw;
        padding: 2vw;
        font-size: 8vw;
    }
    box-shadow: 3px 3px 10px black;
    font-size: 3vw;
    margin: 1vw;
    heigth: 15vw;
    width: 30vw;
    padding: 2vw;
    background-color: white;
    outline:none;
    border:none;
`;

export const OptionsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: space-around;
`;

export const FinalScoreDisplay = styled.div`
    border-radius: 50%;
    background-color:white;
    box-shadow: 3px 3px 10px black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media(max-width:1024px){
        width: 50vw;
        height: 50vw;
        margin: 2vw;
        font-size: 30vw;
    }
    width: 20vw;
    height: 20vw;
    font-size: 1vw;
`;

export const FinalScoreText = styled.span`
    font-weight: 400;
    @media(max-width:1024px){
        font-size: 10vw;
    }
    font-size: 7vw;
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

interface TimerProps{
    timeRemaining: number;
    timeTotal: number;
}
export const Timer = styled.div<TimerProps>`
    height: 2vw;
    border-radius: 2vw;
    width: ${props=>(props.timeRemaining)/(props.timeTotal)*100}%;
    background-color: ${props => {
        if((props.timeRemaining)/(props.timeTotal) > 0.5){
            return "#00c21d";
        }else if((props.timeRemaining)/(props.timeTotal) > 0.2){
            return "#c27b00";
        }else{
            return "#c20600";
        }
    }};
    transition: 1000ms linear;
`;

export const Score = styled.div`
    ${border}
`;

interface ChoicesProps {
    eval:AnswerEval;
    reveal:boolean;
    disabled:boolean;
    isClicked: boolean;
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

export const HeadBack = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #000121;
    width:100%;
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
    @media(max-width:1024px){
        height: 10vw;
        width: 10vw;
    }
    height: 4vw;
    width: 4vw;
    position:absolute;
    left:1%;
    cursor: pointer;
`;

export const BackImage = styled.img.attrs(()=>({
    src: require("../../../assets/back.png").default,
}))`
    width: 100%;
    height: 100%;
`;

export const TopInfo = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    color:white;
    justify-content:center;
`;

export const Choices = styled.button<ChoicesProps>`
    border-radius: 2vw;
    border:none;
    outline:none;
    @media(max-width:1024px){
        width: 85vw;
        height: 25vw;
        font-size: 5vw;
    }
    box-shadow: 2px 2px 10px black;
    display: flex;
    justify-content:center;
    align-items:center;
    height: 7.5vw;
    width: 44vw;
    font-size: 3vw;
    text-align:center;
    font-weight: 100;
    color:black;
    ${props=>{
        if(props.eval === AnswerEval.CORRECT && props.reveal) 
            return `background-color:green; color:white;`;
        else if(props.eval === AnswerEval.WRONG && props.isClicked && props.reveal)
            return 'background-color:red; color:white';
        else 
            return `white`;
    }};
`;