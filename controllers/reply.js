const BadRequestError = require("../errors/BadRequestError");
const Reply = require("../models/Reply.model");
const Message = require("../models/Message.model");

const sendReply = async (req, res) => {
  const { messageId } = req.params;
  const { reply } = req.body;
  const { userId } = req.user;
  console.log(userId);

  const message = await Message.findOne({
    where: {
      id: messageId,
      user_id: userId,
    },
  });

  if (!message) {
    throw new BadRequestError("Message is not available");
  }

  const recordCount = await Reply.count({
    where: {
      message_id: messageId,
    },
  });

  if (recordCount >= 3) {
    throw new BadRequestError("Cannot reply message more than 3 times");
  }

  const replyMsg = await Reply.create({ reply: reply, message_id: messageId });
  res.json({ success: true, reply: replyMsg });
};

// const getRep= async (req, res) => {
//   const { username } = req.params;
//   console.log(username);
//   const user = await User.findOne({ where: { username } });
//   const messages = await Message.findAll({
//     where: {
//       user_id: user.id,
//     },
//   });
//   res.json({ user, messages });
// };

module.exports = { sendReply };
