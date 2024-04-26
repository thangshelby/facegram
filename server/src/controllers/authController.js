import { Account } from "../config/models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const singIn = async (req, res) => {
  try {
    const {email,password} = req.body;
  

    const user = await Account.findOne({ email: email });
    // const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // if (!isPasswordCorrect) {
    //   return res
    //     .status(401)
    //     .json({ status: "wrongpassword", log: "Your Password is not Correct." });
    // }

    const AccessToken = createAccessToken(email, password);
    const RefreshToken = createRefreshToken(email, password);

    res.cookie("RefreshToken", RefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({ user, token: AccessToken });
  } catch (error) {
    return res
      .status(401)
      .json({ status: "wrongemail", log: "This Email is not Exited." });
  }
};
export const signUp = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;
    const isEmailUnique = await Account.find({ email: email });
    if (!isEmailUnique) {
      return res
        .status(501)
        .json("This Email is Used. Please choose another Email !");
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newAccount = new Account({
      name: name,
      userName: userName,
      email: email,
      password: hashedPassword,
      imgAvatar: "",
      posts: [],
      followers: [],
      followings: [],
    });
    await newAccount.save()
    .then(() => {
      const AccessToken = createAccessToken(email, password);
      const RefreshToken = createRefreshToken(email, password);
  
      res.cookie("RefreshToken", RefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
  

      return res.status(200).json({user:newAccount,AccessToken});
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createAccessToken = (email, password) => {
  const token = jwt.sign({ email, password }, process.env.ACCESS_TOKEN, {
    expiresIn: "3000s",
  });
  return token;
};
 
export const createRefreshToken = (email, password) => {
  const token = jwt.sign({ email, password }, process.env.REFRESH_TOKEN, {
    expiresIn: "10000s",
  });
  return token;
};
