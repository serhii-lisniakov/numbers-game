import React from 'react';
import styled from "styled-components";

export const Input = styled.input<{ isValid?: boolean }>`
  display: block;
  border: 1px solid ${props => props.isValid ? 'inherit' : 'red'};
  padding: 10px 15px;
  background: transparent;
  transition: .3s;
  cursor: pointer;
  font-size: 18px;
  letter-spacing: 1px;
  margin: 10px 0;
  outline: none;
  width: 300px;
  height: 45px;
  border-radius: 10px;

  &:focus {
    border-color: #5d5d5d;
  }

  &:hover {
    background: #e0e0e0;
  }

  &::placeholder {
    text-transform: uppercase;
    font-size: 12px;
  }

  &:disabled {
    opacity: 0.5;
  }
`
