import React from 'react';

const TermsPage = ({ onAgree }) => {
  const darkGreen = '#018749';

  return <>
    <div className="container my-5">
      <h1 className="text-center mb-4 fw-bold" style={{ color: darkGreen }}><big>Vendor Terms and Conditions</big></h1>

      <div className="terms-section mb-4">
        <h3 className="h5" style={{ color: darkGreen }}>1. Eco-Friendly Shipping Requirement</h3>
        <p style={{textIndent: 30}}>
          As part of our commitment to sustainability, all vendors must offer eco-friendly shipping methods,
          such as using biodegradable packing materials and offering carbon-neutral shipping options.
          Please ensure that your shipping practices align with these standards.
        </p>
      </div>

      <div className="terms-section mb-4">
        <h3 className="h5" style={{ color: darkGreen }}>2. 2% Service Charge on Each Order</h3>
        <p style={{textIndent: 30}}>
          We will charge a 2% service fee on each order processed through the platform.
          This fee will be deducted from the total sale price, and vendors will receive the remaining balance
          after the deduction.
        </p>
      </div>

      {/* Add other terms sections ... */}

      <div className="terms-section mb-4 text-center">
        <button
          className="btn"
          style={{ backgroundColor: darkGreen, color: 'white' }}
          onClick={onAgree}>
          Agree and Continue
        </button>
      </div>
    </div>
  </>
};

export default TermsPage;
