import React, {Fragment} from "react";
import {useStore} from "../../store";
import {observer} from "mobx-react";
import {Category, Container, StyledLink} from "./styles";

export const Categories = observer(() => {
    const {store} = useStore();

    return(
        <Container>
            {
                store.categories.length === 0 && <p>Loading..</p>
            }
            <Fragment>
                {store.categories.map(
                (category)=>
                    <StyledLink to={"/quiz/"+category.id}>
                        <Category key={category.id}>{category.name}</Category>
                    </StyledLink>
                )}
            </Fragment>
        </Container>
    );
})