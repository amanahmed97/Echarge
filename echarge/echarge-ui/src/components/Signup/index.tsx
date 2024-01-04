import * as React from 'react';
import './style.scss';
import echarge_logo from '../../assets/echarge_logo.svg';
import {Signup} from '../../communicator';
interface SignUpProps {
    switchToLogin: () => void;
}
export const SignUp = (props: SignUpProps) => {
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const switchToLogin = () => {
        props.switchToLogin();
    };
    const createUser = () => {
        const data = {
            user_email: email,
            user_name: name,
            user_password: password,
            user_phone: phone
        };
        Signup(data);
        props.switchToLogin();
    };
    return (
        <div className='login'>
            <img src={echarge_logo} alt="echarge logo"></img>
            <div className='login-card'>
                <p className='heading'>Sign Up for free!</p>
                <p className='signup'>Already have an account?  <a onClick={switchToLogin} className='blueclr'>Login!</a></p>
                <input type='text' placeholder='Email address' onChange={event => setEmail(event.target.value)}></input>
                <input type='text' placeholder='Full Name' onChange={event => setName(event.target.value)}></input>
                <input type='password' placeholder='Password' onChange={event => setPassword(event.target.value)}></input>
                <input type='text' placeholder='Phone' onChange={event => setPhone(event.target.value)}></input>
                <p className="terms">I agree to the <a className="blueclr">Privacy Policy</a> and <a className="blueclr">Terms and Services</a></p>
                <button onClick={createUser}><p>Sign Up</p></button>
            </div>
        </div>
    );
}