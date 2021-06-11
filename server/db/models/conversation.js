const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {
  unreadCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    },
    order: [[Message, "createdAt", "DESC"]],
    include: [ // TODO: only last message
      {
        model: Message,
        order: ["createdAt", "DESC"],
      }
    ]
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
