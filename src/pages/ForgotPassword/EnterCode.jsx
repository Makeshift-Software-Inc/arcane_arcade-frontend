import React, { useState, useRef } from 'react';

const EnterCode = ({ authorize, resend }) => {
  const code1Ref = useRef(null);
  const code2Ref = useRef(null);
  const code3Ref = useRef(null);
  const code4Ref = useRef(null);
  const code5Ref = useRef(null);
  const code6Ref = useRef(null);
  const code7Ref = useRef(null);

  const [error, setError] = useState(false);

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
    setError(false);
    let code = '';
    codes.forEach((codeRef) => {
      if (codeRef.current) code += codeRef.current.value;
    });
    if (code.length === 7) {
      authorize(code);
    } else {
      setError('Please fill in all the fields');
    }
  };

  const moveNext = (e) => {
    const key = e.keyCode || e.charCode;
    const nextCodeRef = codes[parseInt(e.target.dataset.code, 10)];
    const previousCodeRef = codes[parseInt(e.target.dataset.code, 10) - 2];

    if (key === 8 || key === 46) {
      // go back one field
      if (previousCodeRef) previousCodeRef.current.select();
    } else {
      // go forward one field
      // eslint-disable-next-line no-lonely-if
      if (nextCodeRef) nextCodeRef.current.select();
    }
  };

  return (
    <div className="authorize">
      <h1> Secure Code </h1>

      <p>Check your e-mail for a secure code.</p>

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
      {error && (
        <small className="input-error input-error-center">{error}</small>
      )}
      <div className="submit-delivery">
        <button type="button" onClick={authorizeCode} className="button">
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
