import * as React from "react";
import {Categories, Header} from './components';
import styled from "styled-components";

const StyleContainer = styled.div`
    font-family: 'Roboto';
    padding: 1em;
`;

export const App = () => {

    return(
        <StyleContainer>
            <Header/>
            <Categories/>
        </StyleContainer>
    );
};