require("dotenv").config({ path: "../.env" });

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db/db");

const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res
        .status(401)
        .send({ message: "Incorrect username or password" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
    });

    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const userId = req.user.userId;

    const user = await User.findByPk(userId);

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    const hashedNewPassword = await hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password successfully changed" });
  } catch (error) {
    console.error("Error changing password: ", error);
    res.status(500).json({ message: "Error changing password" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findByPk(userId, {
      attributes: ["name", "email"],
    });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    res.json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Error retrieving user information:", error);
    res.status(500).send({ message: "Error retrieving user information." });
  }
};

module.exports = { login, register, changePassword, getUserInfo };
