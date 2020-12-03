import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';

import Loading from '../../components/Loading/Loading';
import Errors from '../../components/Errors/Errors';

import SendCode from './SendCode';
import EnterCode from './EnterCode';
import ResetPassword from './ResetPassword';

import './ForgotPassword.scss';
import logo from '../../img/logo.png';

import { useStore } from '../../store';

const ForgotPassword = ({ history }) => {
  const {
    auth,
    forms: { forgot_password },
  } = useStore();

  const sendPasswordToken = async () => {
    if (forgot_password.validate()) {
      await auth.sendPasswordToken();
    }
  };

  const authorize = async (code) => {
    await auth.authorizePasswordToken(code);
  };

  const resetPassword = async () => {
    if (forgot_password.validate()) {
      if (await auth.resetPassword()) {
        const msg = 'Your password has been reset';
        toast(msg);

        history.push('/login');
      }
    }
  };

  const changeEmail = (e) => {
    e.preventDefault();
    forgot_password.updateStep('email');
  };

  const cancel = (e) => {
    e.preventDefault();
    forgot_password.cancel();
    history.push('/login');
  };

  const renderContent = () => {
    if (auth.loading) return <Loading />;

    if (forgot_password.stepEmail) {
      return (
        <SendCode
          email={forgot_password.email}
          onChange={forgot_password.onChange}
          cancel={cancel}
          send={sendPasswordToken}
          hasError={forgot_password.hasError('email')}
          error={
            forgot_password.hasError('email')
            && forgot_password.getErrors('email')
          }
        />
      );
    }

    if (forgot_password.stepCode) {
      return (
        <EnterCode
          authorize={authorize}
          resend={sendPasswordToken}
          changeEmail={changeEmail}
          cancel={cancel}
        />
      );
    }

    return (
      <ResetPassword
        password={forgot_password.password}
        passwordConfirmation={forgot_password.password_confirmation}
        onChange={forgot_password.onChange}
        send={resetPassword}
        errors={forgot_password.errors}
      />
    );
  };

  return (
    <div className="App forgot-password flex-row">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forgot Password</title>
      </Helmet>

      <div className="flex-row align-center justify-center flex-grow two-factor-page">
        <div className="flex-column flex-grow two-factor-form align-center justify-between">
          <Link className="logo flex" to="/">
            <img src={logo} alt="logo" />
          </Link>

          {renderContent()}
          <Errors errors={forgot_password.errors.full_messages.toJSON()} />
        </div>
      </div>
    </div>
  );
};

export default observer(ForgotPassword);
