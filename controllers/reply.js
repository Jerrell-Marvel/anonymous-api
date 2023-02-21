const BadRequestError = require("../errors/BadRequestError");
const Reply = require("../models/Reply.model");
const Message = require("../models/Message.model");

const sendReply = async (req, res) => {
  const { messageId } = req.params;
  const { reply } = req.body;
  try {
    const replyMsg = await Reply.create({ reply: reply, message_id: messageId });
    res.json({ success: true, reply: replyMsg });
  } catch (err) {
    throw new BadRequestError("Invalid user");
  }
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
