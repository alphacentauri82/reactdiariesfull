import React from 'react';
import TutorLayoutContainer from '../modules/tutor/containers/tutor_layout';
import setWithStoreHOC from './set_with_store';

function setLayout(WrappedComponent) {
  function SetLayout(props) {
    return (
      <TutorLayoutContainer>
        <WrappedComponent
          {...props}
        />
      </TutorLayoutContainer>
    );
  }

  return setWithStoreHOC(SetLayout);
}

export default setLayout;
