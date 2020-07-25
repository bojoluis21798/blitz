import * as React from "react";
import {Categories, Quiz} from './components';
import styled from "styled-components";
import {BrowserRouter, Switch, Route, RouteComponentProps} from "react-router-dom";
import {withRouter, StaticContext} from "react-router";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import "./App.css";

const StyleContainer = styled.div`
    font-family: 'Roboto', sans-serif;
    @media (max-width: 768px){
        font-size: 10px;
    }
`;

interface Location {
    previousScreen?: number;
}
const AnimatedSwitch = withRouter((router) => {
    const routes = [/(\/)/g, /(\/quiz\/([1-9])*)/g];

    let currentScreen:number;
    routes.forEach((route,index)=>{
        if(route.test(router.location.pathname)){
            currentScreen = index;
        }
    });
    const state:Location = router.location.state;
    const previousScreen = state ? state.previousScreen : 0;
    const animationClassName = currentScreen > previousScreen ? "slide-forward" : "slide-backward";
    console.log(animationClassName);
    return(
        <TransitionGroup
            childFactory={child=>
                React.cloneElement(child, {
                    classNames: animationClassName
                })
            }
        >
            <CSSTransition
                key={router.location.key}
                classNames={animationClassName}
                timeout={1000}
            >
                <Switch location={router.location}>
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
            </CSSTransition>
        </TransitionGroup>
    );
});

export const App = () => {

    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <StyleContainer>
                <AnimatedSwitch/>
            </StyleContainer>
        </BrowserRouter>
    );
}