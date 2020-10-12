import React from 'react';
import { observer } from 'mobx-react';

import './Modal.scss';

import btcIcon from '../../img/bitcoin.png';
import xmrIcon from '../../img/monero.png';

import { useStore } from '../../store';

const Step = ({ number }) => (
  <small className="current-step align-self-start">
    STEP
    {number}
    {' '}
    OF 6
  </small>
);

const Question = ({ text }) => (
  <p className="question align-self-start">{text}</p>
);

const Submit = () => (
  <button type="submit" className="button is-link is-small">
    NEXT
  </button>
);

const Input = ({
  type, name, value, onChange, placeholder,
}) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

const YesNoOptions = ({ name, isTrue, toggle }) => (
  <div className="options flex-row">
    <div>
      <input
        type="radio"
        name={name}
        id="option-true"
        checked={isTrue}
        value
        onChange={toggle}
      />
      <label className="option-label" htmlFor="option-true">
        Yes
      </label>
    </div>
    <div>
      <input
        type="radio"
        name={name}
        id="option-false"
        checked={!isTrue}
        value={false}
        onChange={toggle}
      />
      <label className="option-label" htmlFor="option-false">
        No
      </label>
    </div>
  </div>
);

const Toggler = ({ options, selected, onChange }) => {
  const handleClick = (e) => {
    onChange(e.target.name);
  };

  return (
    <div className="toggler-options">
      {options.map((option) => (
        <button
          key={option}
          className={`button is-link ${
            selected !== option ? 'is-outlined' : ''
          }`}
          name={option}
          onClick={handleClick}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

const Select = ({ value, onChange, options }) => (
  <select className="select-options" value={value} onChange={onChange}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.text}
      </option>
    ))}
  </select>
);

const AreYouPublisher = ({ update, isSeller }) => {
  const toggle = () => {
    update({ isSeller: !isSeller });
  };

  return (
    <React.Fragment>
      <Question text="Are you a game developer or publisher?" />

      <YesNoOptions name="isSeller" isTrue={isSeller} toggle={toggle} />
    </React.Fragment>
  );
};

const SellWithUs = ({ update, sellWithUs }) => {
  const toggle = () => {
    update({ sellWithUs: !sellWithUs });
  };

  return (
    <React.Fragment>
      <Question text="Are you interested in selling your game(s) on Arcane Arcade?" />

      <YesNoOptions name="sellWithUs" isTrue={sellWithUs} toggle={toggle} />
    </React.Fragment>
  );
};

const CompanyName = ({ update, companyName }) => {
  const handleChange = (e) => update({ companyName: e.target.value });

  return (
    <React.Fragment>
      <Question text="What is the name of your company?" />

      <Input
        type="text"
        name="companyName"
        value={companyName}
        onChange={handleChange}
        placeholder="Enter your company name"
      />
    </React.Fragment>
  );
};

const StudioSize = ({ update, studioSize }) => {
  const handleChange = (value) => {
    update({ studioSize: value });
  };
  return (
    <React.Fragment>
      <Question text="Which best describes the size of your game company?" />
      <Toggler
        options={['INDIE', 'MIDSIZE', 'AAA']}
        selected={studioSize}
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

const Currency = ({ update, fiatCurrency }) => {
  const onChange = (e) => {
    update({ fiatCurrency: e.target.value });
  };

  const currencies = [
    { value: 'USD', text: 'USD - US Dollar' },
    { value: 'EUR', text: 'EUR - Euro' },
    { value: 'JPY', text: 'JPY - Japanese Yen' },
    { value: 'GBP', text: 'GBP - British Pound' },
    { value: 'AUD', text: 'AUD - Australian Dollar' },
    { value: 'CAD', text: 'CAD - Canadian Dollar' },
    { value: 'CHF', text: 'CHF - Swiss Franc' },
    { value: 'CNY', text: 'CNY - Chinese Yuan' },
    { value: 'SEK', text: 'SEK - Swedish Krona' },
    { value: 'NZD', text: 'NZD - New Zealand Dollar' },
  ];

  return (
    <React.Fragment>
      <Question text="Which fiat currency will you be pricing in?" />
      <Select options={currencies} value={fiatCurrency} onChange={onChange} />
    </React.Fragment>
  );
};

const Crypto = observer(({ update, acceptedCrypto }) => {
  console.log(acceptedCrypto.toJSON());

  const handleChange = (e) => {
    if (e.target.checked) {
      update({ acceptedCrypto: [...acceptedCrypto, e.target.value] });
    } else {
      update({
        acceptedCrypto: acceptedCrypto.filter(
          (name) => name !== e.target.value,
        ),
      });
    }
  };

  const checked = (name) => !!acceptedCrypto.find((crypto) => crypto === name);

  const btcChecked = checked('BTC');
  const xmrChecked = checked('XMR');

  return (
    <React.Fragment>
      <Question text="Which cryptocurrency would you like to be paid in?" />
      <div className="flex-row">
        <div className="coin-icon flex-column">
          <img src={btcIcon} alt="bitcoin" />
          <input
            type="checkbox"
            id="bitcoin"
            onChange={handleChange}
            checked={btcChecked}
            name="accepted_crypto"
            className="switch"
            value="BTC"
          />
        </div>
        <div className="coin-icon flex-column">
          <img src={xmrIcon} alt="monero" />
          <input
            type="checkbox"
            onChange={handleChange}
            id="monero"
            checked={xmrChecked}
            name="accepted_crypto"
            value="XMR"
            className="switch"
          />
        </div>
      </div>
    </React.Fragment>
  );
});

const STEPS = [
  { component: AreYouPublisher, props: ['isSeller'] },
  { component: SellWithUs, props: ['sellWithUs'] },
  { component: CompanyName, props: ['companyName'] },
  { component: StudioSize, props: ['studioSize'] },
  { component: Currency, props: ['fiatCurrency'] },
  { component: Crypto, props: ['acceptedCrypto'] },
];

const OnboardingModalContent = ({ close }) => {
  const {
    forms: {
      onboarding,
      onboarding: { update, nextStep, previousStep },
    },
  } = useStore();

  const next = (e) => {
    e.preventDefault();
    console.log('NEXT');
    nextStep();
  };

  const currentStep = 5;

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
    <div className="onboarding-modal">
      <div className="onboarding-modal-header flex-row align-center justify-between">
        <span className="back-wrapper">
          {back && (
            // eslint-disable-next-line
            <span onClick={back}>Back</span>
          )}
        </span>
        <span className="modal-title">Sell With Us</span>
        <span className="close-wrapper">
          {close && (
            // eslint-disable-next-line
            <span onClick={close}>X</span>
          )}
        </span>
      </div>
      <div className="onboarding-model-body">
        <form onSubmit={next} className="flex-column align-center">
          <Step number={currentStep + 1} />

          <Component {...defaultProps} {...componentProps} />

          <Submit />
        </form>
      </div>
    </div>
  );
};

export default observer(OnboardingModalContent);
