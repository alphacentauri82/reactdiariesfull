import React from 'react';
import styled from 'styled-components';
import { media } from '../../../lib/style-utils';

const Container = styled.div`
  background: ${props => props.theme.color.grayXS};
  width: 47%;
  ${media.tablet`
    padding: 5%;
    width: 90%;
    margin-bottom: 16px;
  `}
  ${media.phone`
    padding: 5%;
    width: 90%;
    margin-bottom: 16px;
  `}
`;

export default ({ children, name, isLoading, error }) => {
  return (
    <Container name={name}>
      {isLoading && <h2>Loading ...</h2>}
      {error && <p>{error.message}</p>}
      {children}
    </Container>
  );
}
