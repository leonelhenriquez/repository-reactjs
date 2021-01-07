const SERVER_API = process.env.NODE_ENV || "production";

const API = {
  baseURL:
    SERVER_API === "production"
      ? "http://localhost:8000/"
      : "http://localhost:8000/",
};

export default API;
