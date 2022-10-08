import styled from 'styled-components';

export const StyledButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 10px;
  width: 160px;
  background-color: #3f51b5;
  color: #ffffff;
  border: none;
  opacity: 0.8;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;
