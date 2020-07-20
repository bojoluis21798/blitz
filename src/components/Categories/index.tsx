import React, {Fragment} from "react";
import {useStore} from "../../store";
import {observer} from "mobx-react";
import {Category} from "./styles";
import {Flex, JustifyContent, AlignItems} from "../Flex";

export const Categories = observer(() => {
    const {store} = useStore();

    return(
        <Flex justify={JustifyContent.CENTER} alignItems={AlignItems.CENTER}>
            {
                store.categories.length === 0 && <p>Loading..</p>
            }
            <Fragment>
            {store.categories.map(
            (category)=>
                <Category key={category.id}>{category.name}</Category>
            )}
            </Fragment>
        </Flex>
    );
})