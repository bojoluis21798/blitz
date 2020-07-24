import styled, {keyframes} from "styled-components";
import {Link} from "react-router-dom";

const Image = require("../../assets/background.jpg");

interface CategoryProps {
    color: string;
}
export const Category = styled.div<CategoryProps>`
    flex: 1,1,0;
    border-radius: 10px;
    box-shadow: 1px 1px 5px black;
    margin: 1em;
    background-color: ${props=>props.color};
    transition: 0.3s;
`; 

export const Name = styled.div`
    font-size: 2.5em;
    font-weight: 600;
    text-align: center;
    padding: 0.8em;
    color:white;
`;

export const Header = styled.div`
    position:fixed;
    z-index: 1;
    height: 100%;
    width: 100%;
    text-align:center;
    background-image: url(${Image.default});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: #28587B;
`;

export const TitleContainer = styled.div`
    position:relative;
    top: 20%;
`;

export const Title = styled.span`
    font-size: 10em;
    font-weight: 900;
    color:white;
`;

export const Text = styled.span`
    font-size: 2em;
    font-weight: 100;
    color: white;
`;

export const CategoryLabel =styled(Text)`
    font-size: 5em;
    text-decoration: underline;
    font-weight: 600;
    color: black;
    margin-left:0.5em;
`;

interface BodyProps{
    show: boolean;
}
export const Body = styled.div<BodyProps>`
    padding-top: 1em;
    top: 100%;
    display: hidden;
    display: ${props=>props.show && "flex"};
    flex-direction:column;
    align-items: center;
    top: ${props=>props.show && 70}%;
    transition: 1s;
    z-index: 2;
    position:absolute;
    box-shadow: 0 -5px 20px 5px black;
    width: 100%;
    background-color: white;
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