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
    const routes = ["", "quiz"];

    let currentScreen:number;
    routes.forEach((route,index)=>{
        let pathname = router.location.pathname.slice(1);
        if(pathname !== "") {
            pathname = pathname.slice(0, pathname.indexOf("/"));
        }
        if(route === pathname){
            currentScreen = index;
        }
    });
    const state:Location = router.location.state;
    const previousScreen = state ? state.previousScreen : 0;
    const animationClassName = currentScreen > previousScreen ? "fade" : "slide-backward";
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
                    <Route path="/quiz/:id/:name">
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
            <BrowserRouter>
                    <AnimatedSwitch/>
            </BrowserRouter>
        </div>
    );
}