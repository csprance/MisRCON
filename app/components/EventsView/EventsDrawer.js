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

import {white} from '../../styles/colors';
const EventsDrawer = (props) => {
  return (
    <Drawer
      docked={false}
      width={400}
      open={props.drawerOpen}
      onRequestChange={props.handleDrawerOpen}
      containerStyle={{
        paddingLeft: '10px',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}>

      <h2>Local Log Paths</h2>

      <div style={{display: 'flex', width: '100%', flexShrink: 1, alignItems: 'flex-end'}}>
        <TextField
          floatingLabelStyle={{color: white}}
          style={{width: '85%'}}
          onChange={props.handleChatLogPathChange}
          value={props.chatLogPath}
          floatingLabelText={"Chat Log Path"}
        />
        <FlatButton secondary={true} onTouchTap={props.pickChatLogPath} label={"Browse"}/>
      </div>


      <div style={{display: 'flex', width: '100%', flexShrink: 1, alignItems: 'flex-end'}}>
        <TextField
          floatingLabelStyle={{color: white}}
          style={{width: '85%'}}
          onChange={props.handleDamageLogPathChange}
          value={props.damageLogPath}
          floatingLabelText={"Damage Log Path"}
        />
        <FlatButton
          secondary={true} onTouchTap={props.pickDamageLogPath} label={"Browse"}/>
      </div>

      <div style={{display: 'flex', width: '100%', flexShrink: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FlatButton secondary={true} onTouchTap={props.parseDamageLogs} label={"Damage"}/>
        <FlatButton secondary={true} onTouchTap={props.parseChatLogs} label={"Chat"}/>
        <FlatButton secondary={true} onTouchTap={props.parseAllLogs} label={"All"}/>
      </div>

      <h2>API Log Access</h2>
      <div style={{display: 'flex', width: '100%', flexShrink: 1, alignItems: 'flex-end'}}>
        <TextField
          disabled={true}
          floatingLabelStyle={{color: white}}
          style={{width: '85%'}}
          onChange={props.handleDamageLogPathChange}
          value={props.apiKey}
          floatingLabelText={"API Key"}
        />
      </div>

      <div style={{display: 'flex', width: '100%', flexShrink: 1, alignItems: 'flex-end'}}>
        <TextField
          disabled={true}
          floatingLabelStyle={{color: white}}
          style={{width: '85%'}}
          onChange={props.handleDamageLogPathChange}
          value={props.userID}
          floatingLabelText={"User ID"}
        />

      </div>

      <div style={{display: 'flex', width: '100%', flexShrink: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FlatButton secondary={true} disabled={true} onTouchTap={()=> {console.log('Connecting To API')}} label={"Connect"}/>
      </div>

      <div style={{flexGrow: 1}}></div>

    </Drawer>
  );
};

export default EventsDrawer;
