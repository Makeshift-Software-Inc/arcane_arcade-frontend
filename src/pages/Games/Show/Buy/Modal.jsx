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
import PayQR from './PayQR/PayQR';

import './Modal.scss';

const STEPS = [
  {
    component: Platform,
    title: 'Choose Platform',
    props: ['platform', 'supportedPlatforms'],
  },
  {
    component: PaymentMethod,
    title: 'Choose Payment Method',
    props: ['payment_method', 'paymentOptions'],
  },
  { component: PayQR, props: [] },
];

const BuyModal = ({ close }) => {
  const {
    auth: { user },
    forms: {
      buy,
      buy: {
        creatingOrder,
        prepare,
        update,
        currentStep,
        nextStep,
        previousStep,
        errors,
      },
    },
  } = useStore();

  useEffect(() => {
    prepare();
  }, [prepare]);

  const next = async (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (nextStep()) {
        if (await user.createOrder()) {
          console.log('ORDER CREATED');
          // history.push('/seller/dashboard');
          // toast('Your seller account has been created.');
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
    {},
  );

  const Component = STEPS[currentStep].component;
  const { title } = STEPS[currentStep];

  const goBack = currentStep > 0 ? previousStep : null;

  return (
    <Modal>
      <Header title={title} black close={close} back={goBack} />
      <div className="buy-modal">
        {creatingOrder ? (
          <Loading />
        ) : (
          <form onSubmit={next} className="flex-column align-center">
            <Component {...defaultProps} {...componentProps} />

            <Errors errors={errors.full_messages.toJSON()} />

            <Submit text={currentStep === 0 ? 'NEXT' : 'PAY'} />
          </form>
        )}
      </div>
    </Modal>
  );
};

export default observer(BuyModal);
