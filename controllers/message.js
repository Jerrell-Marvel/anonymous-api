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

    res.json({
      success: true,
      msg: {
        replies: [],
        ...msg.dataValues,
      },
    });
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

const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  const { userId } = req.user;

  const deletedCount = await Message.destroy({
    where: {
      id: messageId,
      user_id: userId,
    },
  });

  if (deletedCount !== 0) {
    return res.json({ success: true, deletedCount });
  }

  throw new BadRequestError("Can't find message");
};

module.exports = { sendMessage, getMessages, deleteMessage };
