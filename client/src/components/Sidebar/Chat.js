import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { clearConversationUnreadCount } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
};

class Chat extends Component {
  handleClick = async (conversation, clearUnreadCount) => {
    await this.props.setActiveChat(conversation, clearUnreadCount);
  };

  
  render() {
    const { conversation } = this.props;
    const { classes } = this.props;
    const { otherUser } = conversation;
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    const activeChat = otherUser.username === this.props.activeConversation;
    const isLastMessageByOtherUser = lastMessage ? otherUser.id === lastMessage.senderId : false;
    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation, isLastMessageByOtherUser)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={this.props.conversation} isLastMessageByOtherUser={isLastMessageByOtherUser} activeChat={activeChat}/>
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (conversation, clearUnreadCount) => {
      dispatch(setActiveChat(conversation.otherUser.username));
      if(clearUnreadCount) {
        dispatch(clearConversationUnreadCount(conversation));
      }
    },
  };
};

const mapStateToProps = (state) => {
  return {
    activeConversation: state.activeConversation
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat));
