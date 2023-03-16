import React from 'react';
import AppContainer from './src/navigation/AppContainer';
import {useSelector} from 'react-redux';
function App() {
  const globalState = useSelector(state => state);
  return <AppContainer isAuth={globalState.AuthReducer.isLoggedIn} />;
}

export default App;
