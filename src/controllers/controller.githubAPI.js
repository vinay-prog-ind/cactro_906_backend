const githubApi = require("../middleware/middleware.githubAPIHeader");

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

exports.getActivityLog = async (req, res) => {
    try {
      const userResponse = await githubApi.get(`/users/${GITHUB_USERNAME}`);
      const reposResponse = await githubApi.get(`/users/${GITHUB_USERNAME}/repos`);
  
      const data = {
        username: userResponse.data.login,
        followers: userResponse.data.followers,
        following: userResponse.data.following,
        public_repos: userResponse.data.public_repos,
        repos: reposResponse.data.map((repo) => ({
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
        })),
      };
  
      res.status(200).json({status: "success", data});
    } catch (err) {
      res.status(err.status).json({ error: "Failed to fetch GitHub data", error_message: err.message, error_code: err.code});
    }
}

exports.getRepoData = async (req, res) => {
    const repoName = req.params.repo;
  
    try {
      const repoResponse = await githubApi.get(`/repos/${GITHUB_USERNAME}/${repoName}`);
      const data = {
        name: repoResponse.data.name,
        description: repoResponse.data.description,
        stars: repoResponse.data.stargazers_count,
        forks: repoResponse.data.forks_count,
        url: repoResponse.data.html_url,
      };
  
      res.json(data);
    } catch (err) {
      res.status(err.status).json({ error: "Repository not found", error_message: err.message, error_code: err.code});
    }
}

exports.createIssue = async (req, res) => {
    const repoName = req.params.repo;
    const { title, body } = req.body;
  
    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required" });
    }
  
    try {
      const issueResponse = await githubApi.post(
        `/repos/${GITHUB_USERNAME}/${repoName}/issues`,
        { title, body }
      );
  
      res.json({ url: issueResponse.data.html_url });
    } catch (err) {
      res.status(err.status).json({ error: "Failed to create issue", error_message: err.message, error_code: err.code});
    }
}