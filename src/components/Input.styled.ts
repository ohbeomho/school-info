import styled from "styled-components";

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  outline: none;
  border: 1.5px solid rgb(200, 200, 200);
  transition: all 0.2s;
  margin: 2px;

  &:hover,
  &:focus {
    border-color: rgb(150, 150, 150);
  }

  &:focus {
    scale: 1.03;
  }
`;

export default Input;
