import styled from "styled-components";
import {Link} from "react-router-dom";

interface CategoryProps {
    hoverColor: string;
}
export const Category = styled.div<CategoryProps>`
    flex: 1,1,0;
    border-radius: 10px;
    box-shadow: 1px 1px 5px black;
    margin: 1em;
    background-color: white;
    &:hover {
        background-color: ${props=>props.hoverColor};
    };
    transition: 0.3s;
`; 

export const Name = styled.div`
    font-size: 2em;
    text-align: center;
    padding: 1em;
    &:hover{
        color:white;
    }
`;

export const Header = styled.div`
    position:fixed;
    z-index: 1;
    height: 100%;
    width: 100%;
    text-align:center;
    background-image: url('../../static/assets/background.jpg');
    background-size: 100% 80%;
    background-repeat: no-repeat;
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

export const Description = styled.span`
    font-size: 2em;
    font-weight: 100;
    color: white;
`;

export const Container = styled.div`
    z-index: 2;
    position:absolute;
    display:flex;
    flex-flow: wrap;
    align-items:center;
    justify-content:center;
    box-shadow: 0 -5px 20px 5px black;
    width: 100%;
    top: 80%;
    background-color: white;
`;

export const Anchor = styled.a`
    color: #BEDCFE
`;