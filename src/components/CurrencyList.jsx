import CurrencyCard from "./CurrencyCard.jsx";
import styled from "styled-components";
import Spinner from './Spinner.jsx';
import PropTypes from "prop-types";
import Message from "./Message.jsx";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const CurrencyList = (props) => {
    const {data, loading, error} = props;
    const spinnerComponent = loading ? <Spinner /> : null;
    const errorComponent = error ? <Message>Something is going wrong... Try again!</Message> : null;
    const emptyListComponent = !data.length ? <Message>There are no coins yet...</Message> : null;
    const content = (!spinnerComponent && !errorComponent && !emptyListComponent) ? data.map((item) => (
        <CurrencyCard {...item} key={item.id} />
    )) : null;

    return (
        <Container>
            {spinnerComponent || errorComponent || emptyListComponent || content}
        </Container>
    );
};

CurrencyList.propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
}

export default CurrencyList;