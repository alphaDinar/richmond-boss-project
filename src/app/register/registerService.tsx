import { sendOTP, sendSMS, verifyOTP } from "@/firebase/smsService";

export const runOTP = async (fullContact: string, nextStep: Function, errorStep: Function) => {
  const res = await sendOTP(fullContact);
  if (res.status === 200) {
    nextStep();
  } else {
    errorStep();
  }
}

export const checkOTP = async (fullContact: string, otp: string, nextStep: Function, errorStep: Function) => {
  const res = await verifyOTP(fullContact, otp);
  if (res.status === 200) {
    const resultData = res.data;
    Number(resultData["code"]) == 1104 ? errorStep() : nextStep();
  } else {
    errorStep();
  }
}