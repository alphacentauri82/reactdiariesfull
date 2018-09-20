import React from 'react';
import { FormattedMessage } from 'react-intl';
import setLayoutHOC from '../../decorators/set_professor_layout';

function Profesors() {
  return (
    <div>
      <h1>Profesors</h1>
      <p><FormattedMessage id="hello" /></p>
    </div>
  );
}

export default setLayoutHOC(Profesors);
