import * as React from "react";
import {Categories, Quiz} from './components';
import styled from "styled-components";
import {BrowserRouter, Switch, Route} from "react-router-dom";

const StyleContainer = styled.div`
    font-family: 'Roboto', sans-serif;
    @media (max-width: 768px){
        font-size: 10px;
    }
`;

export const App = () => {

    return(
        <BrowserRouter>
            <StyleContainer>
                <Switch>
                    <Route exact path="/">
                        <Categories/>
                    </Route>
                    <Route exact path="/quiz/:id">
                        <Quiz/>
                    </Route>
                </Switch>
            </StyleContainer>
        </BrowserRouter>
    );
};