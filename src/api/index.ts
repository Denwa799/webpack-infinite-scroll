/**
 * @description This function is used to GET requests from any url
 *
 * @param {string} url - address for request
 * @param {object} params - query params
 * @returns {Promise<any>} - return json
 */
export const getService = async (url: string, params = {}) => {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(`${url}?${searchParams}`);
  return response.json();
};
