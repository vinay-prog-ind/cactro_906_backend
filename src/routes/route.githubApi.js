const {Router} = require("express");
const { getActivityLog, getRepoData, createIssue } = require("../controllers/controller.githubAPI");

const router = Router();

router.route("/").get(getActivityLog);
router.route("/:repo").get(getRepoData);
router.route("/:repo/issues").get(createIssue);

module.exports = router;