import React from 'react';
import setLayoutHOC from '../../decorators/set_tutor_layout';
import Feed from '../../modules/tutor/containers/feed';

const Tutor = () => <Feed />;

export default setLayoutHOC(Tutor);
