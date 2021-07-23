const jwt = require("jsonwebtoken");
const Users = require("../service/users");
const { HttpCode } = require("../helpers/constants");
require("dotenv").config();
const fs = require('fs').promises;
const path = require('path');
const Jimp = require("jimp");

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
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        name: req.user.name,
        email: req.user.email,
        subscription: req.user.subscription,
      },
    });
  } catch (err) {
    next(err)
  }
};

const updateUserAvatar = async (req, res, next)=>{

  try {
    const id = req.user.id;
    const avatarUrl = await saveAvatarToStatic(req);
    await Users.updateAvatar(id, avatarUrl);

    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        ...req.body,
        avatarUrl,
      }
    })
  } catch (err) {
    next(err);
  }
};

const saveAvatarToStatic = async (req) => {
  const folderForAvatar = req.user.id;    
  const filePath = req.file.path;
  // console.log("in begin: ",filePath);
  const avatarName = req.file.originalname;  
  const file = await Jimp.read(filePath);
  await file.resize(250, 250).quality(70).writeAsync(filePath);
  await fs.rename(filePath, path.join(process.cwd(), 'public', 'avatars', folderForAvatar, avatarName));
  avatarUrl = path.join(folderForAvatar, avatarName).replace('\\', '/');
  try {
    await fs.unlink(req.file.path)
    // console.log("after: ",req.file.path);
  } catch (err) {
    console.log(err.message);
  }

  return avatarUrl;
}


module.exports = { reg, login, logout, currentUser, updateUserAvatar };