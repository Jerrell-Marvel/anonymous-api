const BadRequestError = require("../errors/BadRequestError");
const User = require("../models/User.model");
const Message = require("../models/Message.model");
const Reply = require("../models/Reply.model");
const Sequelize = require("sequelize");

const getProfile = async (req, res) => {
  // console.log("NAME IS " + username);
  // const user = await User.findOne({
  //   where: {
  //     username,
  //   },
  // });

  // console.log(user);

  const { userId } = req.user;
  const { message } = req.query;
  let profile;

  if (message === "include") {
    profile = await User.findOne({
      where: { id: userId },
      // attributes: ["id", "username"],
      include: [
        {
          attributes: ["id", "message", "createdAt"],
          model: Message,
          as: "messages",
          separate: true,
          order: [["createdAt", "DESC"]],
          include: [
            {
              attributes: [["id", "reply_id"], "reply"],
              model: Reply,
              as: "replies",
            },
          ],
        },
      ],
    });
  } else {
    profile = await User.findOne({
      where: { id: userId },
      // attributes: ["id", "username"],
    });
  }
  console.log("user profile called");
  res.json({ user: profile });
};

const updateProfile = async (req, res) => {
  const { userId } = req.user;
  const { username, instagram, twitter, bio } = req.body;

  // console.log(instagram, twitter);

  if (!username) {
    throw new BadRequestError("Username can't be empty");
  }
  try {
    await User.update(
      { username, instagram, twitter, bio },
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

const getUsers = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.json({ users: [] });
  }
  const users = await User.findAll({
    where: Sequelize.where(Sequelize.fn("lower", Sequelize.col("username")), {
      [Sequelize.Op.like]: `%${q}%`,
    }),
  });

  res.json({ users });
};

module.exports = { getProfile, updateProfile, getUsers };
