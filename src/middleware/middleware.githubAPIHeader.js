const { default: axios } = require("axios");
require("dotenv").config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const githubApi = axios.create({
      baseURL: "https://api.github.com",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
});

module.exports = githubApi;