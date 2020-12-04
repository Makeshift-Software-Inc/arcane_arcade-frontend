import React from 'react';
import { observer } from 'mobx-react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loading from '../../components/Loading/Loading';
import Errors from '../../components/Errors/Errors';

import SendCode from './SendCode';
import EnterCode from './EnterCode';
import ResetPassword from './ResetPassword';

import logo from '../../img/logo.png';

import { useStore } from '../../store';

import './Form.scss';

const ForgotPasswordForm = () => {
  const {
    auth,
    forms: { forgot_password },
  } = useStore();

  const history = useHistory();

  const forSellers = history.location.pathname.startsWith('/sell-with-us');

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

        history.push(forSellers ? '/sell-with-us/login' : '/login');
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
    history.push(forSellers ? '/sell-with-us/login' : '/login');
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
    <div className="flex-row align-center justify-center flex-grow two-factor-page">
      <div className="flex-column flex-grow two-factor-form align-center justify-between">
        <Link className="logo flex" to={forSellers ? '/sell-with-us' : '/'}>
          <img src={logo} alt="logo" />
        </Link>

        {renderContent()}
        <Errors errors={forgot_password.errors.full_messages.toJSON()} />
      </div>
    </div>
  );
};

export default observer(ForgotPasswordForm);
