import styled from "styled-components";
import {FlexProps, JustifyContent, AlignItems} from "./index";

export const StyledFlex = styled.div<FlexProps>`
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${props=>props.column?"column":"row"};
    justify-content: ${props=>props.justify?props.justify:JustifyContent.START};
    align-items: ${props=>props.alignItems?props.alignItems:AlignItems.STRETCH};
`;
