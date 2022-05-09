import styled from 'styled-components';

const ErrorStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
    min-height: 10vh;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ErrorAlert = ({ message }) => {
    return <ErrorStyled><h4>{message}</h4></ErrorStyled>
};
