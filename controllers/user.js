const User = require("../models/User.model");

const getUsers = async (req, res) => {
  const { username } = req.params;
  console.log("NAME IS " + username);
  const user = await User.findOne({
    where: {
      username,
    },
  });

  console.log(user);
};

module.exports = getUsers;
