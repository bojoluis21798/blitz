import * as React from "react";
import {Categories, Quiz} from './components';
import styled from "styled-components";
import {BrowserRouter, Switch, Route} from "react-router-dom";

const StyleContainer = styled.div`
    font-family: 'Roboto', sans-serif;
    @media (max-width: 768px){
        font-size: 12px;
    }
`;

export const App = () => {

    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <StyleContainer>
                <Switch>
                    <Route exact path="/">
                        <Categories/>
                    </Route>
                    <Route path="/quiz/:id">
                        <Quiz/>
                    </Route>
                    <Route path="*">
                        <p>Error</p>
                    </Route>
                </Switch>
            </StyleContainer>
        </BrowserRouter>
    );
};