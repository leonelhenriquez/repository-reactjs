const API = {
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://repository-server.herokuapp.com/"
      : "https://respostory.nan/",
};

export default API;