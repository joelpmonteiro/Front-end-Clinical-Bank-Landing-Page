import axios from "axios";
import * as jose from "jose";
import md5 from "md5";

const company_id = "b00cd1fd-b20f-49f1-97a2-88407d36c7fd";
const user_id = "31b86d3e-9790-4b88-9846-c337f16f385c";

const api = axios.create({
  baseURL: "http://177.136.201.182/api/",
  //baseURL: "http://localhost:3333/api/",
});

const api02 = axios.create({
  baseURL: "https://cdc.clinicalbank.com.br/dev/apiv1",
  headers: {
    "Content-type": "application/json",
  },
});

async function auth(data) {
  const secret = new TextEncoder().encode(
    md5(
      `${JSON.stringify({
        company_id,
        user_id,
        ...data,
      })}:${user_id}:${company_id}`
    )
  );

  const token = await new jose.SignJWT({
    company_id,
    user_id,
    ...data,
  })
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const postDataNeurotech = async (data) => {
  const neurotech = await api.post(
    "debt/consult?simple",
    {
      company_id,
      user_id,
      ...data,
    },
    await auth(data)
  );
  return neurotech;
};

export const creditSimulation = async (data) => {
  return await api.post(
    "debt/simulation?simple",
    {
      company_id,
      user_id,
      ...data,
    },
    await auth(data)
  );
};

export const requestDataUser = async (data) => {
  return await api.post(
    "customer/create?simple",
    {
      company_id,
      user_id,
      ...data,
    },
    await auth(data)
  );
};

export const makePaymentCardCredit = async (data) => {
  const response = api.post(
    "billing/create?simple",
    {
      company_id,
      user_id,
      ...data,
    },
    await auth(data)
  );
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
