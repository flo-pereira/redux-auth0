import React from 'react';
import { secure } from 'redux-auth0';

export default secure(() => (<div>Welcome</div>));

