import React, { useState } from "react";
import { connect } from "react-redux";
import { Drawer } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { Sidebar } from "./index";
import { searchUsers } from "../../store/utils/thunkCreators";
import { clearSearchedUsers } from "../../store/conversations";


const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: 'none',
    background: "#fafafa"
  },

}));


const SidebarContainer = (props) => {
  const classes = useStyles();
  const { searchUsers, clearSearchedUsers } = props;

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = async (event) => {
    if (event.target.value === "") {
      // clear searched convos from redux store
      clearSearchedUsers();
      setSearchTerm("");
      return;
    }
    if (searchTerm.includes(event.target.value)) {
      // if new value is included in search term, we don't need to make another API call, just need to set the search term value so the conversations can be filtered in the rendering
      setSearchTerm(event.target.value);
      return;
    }
    await searchUsers(event.target.value);
    setSearchTerm(event.target.value);
  };

  return (
    <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
      <Sidebar handleChange={handleChange} searchTerm={searchTerm} />
    </Drawer>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchUsers: (username) => {
      dispatch(searchUsers(username));
    },
    clearSearchedUsers: () => {
      dispatch(clearSearchedUsers());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContainer);
