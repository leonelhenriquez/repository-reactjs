const API = {
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://repository-server.herokuapp.com/"
      : "http://localhost:8000/",
};

export default API;
