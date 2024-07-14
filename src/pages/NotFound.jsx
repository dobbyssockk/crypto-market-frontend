import styled from "styled-components";

const StyledTitle = styled.h2`
    color: white;
    margin: 0 auto;
    margin-top: 120px;
`;

const NotFound = () => {
    return (
        <StyledTitle>Page is not found.</StyledTitle>
    );
};

export default NotFound;