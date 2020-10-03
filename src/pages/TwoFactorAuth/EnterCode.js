import React from "react";

const EnterCode = ({ authorize, resend }) => {
  const code1Ref = React.createRef(null);
  const code2Ref = React.createRef(null);
  const code3Ref = React.createRef(null);
  const code4Ref = React.createRef(null);
  const code5Ref = React.createRef(null);
  const code6Ref = React.createRef(null);
  const code7Ref = React.createRef(null);

  const codes = [
    code1Ref,
    code2Ref,
    code3Ref,
    code4Ref,
    code5Ref,
    code6Ref,
    code7Ref,
  ];

  const authorizeCode = () => {
    let code = "";
    codes.forEach((codeRef) => {
      if (codeRef.current) code += codeRef.current.value;
    });
    if (code.length === 7) {
      authorize(code);
    }
  };

  const moveNext = (e) => {
    const key = e.keyCode || e.charCode;
    const nextCodeRef = codes[parseInt(e.target.dataset.code)];
    const previousCodeRef = codes[parseInt(e.target.dataset.code) - 2];

    if (key === 8 || key === 46) {
      // go back one field
      if (previousCodeRef) previousCodeRef.current.select();
    } else {
      // go forward one field
      if (nextCodeRef) nextCodeRef.current.select();
    }
  };

  return (
    <div className="authorize">
      <h1> 2-Factor Auth </h1>

      <div className="code">
        <input
          type="text"
          onKeyUp={moveNext}
          maxLength="1"
          min="0"
          pattern="\d*"
          max="9"
          id="first digit"
          className="code-number"
          ref={code1Ref}
          data-code="1"
        />
        <input
          type="text"
          onKeyUp={moveNext}
          maxLength="1"
          min="0"
          pattern="\d*"
          max="9"
          id="second digit"
          className="code-number"
          ref={code2Ref}
          data-code="2"
        />
        <input
          type="text"
          onKeyUp={moveNext}
          maxLength="1"
          min="0"
          pattern="\d*"
          max="9"
          id="third digit"
          className="code-number"
          ref={code3Ref}
          data-code="3"
        />
        <input
          type="text"
          onKeyUp={moveNext}
          maxLength="1"
          min="0"
          pattern="\d*"
          max="9"
          id="fourth digit"
          className="code-number"
          ref={code4Ref}
          data-code="4"
        />
        <input
          type="text"
          onKeyUp={moveNext}
          maxLength="1"
          min="0"
          pattern="\d*"
          max="9"
          id="fifth digit"
          className="code-number"
          ref={code5Ref}
          data-code="5"
        />
        <input
          type="text"
          onKeyUp={moveNext}
          maxLength="1"
          min="0"
          pattern="\d*"
          max="9"
          id="sixth digit"
          className="code-number"
          ref={code6Ref}
          data-code="6"
        />
        <input
          type="text"
          onKeyUp={moveNext}
          maxLength="1"
          min="0"
          pattern="\d*"
          max="9"
          id="seven digit"
          className="code-number"
          ref={code7Ref}
          data-code="7"
        />

        {/* eslint-disable-next-line */}
      </div>
      <div className="submit-delivery">
        <button onClick={authorizeCode} className="topcoat-button--large--cta">
          Send
        </button>
      </div>
      <div className="submit-delivery">
        <button type="button" onClick={resend}>
          Resend Code
        </button>
      </div>
    </div>
  );
};

export default EnterCode;
