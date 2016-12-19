/**
 * Name:
 * Author: Chrissprance
 * Creation Date: 12/17/2016
 * Description:
 */
import React from 'react';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const EventsDrawer = (props) => {
  return (
    <Drawer
      docked={false}
      width={400}
      open={props.drawerOpen}
      onRequestChange={props.handleDrawerOpen}
    >

      <TextField
        onChange={props.handleChatLogPathChange}
        value={props.chatLogPath}
        floatingLabelText={"Chat Log Path"}
      />
      <FlatButton secondary={true} onTouchTap={props.pickChatLogPath} label={"Browse"}/>

      <TextField
        onChange={props.handleDamageLogPathChange}
        value={props.damageLogPath}
        floatingLabelText={"Damage Log Path"}
      />
      <FlatButton secondary={true} onTouchTap={props.pickDamageLogPath} label={"Browse"}/>

    </Drawer>
  );
};

export default EventsDrawer;
