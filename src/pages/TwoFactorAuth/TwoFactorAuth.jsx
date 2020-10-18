import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import Loading from '../../components/Loading/Loading';
import Errors from '../../components/Errors/Errors';

import SendCode from './SendCode';
import EnterCode from './EnterCode';

import './TwoFactorAuth.scss';
import logo from '../../img/logo.png';

import { useStore } from '../../store';

const TwoFactorAuth = ({ history }) => {
  const {
    auth,
    forms: { two_factor_auth },
  } = useStore();

  const sendAuthCode = async () => {
    await auth.sendAuthCode();
  };

  const authorize = async (code) => {
    if (await auth.authorize(code)) {
      history.push('/');
    }
  };

  const renderContent = () => {
    if (auth.loading) return <Loading />;

    if (!two_factor_auth.codeSent) {
      return (
        <SendCode
          selected={two_factor_auth.delivery_method || 'email'}
          onChange={two_factor_auth.onChange}
          send={sendAuthCode}
        />
      );
    }

    return <EnterCode authorize={authorize} resend={sendAuthCode} />;
  };

  return (
    <div className="App two-factor flex-row">
      <div className="flex-row align-center justify-center flex-grow two-factor-page">
        <div className="flex-column flex-grow two-factor-form align-center justify-between">

          <Link className="logo flex" to="/">
            <img src={logo} alt="logo" />
          </Link>

          {renderContent()}
          <Errors errors={two_factor_auth.errors.full_messages.toJSON()} />
        </div>
      </div>
    </div>
  );
};

export default observer(TwoFactorAuth);
