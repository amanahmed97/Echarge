import React from 'react';
import './App.css';
import {Login} from './components/Login';
import {SignUp} from './components/Signup';
function App() {
  const [isLogin, setIsLogin] = React.useState(true);

  const switchLogin = () => {
    if(isLogin)
      setIsLogin(false);
    else
      setIsLogin(true);
  };
  return (
    <div className="App">
    { isLogin && <Login switchToSignUp={switchLogin}/> }
    { !isLogin && <SignUp switchToLogin={switchLogin} />}
    </div>
  );
}

export default App;
