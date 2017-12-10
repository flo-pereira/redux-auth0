import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Navigator from 'redux-first-router-navigator';
import { store } from './store';
import Layout from './Components/Layout';
import registerServiceWorker from './registerServiceWorker';

const renderComponent = (props) => (<Layout {...props} />);
const renderError = (error) => (<Layout><h1>{ error.message }</h1></Layout>);

ReactDOM.render(
  (
    <Provider store={store}>
      <Navigator
        renderComponent={renderComponent}
        renderError={renderError}
      />
    </Provider>
  ), document.getElementById('root')
);
registerServiceWorker();
