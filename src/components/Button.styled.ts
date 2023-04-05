import styled from "styled-components";

const Button = styled.button`
  background-color: rgb(200, 200, 200);
  padding: 10px;
  border-radius: 8px;
  border: 0;
  transition: all 0.2s;
  cursor: pointer;
  margin: 2px;

  &:hover {
    translate: 0 2px;
    background-color: rgb(180, 180, 180);
  }

  &:active {
    scale: 1.1;
    background-color: rgb(150, 150, 150);
  }
`;

export default Button;
