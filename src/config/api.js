const SERVER_API = process.env.SERVER_API || "production";

const API = {
  baseURL:
    SERVER_API === "production"
      ? "https://repository-server.herokuapp.com/"
      : "http://localhost:8000/",
};

export default API;
