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
    width: 100%;
    overflow-x:hidden;
`;

export const StatusFinal = styled.span`
    margin-top: 2vh;
    margin-bottom: 2vh;
    font-size: 5em;
    color:white;
    font-weight: 900;
`; 

export const OptionsButtons = styled.button`
    border-radius: 2%;
    @media(max-width: 768px){
        width: 80vw;
    }
    padding: 1vh 1vw 1vh 1vw;
    margin: 1vh 1vw 1vh 1vw;
    height: 15vh;
    width: 30vw;
    font-size: 2em;
    box-shadow: 3px 3px 10px black;
    background-color: white;
    outline:none;
    border:none;
`;

export const OptionsContainer = styled.div`
    display: flex;
    width: 100%;
    @media(max-width: 768px){
        flex-direction: column;
    }
    justify-content: center;
    align-items: center;
`;

export const FinalScoreDisplay = styled.div`
    border-radius: 50%;
    background-color:white;
    box-shadow: 3px 3px 10px black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    height: 13em;
    width: 13em;
`;

export const FinalScoreText = styled.span`
    font-weight: 400;
    font-size: 5em;
`;

export const Question = styled.div`
    display:flex;
    text-align:center;
    justify-content:center;
    align-items:center;
    font-weight: 900;
    margin: 1vh 1vw 1vh 1vw;
    @media(max-width:768px){
        height: 25vh;
    }
    height: 25vh;
    width: 90%;
    color:white;
`;

interface TimerProps{
    timeRemaining: number;
    timeTotal: number;
}
export const Timer = styled.div<TimerProps>`
    height: 2vh;
    border-radius: 2%;
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
    eval: AnswerEval;
    reveal:boolean;
    disabled:boolean;
    isClicked: boolean;
}

export const ChoicesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-gap: 1vh 1vw;
    @media(max-width:768px){
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
    padding-top: 2vh;
`;

export const Category = styled.span`
    font-size: 2em;
    font-weight: 100;
    color:white;
`;

export const Back = styled.div`
    height: 2em;
    width: 1.5em;
    position:absolute;
    left: 0.5%;
    top:1%;
    cursor: pointer;
`;

export const BackImage = styled.img.attrs(()=>({
    src: require("../../../assets/back.png").default,
    alt: "Back",
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
    border-radius: 2%;
    border:none;
    outline:none;
    @media(max-width:768px){
        width: 85vw;
        height: 13vh;
    }
    height: 15vh;
    width: 44vw;
    font-size: 1.5em;
    box-shadow: 2px 2px 10px black;
    display: flex;
    justify-content:center;
    align-items:center;
    text-align:center;
    font-weight: 300;
    color:black;
    background-color: white;
    ${props=>{
        if(props.eval === AnswerEval.CORRECT && props.reveal) 
            return `background-color:green; color:white;`;
        else if(props.eval === AnswerEval.WRONG && props.isClicked && props.reveal)
            return 'background-color:red; color:white';
    }};
`;