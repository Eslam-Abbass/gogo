const { uploadSingleFile } = require("../../utils/fileUpload");
const { signUp, getUsers } = require("./user.service");

const router = require("express").Router();

router.route("/signUp").post(uploadSingleFile("prfileImage", "user"), signUp).get(getUsers);

module.exports = router;
