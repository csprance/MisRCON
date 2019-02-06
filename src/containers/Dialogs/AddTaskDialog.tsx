import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Omit } from '../../@types/global';
import { toggleAddTaskDialog } from '../../redux/app/actions';
import { addTaskDialogShowingSelector } from '../../redux/app/selectors';
import { Dispatch, RootState } from '../../redux/redux-types';
import { activeServerIDSelector } from '../../redux/servers/selectors';
import { addTaskThunk } from '../../redux/tasks/actions';
import { Task } from '../../redux/tasks/types';
import { defaultRCONCommand } from '../../redux/tasks/utils';
import { bg1, bg3 } from '../../styles/colors';

const TabWrapper = styled.div`
  width: 100%;
  background: ${bg3};
`;
const Wrapper = styled.div`
  background: ${bg1};
  display: flex;
  min-height: 350px;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const InnerWrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  width: 100%;
  height: 450px;
  max-height: 600px;
  align-items: center;
  justify-content: flex-start;
`;
const CenterSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;
const defaultState: State = {
  id: 0,
  timeZone: 'America/New_York',
  command: 'status',
  code: defaultRCONCommand.toString(),
  name: 'test',
  active: false,
  cronString: '* * * * * *',
  date: moment().format('YYYY-MM-DDThh:mm:ss'),
  serverId: 0,
  job: null,
  timesRun: 0
};
interface ReduxProps {
  closeDialog: () => void;
  addTask: (task: Task) => void;
  showing: boolean;
  activeServerId: number;
}
type State = Omit<Task, 'onTick' | 'date'> & {
  // Date gets converted to a string for the datetime box
  date: string;
  // If it's an rcon command just use this string
  command: string;
  // If it's a script command use this string which is javascript
  code: string;
};
const AddTaskDialog: React.FunctionComponent<ReduxProps> = ({
  addTask,
  closeDialog,
  showing,
  activeServerId
}) => {
  const [state, setState] = React.useState<State>({ ...defaultState });
  const [navIndex, setNavIndex] = React.useState(1);

  const handleClick = (type: 'recurring' | 'date') => {
    const { command, code, ...restOfState } = state;
    addTask({
      ...restOfState,
      active: false,
      cronString: type === 'recurring' ? state.cronString : null,
      date: type === 'date' ? moment(state.date).toDate() : null,
      onTick: eval(state.code),
      serverId: activeServerId
    });
    setState({
      ...defaultState
    });
    closeDialog();
  };

  const handleChange = (key: string, value: string | boolean | Date) => {
    setState({
      ...state,
      [key]: value
    } as any);
  };

  return (
    <Dialog fullWidth onClose={() => closeDialog()} open={showing}>
      <Wrapper>
        <Typography style={{ padding: 30 }} variant={'h4'}>
          Add Task
        </Typography>
        <TabWrapper>
          <AppBar style={{ backgroundColor: bg1 }} position="static">
            <Tabs
              value={navIndex}
              onChange={(_: any, newValue: number) => {
                setNavIndex(newValue);
              }}
            >
              <Tab label="Recurring" />
              <Tab label="Specific Date" />
            </Tabs>
          </AppBar>
          {navIndex === 1 && (
            <InnerWrapper>
              <CenterSection>
                <TextField
                  value={state.name}
                  onChange={e => handleChange('name', e.target.value)}
                  fullWidth
                  name={'name'}
                  label={'Task Name'}
                />
                <TextField
                  value={state.date}
                  onChange={e => {
                    setState({
                      ...state,
                      date: e.target.value
                    });
                  }}
                  label="Date/Time"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  value={state.command}
                  onChange={e => {
                    handleChange('command', e.target.value);
                  }}
                  fullWidth
                  name={'command'}
                  label={'RCON Command'}
                />
              </CenterSection>
              <Button
                style={{ marginTop: 25 }}
                onClick={_ => handleClick('date')}
                variant={'contained'}
                color={'primary'}
                fullWidth
              >
                Add Task
              </Button>
            </InnerWrapper>
          )}
          {navIndex === 0 && (
            <InnerWrapper>
              <CenterSection>
                <TextField
                  value={state.name}
                  onChange={e => {
                    handleChange('name', e.target.value);
                  }}
                  fullWidth
                  name={'name'}
                  label={'Task Name'}
                />
                <TextField
                  value={String(state.cronString)}
                  onChange={e => {
                    handleChange('cronString', e.target.value);
                  }}
                  fullWidth
                  name={'cronString'}
                  label={'Cron String'}
                />
                <TextField
                  value={state.command}
                  onChange={e => {
                    handleChange('command', e.target.value);
                  }}
                  fullWidth
                  name={'command'}
                  label={'RCON Command'}
                />
              </CenterSection>
              <Button
                style={{ marginTop: 25 }}
                onClick={_ => handleClick('recurring')}
                variant={'contained'}
                color={'primary'}
                fullWidth
              >
                Add Task
              </Button>
            </InnerWrapper>
          )}
        </TabWrapper>
      </Wrapper>
    </Dialog>
  );
};

const mapStateToProps = (state: RootState) => ({
  showing: addTaskDialogShowingSelector(state),
  activeServerId: activeServerIDSelector(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addTask: (task: Task) => dispatch(addTaskThunk(task)),
  closeDialog: () => dispatch(toggleAddTaskDialog())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTaskDialog);
