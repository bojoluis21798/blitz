import * as React from "react";
import {Categories, Quiz} from './components';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {withRouter} from "react-router";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import "./App.css";

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
                key={router.location.pathname}
                classNames={animationClassName}
                timeout={500}
                onEnter={()=>document.body.style.overflowX = "hidden"}
                onEntered={()=>document.body.style.overflowX = "auto"}
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
        <div className="App">
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <AnimatedSwitch/>
            </BrowserRouter>
        </div>
    );
}