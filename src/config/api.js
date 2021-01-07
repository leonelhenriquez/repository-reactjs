const SERVER_API = process.env.NODE_ENV || "production";

const API = {
  baseURL:
    SERVER_API === "production"
      ? "https://api.repository.studio/"
      : "https://api.repository.studio/",
};

export default API;
