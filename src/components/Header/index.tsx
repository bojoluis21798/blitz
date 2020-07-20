import React from "react";
import {Title, Flex} from "./styles";
import {observer} from "mobx-react";
import {useStore} from "../../store";

export const Header = observer(()=>{
    const {store} = useStore();

    return(
        <Flex>
            <Title>Blitz!</Title>
            <Title>Coins: {store.coins}</Title>
        </Flex>
    );
});

