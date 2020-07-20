import {StyledFlex} from "./styles";
import React from "react";

export enum AlignItems {
    CENTER = "center",
    START = "flex-start",
    END = "flex-end",
    STRETCH = "stretch",
    BASELINE = "baseline"
}

export enum JustifyContent {
    CENTER = "center",
    START = "flex-start",
    END = "flex-end",
    SPACE_AROUND = "space-around",
    SPACE_BETWEEN = "space-between"
}

export interface FlexProps{
    readonly column?: boolean;
    readonly justify?:JustifyContent;
    readonly alignItems?:AlignItems;
    readonly children?:JSX.Element[];
}

export interface FlexItemProps{
    readonly children?:JSX.Element[];
}

export const Flex = (props:FlexProps) => (
    <StyledFlex {...props}>
        {props.children}    
    </StyledFlex>
);


