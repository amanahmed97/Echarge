import * as React from 'react';
import './style.scss';
import echarge_logo from '../../assets/echarge_logo.svg';
import { login } from '../../communicator';
import { tabs } from '../../App';
import axios from 'axios';
interface LoginProps {
    switchTab: (props: tabs) => void;
}

export const Login = (props: LoginProps) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);
    const [response, setResponse] = React.useState(400);
    const logReq = async () => {
        return await axios.get('/home').then(res => setResponse(res.status));
    };
    React.useEffect(() => {
        logReq();
    });
    const signup = () => {
        props.switchTab(tabs.Signup);
    };
    const loginHome = () => {
        const data = {
            user_email: email,
            user_password: password,
            user_remember: rememberMe,
        };
        axios.post('/login', data).then(res => setResponse(res.status));
    };
    const loginSucess = () => {
        props.switchTab(tabs.Map);
    };
    if (response == 200) props.switchTab(tabs.Map);
    return (
        <div className="login">
            <img src={echarge_logo} alt="echarge logo"></img>
            <div className="login-card">
                <p className="heading">Login to your account</p>
                <p className="signup">
                    Don’t have an account?{' '}
                    <a onClick={signup} className="blueclr">
                        Sign Up Free!
                    </a>
                </p>
                <input type="text" placeholder="Email address" onChange={event => setEmail(event.target.value)}></input>
                <input
                    type="password"
                    placeholder="Password"
                    onChange={event => setPassword(event.target.value)}
                ></input>
                <div className="remember-me">
                    <div className="check-box">
                        <input type="checkbox" onChange={event => setRememberMe(!rememberMe)}></input>
                        <h4>Remember me</h4>
                    </div>
                    <h4 className="forgotpass">Forgot password?</h4>
                </div>
                <button onClick={loginHome}>
                    <p>Login</p>
                </button>
            </div>
        </div>
    );
};
