import React from "react";
import {useParams} from "react-router-dom";

export const Quiz = () => {
    const {id} = useParams();

    return(
        <p>Quiz: {id}</p>
    );
}