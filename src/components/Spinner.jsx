import styled from "styled-components";

const Loader = styled.div`
    width: 50px;
    --b: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    padding: 1px;
    background: conic-gradient(#0000 10%, #3E784E) content-box;
    -webkit-mask:
            repeating-conic-gradient(#0000 0deg, #000 1deg 20deg, #0000 21deg 36deg),
            radial-gradient(farthest-side, #0000 calc(100% - var(--b) - 1px), #000 calc(100% - var(--b)));
    -webkit-mask-composite: destination-in;
    mask-composite: intersect;
    animation: l4 1s infinite steps(10);
    margin: 0 auto;
    @keyframes l4 {
        to {
            transform: rotate(1turn);
        }
    }
`;

const Spinner = () => {
    return (
        <Loader />
    );
};

export default Spinner;
