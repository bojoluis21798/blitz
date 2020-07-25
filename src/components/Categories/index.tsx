import React, {Fragment, useEffect, useState} from "react";
import {useStore} from "../../store";
import {useObserver} from "mobx-react";
import * as S from "./styles";
import {StyledLink} from "../styles";

export const Categories = () => {
    const {store} = useStore();

    const show = store.categories.length > 0;

    return useObserver(()=>(
        <S.Container>
            <S.Header>
                <S.TitleContainer>
                    <S.Title>
                        Trivia Game
                    </S.Title>
                    <br></br>
                    <S.Text>
                        using <S.Anchor href="https://opentdb.com/">Open Trivia API</S.Anchor><br></br>
                    </S.Text>
                </S.TitleContainer>
                <S.Logo></S.Logo>
            </S.Header>
            <S.Body>
                <S.CategoryWrap>
                    {!show && 
                        <S.Loading/>
                    }
                    {store.categories.map(
                    (category,index)=>
                    <S.Category 
                        length={store.categories.length} 
                        key={category.id}
                        to={"/quiz/"+category.id}
                    >
                        <S.CategoryLogo name={category.name}/>
                        <S.Name>{category.name}</S.Name>
                    </S.Category>
                    )}
                </S.CategoryWrap>
            </S.Body>
        </S.Container>
    ))
}