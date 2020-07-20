import styled from "styled-components";

export const Category = styled.div`
    border:1px solid black;
    cursor: pointer;
    font-size: 2.5em;
    padding: 0.5em;
    margin: 1em;
    text-align: center;
`; 

export const Grid = styled.div`
    display: grid;
    grid-auto-columns: minmax(max-content, 2fr);
`;