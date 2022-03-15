require("dotenv").config();

const express = require("express");
const { options } = require("request");
const request = require("request");
const app = express();

const config = {
  client_id: process.env.github_client_id,
  client_secret: process.env.github_client_secret,
  redirect_url: "http://localhost:3000/github/callback",
  authorize_url: "https://github.com/login/oauth/authorize",
  token_url: "https://github.com/login/oauth/access_token",
  user_url: "https://api.github.com/user",
  scope: "user",
};


app.get("/github/auth", (req, res) => {
  return res.redirect(config.authorize_url);
});

app.get("/github/callback", function (req, res) {
  const code = req.query.code;

  options = {
    method: "post",
    uri: config.token_url,
    formData: {
      client_id: config.client_id,
      client_secret: config.client_secret,
      code: code
    },
    headers: {
      accept: "application/json",
    },
  };
  request(options, function (e, r, b) {
    if (b) {
      jb = JSON.parse(jb);
    }
    options_user = {
      method: "get",
      uri: config.user_url + "access_token =" + jb.access_token,
      headers: {
        accept: "application/json",
        "User-Agent": "custom",
      },
    };
    request(options_user, function (ee, rr, bb) {
      if (bb) {
        const bo = JSON.parse(bb);
        const resp = {
          name: bo.name,
          url: bo.url,
          id: bo.id,
          bio: bo.bio,
        };
        return res.json(resp);
      } else {
        console.log(er);
        return res.json(er);
      }
    });
  });
});

app.listen(3000, () => console.log("listening at port 3000"));
