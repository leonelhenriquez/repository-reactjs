import React from "react";

const Error = ({ staticContext = {} }) => {
  staticContext.status = 404;
  return <h1>Oops, nothing here!</h1>;
};

export default Error;
