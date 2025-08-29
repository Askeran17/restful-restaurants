import { API_ENDPOINT } from ".";

const BASE_API_ROUTE = `${API_ENDPOINT}/restaurants/starred`;

export const addStarredRestaurant = async (restaurantId, comment = "") => {
  const response = await fetch(`${BASE_API_ROUTE}`, {
    method: "POST",
    body: JSON.stringify({ restaurantId, comment }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.json();
};

export const getStarredRestaurants = async () => {
  const response = await fetch(`${BASE_API_ROUTE}`);
  const json = await response.json();

  return json;
};

export const unstarRestaurant = async (id) => {
  const response =  await fetch(`${BASE_API_ROUTE}/${id}`, {
    method: "DELETE"
  });

  return response.status;
};

export const updateComment = async (id, newComment) => {
  const response = await fetch(`${BASE_API_ROUTE}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      comment: newComment,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  return response.status;
};