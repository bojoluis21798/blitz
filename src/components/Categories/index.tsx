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

    function getColor(index:number){ 
        const step = 360/store.categories.length;
        return "hsl(" + (index*step) + ',' + '90%, 25%)'
    }

    const show = store.categories.length > 0;

    return useObserver(()=>(
        <div>
            <S.Header>
                <S.TitleContainer>
                    <S.Title>
                        Blitz!
                    </S.Title>
                    <br></br>
                    <S.Text>
                        Trivia game
                        using <S.Anchor href="https://opentdb.com/">Open Trivia API</S.Anchor><br></br>
                    </S.Text>
                </S.TitleContainer>
            </S.Header>
            <S.Body show={show}>
                {show &&
                    <S.CategoryLabel>Categories</S.CategoryLabel>
                }
                <S.CategoryWrap>
                    {store.categories.map(
                    (category,index)=>
                    <S.Category 
                        color={getColor(index)} 
                        key={category.id}
                    >
                        <StyledLink to={"/quiz/"+category.id}>
                            <S.Name>{category.name}</S.Name>
                        </StyledLink>
                    </S.Category>
                    )}
                </S.CategoryWrap>
            </S.Body>
        </div>
    ))
}