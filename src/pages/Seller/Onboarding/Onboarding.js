import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { observer } from "mobx-react";
import { useStore } from "../../../store";

import "../../../magic.css";
import "./Onboarding.scss";

import Welcome from "../../../components/Onboarding/Welcome";
import AreYouPublisher from "../../../components/Onboarding/AreYouPublisher";
import SellWithUs from "../../../components/Onboarding/SellWithUs";
import CompanyName from "../../../components/Onboarding/CompanyName";
import StudioSize from "../../../components/Onboarding/StudioSize";
import Currency from "../../../components/Onboarding/Currency";
import Crypto from "../../../components/Onboarding/Crypto";

import Loading from "../../../components/Loading/Loading";

const STEPS = [
  { component: AreYouPublisher, props: ["isSeller"] },
  { component: SellWithUs, props: ["sellWithUs"] },
  { component: CompanyName, props: ["companyName"] },
  { component: StudioSize, props: ["studioSize"] },
  { component: Currency, props: ["fiatCurrency"] },
  { component: Crypto, props: ["acceptedCrypto"] },
];

const HIDE_STYLES = {
  opacity: 0,
  transformOrigin: "50% 50%",
  transform: "scale(2, 2)",
  WebkitFilter: "blur(2px)",
  filter: "blur(2px)",
  transition: "all 1s",
};

const SHOW_STYLES = {
  opacity: 1,
  transformOrigin: "50% 50%",
  transform: "scale(1, 1)",
  WebkitFilter: "blur(0px)",
  filter: "blur(0px)",
  transition: "all 1s",
};

const SellerOnboarding = () => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [style, setStyle] = useState(HIDE_STYLES);
  const [redirect, setRedirect] = useState(false);

  const {
    forms: {
      onboarding,
      onboarding: { update, currentStep, nextStep },
    },
    auth: { user },
  } = useStore();

  const createSeller = async () => {
    if (await user.createSeller()) {
      setRedirect("/");
    }
  };

  const onAnimationEnd = () => {
    setShowQuestion(true);
    setTimeout(() => {
      setStyle(SHOW_STYLES);
    }, 0);
  };

  const next = (e) => {
    e.preventDefault();

    console.log(onboarding.toJSON());

    if (currentStep === 0 && !onboarding.isSeller) {
      onboarding.reset();
      setRedirect("/");
      return;
    }

    if (currentStep === 1 && !onboarding.sellWithUs) {
      onboarding.reset();
      setRedirect("/");
      return;
    }

    if (currentStep === 5) {
      createSeller();
    } else {
      setStyle(HIDE_STYLES);
      setTimeout(() => {
        setShowQuestion(false);
        nextStep();
        onAnimationEnd();
      }, 1000);
    }
  };

  const onTransitionEnd = () => {
    setStyle(SHOW_STYLES);
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const defaultProps = {
    update,
    nextStep: next,
    onTransitionEnd: onTransitionEnd,
    style,
  };

  const Component = STEPS[currentStep].component;
  const componentProps = STEPS[currentStep].props.reduce(
    (object, prop) => ({ ...object, [prop]: onboarding[prop] }),
    {}
  );

  return (
    <div className="App onboarding">
      <Welcome onAnimationEnd={onAnimationEnd} />
      {user.loadingSeller && <Loading />}
      {showQuestion && <Component {...defaultProps} {...componentProps} />}
    </div>
  );
};

export default observer(SellerOnboarding);
