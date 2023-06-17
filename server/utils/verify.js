const jwt = require("jsonwebtoken");
const createError = require("./error");

// token verification
const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token;
  if (!token) return next(createError(401, "You are unauthorized."));

  jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
    if (err) return next(createError(403, "Token is not valid."));
    req.user = userInfo;
    next();
  });
};

// user or admin verification
const verifyUserOrAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.id === req.params.userId || req.user?.isAdmin) {
      next();
    } else {
      next(createError(401, "You are not user, unauthorized user."));
    }
  });
};

// admin verification
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.isAdmin) {
      next();
    } else {
      next(createError(401, "You are not admin."));
    }
  });
};

/* To user verification for update or delete "post", i am adding this additional line of code "req.user?.id === req.body.userId" because we are gonna send userId in JSON Object and postId in URL as "/:postId" */

// const verifyUserOrAdminForPost = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user?.id === req.body.userId || req.user?.isAdmin) {
//       // console.log("This is from vfuaadminpost");
//       next();
//     } else {
//       next(createError(401, "You can update/delete only your post."));
//     }
//   });
// };

module.exports = {
  verifyToken,
  verifyUserOrAdmin,
  verifyAdmin,
  // verifyUserOrAdminForPost,
};
