const BadRequestError = require("../errors/BadRequestError");
const Message = require("../models/Message.model");
const Reply = require("../models/Reply.model");
const User = require("../models/User.model");

const sendMessage = async (req, res) => {
  const { userId } = req.params;
  const { message } = req.body;
  console.log(userId);
  try {
    const msg = await Message.create({ message, user_id: userId });
    res.json({ success: true, msg });
  } catch (err) {
    throw new BadRequestError("Invalid user");
  }
};

const getMessages = async (req, res) => {
  const { username } = req.params;
  console.log(username);
  const user = await User.findOne({
    where: { username },
    attributes: ["id", "username"],
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
  // const messages = await Message.findAll({
  //   where: {
  //     user_id: user.id,
  //   },
  // });
  res.json({ user });
};

module.exports = { sendMessage, getMessages };
