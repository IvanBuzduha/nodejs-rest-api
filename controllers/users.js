const jwt = require("jsonwebtoken");
const Users = require("../service/users");
const { HttpCode } = require("../helpers/constants");
require("dotenv").config();

const reg = async (req, res, next) => {

  try {
    const { email } = req.body;
    const user = await Users.findByEmail(email);

    if (user) {

      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        data: "Conflict",
        message: "Email already use",
      });
    }
    const newUser = await Users.create(req.body);

    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      user: {
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {

  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.validPassword(password);

    if (!user || !isValidPassword) {

      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        data: "UNAUTHORIZED",
        message: "Email or password is wrong",
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" });
    await Users.updateToken(id, token);

    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        token,
        user: {
          name: user.name,
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
  const id = req.user.id;
  await Users.updateToken(id, null);

  return res.status(HttpCode.NO_CONTENT).json({
    code: HttpCode.NO_CONTENT,    
    message: "No Content",
  });
  }catch(err){
    next(err);
  }
};

const currentUser = async (req, res, next) => {

  try {

    if (!req.user) {

      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        data: "UNAUTHORIZED",
        message: "Not authorized",
      });
    }
    const id = req.user.id;
    const currentUser = await Users.findById(id);

    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        name: currentUser.name,
        email: currentUser.email,
        subscription: currentUser.subscription,
      },
    });
  } catch (err) {
    next(err)
  }
};

module.exports = { reg, login, logout, currentUser };