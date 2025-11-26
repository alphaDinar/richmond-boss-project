import CryptoJS from 'crypto-js';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


export const makePassword = async (password: string) => {
  const hashedPassword = CryptoJS.SHA256(password);
  return hashedPassword.toString(CryptoJS.enc.Hex);
}

export const genToken = (len: number) => {
  let token = '';
  for (let i = 0; i < len; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export const genOTP = (): number => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp;
};
