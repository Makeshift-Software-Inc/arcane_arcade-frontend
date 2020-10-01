import React from "react";
import { observer } from "mobx-react";

import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../components/Loading/Loading";
import Errors from "../../components/Errors/Errors";

import SendCode from "./SendCode";
import EnterCode from "./EnterCode";

import "./TwoFactorAuth.scss";

import { useStore } from "../../store";

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
      history.push("/");
    }
  };

  const renderContent = () => {
    if (auth.loading) return <Loading />;

    if (!two_factor_auth.codeSent)
      return (
        <SendCode
          selected={two_factor_auth.delivery_method}
          onChange={two_factor_auth.onChange}
          send={sendAuthCode}
        />
      );

    return <EnterCode authorize={authorize} resend={sendAuthCode} />;
  };

  return (
    <div className="App two-factor">
      <Navbar />
      {renderContent()}
      <Errors errors={two_factor_auth.errors.full_messages.toJSON()} />
    </div>
  );
};

// class TwoFactorAuth extends React.Component {
//   constructor(props) {
//     super(props);

//     this.chooseDelivery = React.createRef();
//     this.enterCode = React.createRef();

//     this.state = {
//       deliveryMethod: "",
//       user: this.props.location.state,
//     };
//   }

//   deliverCode() {
//     const emailOption = document.querySelector('input[type="radio"]#email');
//     const smsOption = document.querySelector('input[type="radio"]#sms');
//     let deliveryMethod;

//     if (emailOption.checked) deliveryMethod = "email";
//     if (smsOption.checked) deliveryMethod = "sms";

//     const userID = this.state.user.id;

//     axios
//       .post(
//         `http://localhost:3000/v1/send_auth_token/${userID}`,
//         {
//           auth: { delivery_method: deliveryMethod },
//         },
//         { withCredentials: true }
//       )
//       .then((response) => {
//         this.chooseDelivery.current.classList.add("is-hidden");
//         this.enterCode.current.classList.remove("is-hidden");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   moveNext(e) {
//     const numberInput = e.target;
//     if (numberInput.value.length > numberInput.maxLength)
//       numberInput.value = numberInput.value.slice(
//         numberInput.value.length - 1,
//         numberInput.maxLength
//       );

//     var key = e.keyCode || e.charCode;

//     if (key === 8 || key === 46) {
//       const lastSibling = numberInput.previousSibling;
//       if (lastSibling) lastSibling.focus();
//     } else {
//       numberInput.nextElementSibling.focus();
//     }
//   }

//   authorize(e) {
//     const digits = document.querySelectorAll("input[type=number]");

//     let code = "";
//     digits.forEach((digit) => {
//       if (digit.value) code += digit.value;
//     });

//     const userID = this.state.user.id;

//     axios
//       .post(
//         `http://localhost:3000/v1/authorize/${userID}`,
//         {
//           auth: { code: code },
//         },
//         { withCredentials: true }
//       )
//       .then((response) => {
//         this.props.handleLogin(this.state);
//         this.props.history.push("/");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// }

export default observer(TwoFactorAuth);
