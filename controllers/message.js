const BadRequestError = require("../errors/BadRequestError");
const Message = require("../models/Message.model");
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
  const user = await User.findOne({ where: { username } });
  const messages = await Message.findAll({
    where: {
      user_id: user.id,
    },
  });
  res.json({ user, messages });
};

module.exports = { sendMessage, getMessages };
