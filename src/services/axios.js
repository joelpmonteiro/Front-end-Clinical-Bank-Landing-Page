import axios from "axios";

const api = axios.create({
  baseURL: "https://dr-clinicalbank-prd.neurotech.com.br/",
  headers: {
    "Content-type": "application/json",
  },
});

const api02 = axios.create({
  baseURL: "https://cdc.clinicalbank.com.br/dev/apiv1",
  headers: {
    "Content-type": "application/json",
  },
});

export const postDataNeurotech = async (data) => {
  console.log("axios", data);
  const neurotech = api.post("services/rest/workflow/submit", data);
  return neurotech;
};

export const makePaymentCardCredit = async (data) => {
  const response = api02.post("/Creditcard/makePayment", data);
  return response;
};
