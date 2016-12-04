import React from 'react';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

const TaskCard = (props) => {
  return (
    <TaskCardContainer zDepth={1} >
      <Name>
        {props.taskName}
      </Name>
      <TaskTime>
        {props.taskTime.toTimeString()}
      </TaskTime>
      <TaskCommand>
        {props.taskCommand}
      </TaskCommand>
      <Spacer />
      <TaskActions>
        <IconButton onTouchTap={props.deleteTask.bind(null, props.taskName, props.taskTime, props.taskCommand)}>
          <DeleteIcon />
        </IconButton>
      </TaskActions>
    </TaskCardContainer>
  );
};

TaskCard.propTypes = {
  deleteTask: React.PropTypes.func.isRequired,
  taskName: React.PropTypes.string.isRequired,
  taskTime : React.PropTypes.object.isRequired,
  taskCommand: React.PropTypes.string.isRequired,
};
export default TaskCard;


//////////////////
// styles
//////////////////
const TaskCardContainer = styled(Paper)`
  width: 350px;
  min-height: 200px;
  margin-top:15px;
  display: flex;
  flex-direction:column;
  padding: 5px;
  content-sizing:border-box;
`;
const Name = styled.div`
  
`;
const TaskTime = styled.div`
  
`;
const TaskCommand = styled.div`
  
`;
const Spacer = styled.div`
  flex-grow: 1;
`;
const TaskActions = styled.div`
  display: flex;
  justify-content:flex-end;
  align-items: center;
`;


