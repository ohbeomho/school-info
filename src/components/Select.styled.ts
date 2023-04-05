import styled from "styled-components";

const Select = styled.select`
  padding: 10px;
  border-radius: 8px;
  border: 1.5px solid rgb(200, 200, 200);
  cursor: pointer;
  outline: none;
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

export default Select;
