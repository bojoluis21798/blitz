import React from "react";
import {Title} from "./styles";
import {Flex, JustifyContent, AlignItems} from "../Flex";
import {observer} from "mobx-react";
import {useStore} from "../../store";

export const Header = observer(()=>{
    const {store} = useStore();

    return(
        <Flex justify={JustifyContent.SPACE_BETWEEN} alignItems={AlignItems.CENTER}>
            <Title>Trivia Game!</Title>
            <Title>Coins: {store.coins}</Title>
        </Flex>
    );
});

