const SERVER_API = process.env.NODE_ENV || "production";

const API = {
  baseURL:
    SERVER_API === "production"
      ? "https://api.repository.studio/"
      : "http://localhost:8000/",
};

export default API;
