import styled, {keyframes} from "styled-components";

const LoadingAnim = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

interface LoadingPosition{
    top?: string;
    left?:string;
}
export const Loading = styled.div<LoadingPosition>`
    ${props=>(props.top && props.left) && "position:absolute"};
    ${props=>props.top && "top:"+props.top};
    ${props=>props.left && "left:"+props.left};
    border-radius: 50%;
    border: 1px solid #25185e;
    width: 10em;
    height: 10em;
    border-bottom: 1px solid white;
    animation: 1s ${LoadingAnim} infinite linear;
`;