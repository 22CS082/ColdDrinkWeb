const  User  = require("../models/user_model");
const Rating = require("../models/rating");

// Home logic
const home = async (req, res) => {
  try {
    res.status(200).send('Welcome to my channel');
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

// Registration logic
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });
    res.status(201).json({
      msg: "Registration successfully completed",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json("Internal server error");
  }
};

// Login logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "Login successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json("Internal server error");
  }
};

// User logic
const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    console.error('User fetch error:', error);
    res.status(500).json("Internal server error");
  }
};

// Rating logic
const createRating = async (req, res) => {
  const { stars, feedback } = req.body;
  const userId = req.user._id;

  console.log('Received Stars:', stars); // Debug statement

  try {
    const newRating = new Rating({
      stars,
      feedback,
      user: userId,
    });

    await newRating.save();

    res.status(201).json({ message: 'Rating submitted successfully!' });
  } catch (error) {
    console.error('Error creating rating:', error);
    res.status(500).json({ message: 'Failed to submit rating' });
  }
};


module.exports = { home, register, login, user, createRating };
