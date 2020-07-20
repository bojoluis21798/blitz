import React, {Fragment} from "react";
import {useStore} from "../../store";
import {observer} from "mobx-react";
import {Category, Grid} from "./styles";

export const Categories = observer(() => {
    const {store} = useStore();

    return(
        <Grid>
            {
                store.categories.length === 0 && <p>Loading..</p>
            }
            <Fragment>
            {store.categories.map(
            (category)=>
                <Category key={category.id}>{category.name}</Category>
            )}
            </Fragment>
        </Grid>
    );
})