import styled from "styled-components";
import PropTypes from "prop-types";

const StyledMessage = styled.div`
    margin: 0 auto;
    color: #808080;
    font-size: 21px;
`;

const Message = ({children}) => {
    return (
        <StyledMessage>
            {children}
        </StyledMessage>
    );
}

Message.propTypes = {
    children: PropTypes.string.isRequired
}

export default Message;