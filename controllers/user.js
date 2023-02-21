const User = require("../models/User.model");

const getProfile = async (req, res) => {
  // console.log("NAME IS " + username);
  // const user = await User.findOne({
  //   where: {
  //     username,
  //   },
  // });

  // console.log(user);

  const { userId, username } = req.user;

  const user = await User.findOne({
    where: {
      username,
    },
  });
  console.log("user profile called");
  res.json({ user });
};

module.exports = getProfile;
