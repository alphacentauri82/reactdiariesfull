import React from 'react';
import styled from 'styled-components';

const Container = styled.header`
  background: ${props => props.theme.color.grayXS};
  display: flex;
  justify-content: center;
`;

const P = styled.p`
  color: ${props => props.theme.color.grayXL};
`;


function Fotter() {
  return (
    <Container>
      <P>Made by Anli Zaimi at AZMIND having a lot of fun. </P>
    </Container>
  );
}

export default Fotter;
