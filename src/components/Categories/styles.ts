import styled from "styled-components";
import {Link} from "react-router-dom";

export const Category = styled.div`
    flex: 1,1,0;
    border:1px solid black;
    margin: 1em;
`; 

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

export const Name = styled.div`
    font-size: 2em;
    text-align: center;
    padding: 1em;
`;

export const Title = styled.span`
    font-size: 12em;
    font-weight: 900;
`;

export const Description = styled.span`
    font-size: 3em;
    text-align: center;
    color:white;
    font-weight: 100;
`;

export const Header = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 5em;
    padding-bottom: 5em;
    margin-bottom: 1em;
    flex-direction: column;
    background-color: #28587B;
`;

export const Anchor = styled.a`
    color: #BEDCFE
`;