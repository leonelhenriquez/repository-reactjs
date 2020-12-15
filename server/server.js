import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import MainApp from "../src/MainApp";
import path from "path";
import fs from "fs";
import { StaticRouter } from "react-router-dom";

const env = process.env.NODE_ENV || "development";

const PORT = process.env.PORT || 80;

const app = express();

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("/*", (req, res) => {
  const context = {};

  fs.readFile(path.resolve("./build/index.html"), "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong: ", err);
      return res.status(500).send("Oops, better luck next time !");
    }

    if (context.status == 404) {
      res.status(404);
    }

    if (context.url) {
      return res.redirect(301, context.url);
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        '<div id="root" >' +
          ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={context}>
              <MainApp />
            </StaticRouter>
          ) +
          "</div>"
      )
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} - ${env}`);
});
