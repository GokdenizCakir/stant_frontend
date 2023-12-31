import axios from "axios";

export const getQuestion = async () => {
  try {
    const response = await axios.get(
      "https://backend.skyl.app/api/v1/questions",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getLeaderboard = async (page) => {
  try {
    const response = await axios.get(
      `https://backend.skyl.app/api/v1/players/${page}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const answerQuestion = async (data) => {
  try {
    const response = await axios.post(
      "https://backend.skyl.app/api/v1/questions/answer",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(
      "https://backend.skyl.app/api/v1/players",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};
