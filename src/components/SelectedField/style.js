import styled from 'styled-components';

const Select = styled.select`
width: 97%;
padding: 10px 15px;
margin: 8px 0;
border: 1px solid orange;
border-radius: 4px;
box-sizing: border-box;
background-color: lightgray;
option {
  color: black;
  background: white;
  font-weight: small;
  display: flex;
  white-space: pre;
  min-height: 20px;
  padding: 0px 2px 1px;
}
`;
const Err = styled.p`
color: red;
`;
export { Select, Err };