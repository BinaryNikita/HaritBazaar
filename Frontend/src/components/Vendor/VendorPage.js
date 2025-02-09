import React, { useState } from 'react';
import TermsPage from './Terms';
import CreateVendor from '../Vendor/CreateVendor';
import Footer from '../FrontPage/Footer';
import Header from '../FrontPage/Header/Header';

const VendorPage = () => {
  const [hasAgreed, setHasAgreed] = useState(false);  // Track whether the user has agreed

  const handleAgree = () => {
    setHasAgreed(true);  // Set to true when user clicks Agree and Continue
  };

  return <>
    <Header />
    <div className="container py-5">
      {!hasAgreed ? (
        <TermsPage onAgree={handleAgree} />  // Show TermsPage until user agrees
      ) : (
        <CreateVendor />  // Show CreateVendor after user agrees
      )}
    </div>
    <Footer />
  </>
};

export default VendorPage;
