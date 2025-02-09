
const otpStore = new Map(); 

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOtp = async (email, otp) => {
  otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); 
};

export const getOtp = async (email) => {
  const data = otpStore.get(email);
  if (data && data.expiresAt > Date.now()) {
    return data.otp;
  }
  otpStore.delete(email);
  return null;
};

export const deleteOtp = async (email) => {
  otpStore.delete(email);
};
