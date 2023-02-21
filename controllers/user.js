const BadRequestError = require("../errors/BadRequestError");
const User = require("../models/User.model");

const getProfile = async (req, res) => {
  // console.log("NAME IS " + username);
  // const user = await User.findOne({
  //   where: {
  //     username,
  //   },
  // });

  // console.log(user);

  const { userId } = req.user;

  const user = await User.findOne({
    where: {
      id: userId,
    },
  });
  console.log("user profile called");
  res.json({ user });
};

const updateProfile = async (req, res) => {
  const { userId } = req.user;
  const { username } = req.body;

  if (!username) {
    throw new BadRequestError("Username can't be empty");
  }
  try {
    await User.update(
      { username },
      {
        where: {
          id: userId,
        },
      }
    );
  } catch (err) {
    throw new BadRequestError("Duplicate username");
  }

  res.json({ success: true });
};

module.exports = { getProfile, updateProfile };
