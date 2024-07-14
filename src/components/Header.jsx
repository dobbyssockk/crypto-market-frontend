import styled from 'styled-components';
import {Link} from "react-router-dom";

const Container = styled.header`
    padding: 20px 0;
    text-align: center;
`;

const Button = styled.button`
    background-color: #3E784E;
    border: none;
    color: white;
    padding: 10px 50px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
    &:active {
        opacity: 0.6;
    }
`;

const Header = () => {
    return (
        <Container>
            <Link to="/"><Button>Dashboard</Button></Link>
        </Container>
    );
};

export default Header;