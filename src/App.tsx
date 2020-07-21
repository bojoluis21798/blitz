import * as React from "react";
import {Categories, Header} from './components';
import styled from "styled-components";
import {BrowserRouter, Switch, Route} from "react-router-dom";

const StyleContainer = styled.div`
    font-family: 'Roboto';
    padding: 1em;
`;

export const App = () => {

    return(
        <StyleContainer>
            <Header/>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Categories/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </StyleContainer>
    );
};