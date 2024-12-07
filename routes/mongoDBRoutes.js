const express = require("express");
const router = express.Router();

const {addData, getAll, getById, deleteById, updateById} = require("../controllers/mongoDBController");

router.route("/").get(getAll).post(addData);
router.route("/:id").get(getById).delete(deleteById).put(updateById);

module.exports = {routes: router};