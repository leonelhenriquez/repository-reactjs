const API = {
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://repository-server.herokuapp.com/"
      : "http://repository.nan/",
};

export default API;
