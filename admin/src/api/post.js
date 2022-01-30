import client from "./axios";

export const getPosts = async (pageNo, limit) => {
  try {
    const { data } = await client.get(
      `/post/posts?pageNo=${pageNo}&limit=${limit}`
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
