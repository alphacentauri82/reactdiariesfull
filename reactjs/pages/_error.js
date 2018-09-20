import React, { Component } from 'react';
import styled from 'styled-components';
import setLandingtHOC from '../decorators/set_landing';

const Title = styled.h1`
  color: ${props => props.theme.color.error};
`;

const Message = styled.p`
  color: ${props => props.theme.color.errorXXL};
`;

class Error extends Component {
  render() {
    return (
      <section>
        <Title>Error - 404</Title>
        <Message>The page <a>{this.props.page}</a> not found !!!</Message>
      </section>
    );
  }
}

export default setLandingtHOC(Error);
