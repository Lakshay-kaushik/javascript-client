import styled, { css } from 'styled-components';

const Div = styled.div`2%;`;


const Error = styled.p`color: red;`;

const Text = styled.div`
width: 100%;
font-size: 18px;
font-weight: bold;
color: solid darkgray;
`;

const Input = styled.input`
width: 94%;
padding: 10px 15px;
border: 1px solid orange;
border-radius: 5px;
color: solid darkgray ;
${(props) => props.error
&& css`
border: 1px solid black;
color: black;
`};
}
${(props) => props.onChange
  && css`
  border: 1px solid gray;
`};
}
${(props) => (props.value && !props.disabled && !props.error && !props.onChange)
&& css`
border: 1px solid orange;
color: black;
`};
}`;

export {
  Div, Error, Input, Text,
};
