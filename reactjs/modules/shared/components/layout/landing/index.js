import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { media } from '../../../../../lib/style-utils';
import Header from './Header';
import Fotter from './Fotter';

const Container = styled.div`
  background: ${props => props.theme.color.grayXXXS};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Main = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  ${media.tablet`
    flex-direction: column;
  `}
  ${media.phone`
    flex-direction: column;
  `}
`;

export default ({ children, title = 'This is a default title' }) => (
  <Container>
    <Head>
      <title>{ title }</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <Main>
      { children }
    </Main>
    <Fotter />
  </Container>
);
