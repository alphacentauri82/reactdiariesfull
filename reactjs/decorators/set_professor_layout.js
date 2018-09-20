import React from 'react';
import ProfessorLayoutContainer from '../modules/professor/containers/professor_layout';
import setWithStoreHOC from './set_with_store';

function setLayout(WrappedComponent) {
  function SetLayout(props) {
    return (
      <ProfessorLayoutContainer>
        <WrappedComponent
          {...props}
        />
      </ProfessorLayoutContainer>
    );
  }

  return setWithStoreHOC(SetLayout);
}

export default setLayout;
