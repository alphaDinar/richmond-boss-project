import axios from "axios";

const apiKey = 'Z2ROSXNnamNqckFMc2NQdGtLQmk'
// const apiKey = "VXhIcWJZYUZIUUNDd21peUdlQU8";

const space = "%0A";

const headers = {
  'api-key': apiKey,
};

export const sendOTP = async (contact: string) => {
  const url = 'https://sms.arkesel.com/api/otp/generate';
  const payload = {
    "expiry": 10,
    "length": 6,
    "medium": "sms",
    "message": "%otp_code%, Your OTP Expires in 10 mins",
    "number": contact,
    "sender_id": "Maqete",
    "type": "numeric"
  }

  const response = await axios.post(url, payload, { headers });
  return response;
}


export const verifyOTP = async (contact: string, code: string) => {
  const url = 'https://sms.arkesel.com/api/otp/verify';
  const payload = { "code": code, "number": contact };
  const response = await axios.post(url, payload, { headers });
  return response;
}


export const sendSMS = async (contact: string, message: string) => {
  const params = {
    action: 'send-sms',
    api_key: 'Z2ROSXNnamNqckFMc2NQdGtLQmk',
    to: contact,
    from: 'Maqete',
    sms: message
  };

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://corsproxy.io/?https://sms.arkesel.com/sms/api?action=send-sms',
    params: params
  };

  const response = await axios.request(config);
  return response;
}

export const sendWelcomeSMS = async (contact: string) => {
  // const message =
  //   "Welcome to Maqete! 🎉\n"
  //   "Thank you for registering!\n" +
  //   "Enjoy 5% off your first order with code WELCOME5.\n" +
  //   "If you need assistance, we’re here to help!\n" +
  //   "Happy shopping! 🛍️";
  const message = "Welcome to Maqete!. Thank for registering. we’re here to help! Easy Shopping, Fast Deliveries! 🛍️";
  await sendSMS(contact, message);
}

export const sendOrderPlacedSMS = async (contact: string, username: string, oid: string) => {
  const message = `Hi ${username}, thank you for your order! We're processing it now and will keep you updated on its status. https://www.maqete.com/orders?oid=${oid}`
  await sendSMS(contact, message);
}




// prompt sms for you
export const sendOrderPlacedPrompt = async (contact: string, oid: string, address: string) => {
  const message = `An order has been placed location : ${address}, contact : ${contact}, oid : ${oid}`;
  sendSMS('233558420368', message);
}