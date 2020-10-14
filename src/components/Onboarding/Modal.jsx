import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import './Modal.scss';

import { toast } from 'react-toastify';

import { useStore } from '../../store';

import Errors from '../Errors/Errors';
import Loading from '../Loading/Loading';

import Step from './Step/Step';
import Submit from '../Form/Submit/Submit';

import Header from '../Modals/Header/Header';

import Crypto from './Steps/Crypto/Crypto';
import AreYouPublisher from './Steps/AreYouPublisher/AreYouPublisher';
import SellWithUs from './Steps/SellWithUs/SellWithUs';
import CompanyName from './Steps/CompanyName/CompanyName';
import StudioSize from './Steps/StudioSize/StudioSize';
import Currency from './Steps/Currency/Currency';

const STEPS = [
  { component: AreYouPublisher, props: ['isSeller'] },
  { component: SellWithUs, props: ['sellWithUs'] },
  { component: CompanyName, props: ['companyName'] },
  { component: StudioSize, props: ['studioSize'] },
  { component: Currency, props: ['fiatCurrency'] },
  { component: Crypto, props: ['acceptedCrypto'] },
];

const OnboardingModalContent = ({ close }) => {
  const history = useHistory();

  // this are for transitions only
  // const [fadeIn, setFadeIn] = useState(false);
  // const [fadeOut, setFadeOut] = useState(false);

  // useEffect(() => {
  //   setFadeIn(true);
  // }, []);

  const {
    forms: {
      onboarding,
      onboarding: {
        errors, update, currentStep, nextStep, previousStep,
      },
    },
    auth: { user },
  } = useStore();

  const next = async (e) => {
    e.preventDefault();

    if (currentStep === 0 && !onboarding.isSeller) {
      onboarding.reset();
      close();
      return;
    }

    if (currentStep === 1 && !onboarding.sellWithUs) {
      onboarding.reset();
      close();
      return;
    }

    if (currentStep === 5) {
      if (nextStep()) {
        if (await user.createSeller()) {
          history.push('/seller/dashboard');
          toast('Your seller account has been created.');
        }
      }
    } else {
      nextStep();
    }
  };

  // if we need transitions
  // const previousStepWithTransition = () => {
  //   setFadeOut(true);
  //   setTimeout(() => {
  //     previousStep();
  //     setFadeOut(false);
  //   }, 200);
  // };

  const back = currentStep > 0 ? previousStep : null;

  const defaultProps = {
    update,
  };

  const Component = STEPS[currentStep].component;
  const componentProps = STEPS[currentStep].props.reduce(
    (object, prop) => ({ ...object, [prop]: onboarding[prop] }),
    {},
  );

  return (
    <div
      className={`onboarding-modal ${currentStep === 0 ? 'small-modal' : ''}`}
    >
      {user.loadingSeller ? (
        <Loading />
      ) : (
        <React.Fragment>
          <Header back={back} close={close} title="Sell With Us" />
          <div className="onboarding-modal-body">
            <form onSubmit={next} className="flex-column align-center">
              <Step number={currentStep + 1} />

              <Component {...defaultProps} {...componentProps} />

              <Errors errors={errors.full_messages.toJSON()} />

              <Submit
                green={currentStep === 5}
                text={currentStep === 5 ? 'FINISH' : 'NEXT'}
              />
            </form>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default observer(OnboardingModalContent);
