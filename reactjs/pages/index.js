import React from 'react';
import setLandingtHOC from '../decorators/set_landing';
import Landing from '../modules/public/containers/landing';

function LandingPage() {
  return <Landing title="Landing" />;
}

export default setLandingtHOC(LandingPage);
