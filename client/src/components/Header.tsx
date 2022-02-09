import React from 'react';
import styled from "styled-components";

type Props = {
    title: string;
    state?: boolean;
}

export const Header: React.FC<Props> = ({title}) => {
    return (
        <Title>
            <h1 style={{fontSize: "inherit"}}>{title}</h1>
        </Title>
    )
}

const Title = styled.div`
  width: 100%;
  font-size: 30px;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid saddlebrown;
  margin-bottom: 10px;
`
