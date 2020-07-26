import styled, {keyframes} from "styled-components";

const LoadingAnim = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

export const Loading = styled.div`
    border-radius: 50%;
    border: 1px solid black;
    width: 10em;
    height: 10em;
    border-bottom: 1px solid white;
    animation: 1s ${LoadingAnim} infinite linear;
`;