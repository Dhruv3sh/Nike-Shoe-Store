import { API_URL, STRAPI_API_TOKEN } from "./urls";

export const fetchDataFromAPI = async (endpoint) => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    return res.json();
  } catch (error) {
    console.error("An error occured " + error);
  }
};

export const makePaymentReq = async (endpoint, payload) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const res = await fetch(`${API_URL}${endpoint}`, options);
  return await res.json();
};
