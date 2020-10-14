import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useStore } from '../../store';

import Navbar from '../../components/Navbar/Navbar';
import Errors from '../../components/Errors/Errors';
import Input from '../../components/Form/Input/Input';
import Submit from '../../components/Form/Submit/Submit'

import background from './../../img/auth-bckg.jpg';

import './Login.scss';

const LoginPage = ({ history }) => {
  const {
    auth: authStore,
    forms: { login },
  } = useStore();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (login.validate()) {
      if (await authStore.login()) {
        history.push('/');
      }
    }
  };

  const hasError = (name) => Object.prototype.hasOwnProperty.call(login.errors.errors, name);

  return (
    <div className="App">
 
      <div className="flex flex-column justify-center align-center login-page">

        
        <div className="login-form flex flex-column ">
          <Link className="logo flex" to="/">
            Logo
          </Link>
          <div className="sign-up-link">
            <h1> Sign In </h1>
            <span>Don&apos;t have an account? </span>  
            <Link to="/sign-up">Sign up</Link>
          </div>
          <form onSubmit={onSubmit} className="flex-flex-column">
          <Input 
            label={'Username'}
            type="text"
            name="username"
            value={login.username}
            onChange={login.onChange}
          />
          
          <Input 
            label={'Password'}
            type="password"
            name="password"
            value={login.password}
            onChange={login.onChange}
          />

          <div className="remember-forgot-div flex-row justify-between">

          <div>
            <Input 
              className={'checkbox'}
              type="checkbox"
              name="remember"

            />
            <span>Remember Me</span>
            </div>

            <Link className="forgot-password flex" to="/">
              Forgot Your Password
            </Link>

          </div> 

          

            <Errors errors={login.errors.full_messages.toJSON()} />

            <Submit text={'LOG IN'}/>
    
          </form>
        </div>
      </div>
    </div>
  );
};

export default observer(LoginPage);
