import styled, {keyframes} from "styled-components";
import {Link} from "react-router-dom";

const CategoryAnim = keyframes`
    from {
        opacity: 0;
    }
    top {
        opactiy: 1;
    }
`;

interface CategoryProps {
    length: number;
}
export const Category = styled.div<CategoryProps>`
    border-radius: 10px;
    box-shadow: 2px 2px 5px black;
    margin: 1em;
    padding-top: 2em;
    background-color:white;
    align-items: center;
    justify-content: center;
    display:flex;
    flex-direction: column;
    text-decoration: none;
    animation: 0.2s ${CategoryAnim} linear;
    ${props=>{
        let delayAnim = "";
        for(let i = 2; i<=props.length; i++){
            delayAnim = delayAnim + `&:nth-of-type(${i}n){animation-duration:${(i)*0.2}s;}`;
        }
        return delayAnim;
    }}
    &:hover{
        box-shadow: 2px 2px 10px black;
        cursor:pointer;
    }
    &:click{
        box-shadow: 2px 2px 10px black;
    }
`; 

interface CategoryLogoProps{
    name: string
}
export const CategoryLogo = styled.img.attrs<CategoryLogoProps>(({name})=>{
    try{
        return {src: require(`../../assets/${name}.png`).default};
    }catch(e){
        return {src: require("../../assets/logo.png").default};
    }
}
)<CategoryLogoProps>`
    height: 5em;
    width: 5em;
    padding: 1em;
`;

export const Name = styled.div`
    font-size: 2em;
    font-weight: 300;
    color:black;
    text-align:center;
    width: 6em;
    height: 3em;
    margin: 1em;
    display: flex;
    align-items: center;
    justify-content:center;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color:#25185e; 
    padding: 1em;
    @media(max-width:768px){
        flex-direction: column;
    }
`;

export const TitleContainer = styled.div`
    margin: 2em;
    text-align:center;
`;

export const Container = styled.div`
    width:100%;
    height:100%;
`;

export const Title = styled.span`
    font-size: 5em;
    font-weight: 900;
    color:white;
`;

interface TextProps{
    color?:string;
    size?:string;
}
export const Text = styled.span<TextProps>`
    font-weight: 300;
    color: ${props=>props.color || "white"};
    font-size: ${props=>props.size || "2"}em;
`;

export const CategoryLabel =styled.span`
    font-size: 3em;
    font-weight: 700;
    color: black;
    margin: 0.3em;
`;


export const Body = styled.div`
    padding-top: 1em;
    padding-bottom:1em;
    display: flex;
    flex-direction:column;
    box-shadow: 0 -20px 20px -20px black;
`;

export const Logo = styled.img.attrs(()=>({
    src: require("../../assets/logo.png").default,
}))`
    height: 10em;
    width: 10em;
`;

export const CategoryWrap = styled.div`
    display:flex;
    flex-flow: wrap;
    align-items:center;
    justify-content:center;
`;

export const Anchor = styled.a`
    color: #BEDCFE
`;