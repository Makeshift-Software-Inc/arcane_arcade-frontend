import React, { useEffect } from 'react';

import { observer } from 'mobx-react';

import { useStore } from '../../../../store';

import Modal from '../../../../components/Modals/Modal';
import Header from '../../../../components/Modals/Header/Header';
import Submit from '../../../../components/Form/Submit/Submit';
import Errors from '../../../../components/Errors/Errors';
import Loading from '../../../../components/Loading/Loading';

import Platform from './Platform/Platform';
import PaymentMethod from './PaymentMethod/PaymentMethod';

import './Modal.scss';

const STEPS = [
  {
    component: Platform,
    title: 'Choose Platform',
    props: ['platform', 'availablePlatforms'],
  },
  {
    component: PaymentMethod,
    title: 'Choose Payment Method',
    props: ['payment_method', 'paymentOptions'],
  },
];

const BuyModal = ({ close }) => {
  const {
    auth: {
      user: { creatingOrder, createOrder, ordersLoaded },
    },
    forms: {
      buy,
      buy: {
        prepare,
        update,
        currentStep,
        nextStep,
        previousStep,
        errors,
        purchasedPlatforms,
        availablePlatforms,
      },
    },
  } = useStore();

  useEffect(() => {
    if (ordersLoaded) {
      prepare();
    }
  }, [ordersLoaded]);

  const next = async (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (nextStep()) {
        if (await createOrder()) {
          close();
        }
      }
    } else {
      nextStep();
    }
  };

  const defaultProps = { update };
  const componentProps = STEPS[currentStep].props.reduce(
    (object, prop) => ({
      ...object,
      [prop]: Object.prototype.hasOwnProperty.call(buy[prop], 'toJSON')
        ? buy[prop].toJSON()
        : buy[prop],
    }),
    {}
  );

  const Component = STEPS[currentStep].component;
  const { title } = STEPS[currentStep];

  const goBack = currentStep > 0 ? previousStep : null;

  const renderContent = () => {
    if (creatingOrder)
      return <Loading text="Creating your order, please wait..." small white />;

    if (!ordersLoaded) return <Loading small white />;

    return (
      <React.Fragment>
        <Header title={title} black close={close} back={goBack} />
        <form onSubmit={next} className="flex-column align-center">
          <Component {...defaultProps} {...componentProps} />

          <Errors errors={errors.full_messages.toJSON()} />

          <Submit text={currentStep === 0 ? 'NEXT' : 'PAY'} />

          {purchasedPlatforms.length > 0 && (
            <p className="already-own">
              You already own this game for{' '}
              <b>{purchasedPlatforms.join(', ')}</b>
            </p>
          )}
        </form>
      </React.Fragment>
    );
  };

  return (
    <Modal>
      <div className="buy-modal">{renderContent()}</div>
    </Modal>
  );
};

export default observer(BuyModal);
