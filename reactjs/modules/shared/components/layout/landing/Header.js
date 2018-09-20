import React from 'react';
import styled from 'styled-components';

const Container = styled.header`
  background: ${props => props.theme.color.grayXS};
  display: flex;
  justify-content: center;
`;

const H1 = styled.h1`
  color: ${props => props.theme.color.grayXL};
`;

function Header() {
  return (
    <Container>
      <H1>Login & Register Forms</H1>
    </Container>
  );
}

export default Header;
