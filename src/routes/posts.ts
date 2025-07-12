const router = require("express").Router();
const {
  titleValidator,
  contentValidator,
  postIdValidator,
  checkValidations,
} = require("../middleware/inputValidators");
const {
  getPosts,
  getSinglePost,
  createPost,
  editPost,
  deletePost,
} = require("../controllers/postsController");
import { isAdmin } from "../middleware/authMiddleware";

router.get("/", getPosts);
router.get("/:postId", postIdValidator, checkValidations, getSinglePost);
router.post(
  "/",
  titleValidator,
  contentValidator,
  checkValidations,
  createPost
);
router.put(
  "/:postId",
  isAdmin,
  titleValidator,
  contentValidator,
  checkValidations,
  editPost
);
router.delete("/:postId", isAdmin, deletePost);

module.exports = router;
