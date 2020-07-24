import React, {Fragment, useEffect, useState} from "react";
import {useStore} from "../../store";
import {useObserver} from "mobx-react";
import * as S from "./styles";
import {StyledLink} from "../styles";

export const Categories = () => {
    const {store} = useStore();

    useEffect(()=>{
        document.body.style.overflowY = "scroll";
        return (()=>(
            document.body.style.overflowY= "auto"
        ));
    },[]);

    function getColor(){ 
        return "hsl(" + 360 * Math.random() + ',' +
                   '90%,' + 
                   (40 + 15 * Math.random()) + '%)'
    }

    return useObserver(()=>(
        <div>
            <S.Header>
                <S.TitleContainer>
                    <S.Title>
                        Blitz!
                    </S.Title>
                    <br></br>
                    <S.Description>
                        Trivia game <br></br>
                        using <S.Anchor href="https://opentdb.com/">Open Trivia API</S.Anchor><br></br>
                    </S.Description>
                </S.TitleContainer>
            </S.Header>
            <S.Body show={store.categories.length>0}>
                {store.categories.map(
                (category)=>
                    <S.Category 
                        hoverColor={getColor()} 
                        key={category.id}
                    >
                        <StyledLink to={"/quiz/"+category.id}>
                            <S.Name>{category.name}</S.Name>
                        </StyledLink>
                    </S.Category>
                    
                )}
            </S.Body>
        </div>
    ))
}