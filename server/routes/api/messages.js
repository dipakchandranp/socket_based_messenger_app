const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // find a conversation to securely update message or add if not there
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );
    // if we already know conversation id, find the conversion by senderId and recipientId
    // and make sure conversationId matches. Then add it to message and return
    if (conversationId) {
      const convJson = conversation.toJSON();
      if(conversation && conversation.id == conversationId) {
        // if last message is by current user, increment count, else set count to one
        let newUnreadCount = 1;
        if(convJson.messages[0].senderId == senderId) {
          newUnreadCount = conversation.unreadCount + 1; // increase unread count
        }
        await conversation.update({ unreadCount: newUnreadCount}); // increase unread count
        const message = await Message.create({ senderId, text, conversationId });
        return res.json({ message, sender });
      } 
      // given conversation id doesn't exist
      return res.status(401).json({ error: "Cannot send message to different user's conversation" });
    }
    
    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
        unreadCount: 1
      });
      if (sender && onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    return res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
