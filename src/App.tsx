import * as React from "react";
import {Categories, Header, Quiz} from './components';
import styled from "styled-components";
import {BrowserRouter, Switch, Route} from "react-router-dom";

const StyleContainer = styled.div`
    font-family: 'Roboto';
    padding: 1em;
`;

export const App = () => {

    return(
        <BrowserRouter>
            <StyleContainer>
                <Header/>
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