import React from 'react';
import './App.css';
import { Login } from './components/Login';
import { SignUp } from './components/Signup';
import { MapUI } from './components/Map';

export enum tabs {
    Login,
    Signup,
    Map,
}

function App() {
    const [tab, setTab] = React.useState(tabs.Login);
    const switchTab = (props: tabs) => {
        setTab(props);
    };
    return (
        <div className="App">
            {tab == tabs.Login && <Login switchTab={switchTab} />}
            {tab == tabs.Signup && <SignUp switchTab={switchTab} />}
            {tab == tabs.Map && <MapUI />}
        </div>
    );
}

export default App;
