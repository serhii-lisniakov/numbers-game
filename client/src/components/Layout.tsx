import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: flex-start;
  max-width: 1920px;
  transition: .5s;
  margin-left: auto;
  margin-right: auto;
  height: 100vh;
  overflow: hidden;
  @media (max-width: 1920px) {
    width: 100%;
  }
`
