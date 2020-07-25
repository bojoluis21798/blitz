import styled, {keyframes} from "styled-components";
import {Link} from "react-router-dom";

export const Category = styled(Link)`
    flex: 1,1,0;
    border-radius: 10px;
    box-shadow: 2px 2px 5px black;
    margin: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1em;
    flex-direction: column;
    text-decoration: none;
    transition: 0.3s;
    &:hover{
        box-shadow: 2px 2px 10px black;
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
    font-weight: 400;
    color:black;
    text-align:center;
    width: 5em;
    height: 3em;
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
    
`;

export const Title = styled.span`
    font-size: 5em;
    font-weight: 900;
    color:white;
`;

export const Text = styled.span`
    font-size: 2em;
    font-weight: 300;
    color: white;
`;

export const CategoryLabel =styled.span`
    font-size: 3em;
    font-weight: 700;
    color: black;
    margin: 0.3em;
`;

interface BodyProps{
    show: boolean;
}
export const Body = styled.div<BodyProps>`
    padding-top: 1em;
    padding-bottom:1em;
    display: flex;
    flex-direction:column;
    box-shadow: 0 -20px 20px -20px black;
`;

const logoPic = require("../../assets/logo.png");

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