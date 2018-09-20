import React from 'react';
import setLayoutHOC from '../../decorators/set_tutor_layout';
import GradesContainer from '../../modules/tutor/containers/grades';

const Grades = () => <GradesContainer />;

export default setLayoutHOC(Grades);
