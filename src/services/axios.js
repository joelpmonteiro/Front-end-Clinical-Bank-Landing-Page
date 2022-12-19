import axios from "axios";

const api = axios.create({
  baseURL: "http://177.136.201.182/api/",
});

const api02 = axios.create({
  baseURL: "https://cdc.clinicalbank.com.br/dev/apiv1",
  headers: {
    "Content-type": "application/json",
  },
});

export const postDataNeurotech = async (data) => {
  const neurotech = await api.post("debt/consult", data);
  return neurotech;
};

export const creditSimulation = async (data) => {
  return await api.post("debt/simulation", data);
};

export const requestDataUser = async (data) => {
  return await api.post("customer/create", data);
};

export const makePaymentCardCredit = async (data) => {
  const response = api.post("billing/create", data);
  return response;
};

export const getAllState = async () => {
  return api.get("state/list");
};

export const getAllCity = async () => {
  return api.get("city/list");
};
export const getStateByCountry = async ({ state_id }) => {
  const response = api.get("state/show", {
    headers: {
      state_id: state_id,
    },
  });

  return response;
};

export const getCityByState = async ({ city_id }) => {
  const response = api.get("state/show", {
    headers: {
      city_id: city_id,
    },
  });

  return response;
};
