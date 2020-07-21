import styled from "styled-components";
import {Link} from "react-router-dom";

export const Category = styled.div`
    flex: 1,1,0;
    border:1px solid black;
    cursor: pointer;
    font-size: 2em;
    text-align: center;
    padding: 1em;
    margin: 1em;
`; 

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color:black;
`;