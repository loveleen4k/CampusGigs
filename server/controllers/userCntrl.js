const Users = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCntrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "Email Already Registered." });
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });

      // Password encryption
      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });

      // Save user in the database
      await newUser.save();

      // Create JWT tokens
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/user/refreshtoken",
      });

      // Send response
      res.json({ msg: "Registration Successful!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      // Set refresh token in a cookie
      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/user/refreshtoken",
      });

      res.json({ accessToken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  refreshtoken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Invalid Refresh Token" });
        const accessToken = createAccessToken({ id: user.id });
        res.json({ user, accessToken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refreshtoken" });
      return res.json({ msg: "Logged Out" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User not found" });
      res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      const { name, email, location, contactInfo, jobPreferences, skills } = req.body;
      if (!user) return res.status(400).json({ msg: "User not found" });
      const updatedUser = await Users.findByIdAndUpdate(
        user.id,
        { name, email, location, contactInfo, jobPreferences, skills },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.json({msg: updatedUser});
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User not found" });
      await Users.findByIdAndDelete(req.user.id);
      res.clearCookie("refreshtoken", { path: "/user/refreshtoken" });
      res.json({ msg: "User deleted" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userCntrl;
