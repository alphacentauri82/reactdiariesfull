import React from 'react';
import setLayoutHOC from '../../decorators/set_professor_layout';
import GradesContainer from '../../modules/grades/containers';

function SubjectMatter() {
  return (
    <div>
      <GradesContainer />
    </div>
  );
}

export default setLayoutHOC(SubjectMatter);
