import React, {Fragment} from "react";
import {useStore} from "../../store";
import {useObserver} from "mobx-react";
import * as S from "./styles";
import {StyledLink} from "../styles";

export const Categories = () => {
    const {store} = useStore();

    return useObserver(()=>(
        <>
            <S.Header>
                <S.Title>
                    Blitz!
                </S.Title>
                <S.Description>
                    Trivia game <br></br>
                    Using <a href="https://opentdb.com/">Open Trivia API</a><br></br>
                </S.Description>
            </S.Header>
            <S.Container>
                {
                    store.categories.length === 0 && <p>Loading..</p>
                }
                <Fragment>
                    {store.categories.map(
                    (category)=>
                        <S.Category key={category.id}>
                            <StyledLink to={"/quiz/"+category.id}>
                                <S.Name>{category.name}</S.Name>
                            </StyledLink>
                        </S.Category>
                        
                    )}
                </Fragment>
            </S.Container>
        </>
    ))
}