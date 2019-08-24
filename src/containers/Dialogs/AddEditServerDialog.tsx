import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { remote } from 'electron';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import AvatarPicker from '../../components/AvatarPicker';
import NoHoverIconButton from '../../components/NoHoverIconButton';
import { closeAllDialogs } from '../../redux/app/actions';
import {
  addServerDialogShowingSelector,
  updateServerDialogShowingSelector
} from '../../redux/app/selectors';
import { Server } from '../../redux/servers';
import {
  addServerThunk,
  initServerThunk,
  testConnectionThunk,
  updateServerThunk
} from '../../redux/servers/actions';
import {
  activeServerSelector,
  noServersSelector
} from '../../redux/servers/selectors';
import { defaultServer } from '../../redux/servers/state';
import { ServerYupSchema } from '../../redux/servers/utils';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const InnerWrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  width: 400px;
  align-items: center;
  justify-content: flex-start;
`;
const CenterSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  width: 100%;
`;
interface ServerAndForm extends Server {
  init: boolean;
}
interface Props {
  variant: 'edit' | 'add';
}
const AddEditServerDialog: React.FunctionComponent<Props> = ({ variant }) => {
  const initialValues =
    variant === 'add'
      ? {
          ...defaultServer,
          avatar: 'https://api.adorable.io/avatars/285/' + Date.now(),
          port: 64094,
          id: Date.now(),
          init: false
        }
      : (useSelector(activeServerSelector) as ServerAndForm);
  const noServers = useSelector(noServersSelector);
  const showing =
    variant === 'add'
      ? useSelector(addServerDialogShowingSelector)
      : useSelector(updateServerDialogShowingSelector);
  const dispatch = useDispatch();
  const addServer = (server: Server) => dispatch(addServerThunk(server));
  const updateServer = (server: Server) => dispatch(updateServerThunk(server));
  const addOrUpdateServer = variant === 'add' ? addServer : updateServer;
  const closeDialog = () => dispatch(closeAllDialogs());
  const testConnection = async (server: Server) =>
    dispatch(testConnectionThunk(server));

  const handleDialogClose = () => {
    if (!noServers) {
      closeDialog();
    }
  };

  const [testConnectionPassed, setIsValid] = React.useState(false);

  return (
    <Dialog fullWidth onClose={handleDialogClose} open={showing}>
      <Wrapper>
        <Formik
          initialValues={
            variant === 'edit'
              ? { ...initialValues, init: false }
              : initialValues
          }
          validationSchema={ServerYupSchema}
          onSubmit={values => {
            const { init, ...serverFormValues } = values;
            closeDialog();
            if (init) {
              dispatch(initServerThunk(serverFormValues.rootPath));
            }
            addOrUpdateServer({
              ...serverFormValues
            });
          }}
        >
          {({
            values,
            errors,
            handleChange,
            setFieldValue,
            isValid
            /* and other goodies */
          }) => (
            <Form>
              <InnerWrapper>
                <AvatarPicker
                  avatar={values.avatar}
                  setAvatar={(avatar: string) =>
                    setFieldValue('avatar', avatar)
                  }
                />
                <Typography variant={'h4'}>
                  {variant === 'add' ? 'Add' : 'Edit'} Server
                </Typography>
                <CenterSection>
                  <TextField
                    inputProps={{
                      maxLength: 15
                    }}
                    error={!!errors.name}
                    value={values.name}
                    onChange={handleChange}
                    fullWidth
                    name={'name'}
                    label={'The name of the server (15 Characters)'}
                  />
                  <TextField
                    error={!!errors.ip}
                    value={values.ip}
                    onChange={handleChange}
                    fullWidth
                    name={'ip'}
                    label={'The Server IP Address'}
                  />
                  <TextField
                    error={!!errors.port}
                    value={values.port}
                    onChange={handleChange}
                    fullWidth
                    name={'port'}
                    label={'The RCON Port of the server. (Default: 64094)'}
                  />
                  <TextField
                    error={!!errors.password}
                    value={values.password}
                    onChange={handleChange}
                    fullWidth
                    name={'password'}
                    type={'password'}
                    label={'The HTTP Password defined in Hosting.cfg'}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={'selfHosted'}
                        checked={values.selfHosted}
                        onChange={() => {
                          setFieldValue('selfHosted', !values.selfHosted);
                        }}
                        color="secondary"
                      />
                    }
                    label="Self Hosted Server?"
                  />
                  {values.selfHosted && (
                    <>
                      {variant !== 'edit' ? (
                        <Tooltip
                          title={
                            'Initialize a server using Spafbis Server Script? All Values will become defaults.'
                          }
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={'Initialize'}
                                checked={values.init}
                                onChange={() => {
                                  setFieldValue('init', !values.init);
                                }}
                                color="secondary"
                              />
                            }
                            label="Initialize Server?"
                          />
                        </Tooltip>
                      ) : (
                        ''
                      )}

                      <TextField
                        label="Server Root"
                        name={'rootPath'}
                        value={values.rootPath}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <NoHoverIconButton
                                onClick={() => {
                                  const rootPath = remote.dialog.showOpenDialog(
                                    {
                                      properties: ['openDirectory']
                                    }
                                  );
                                  if (rootPath) {
                                    setFieldValue('rootPath', rootPath[0]);
                                  }
                                }}
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                    </>
                  )}
                </CenterSection>
                <Button
                  style={{
                    marginTop: 25,
                    backgroundColor: testConnectionPassed
                      ? '#007640'
                      : '#832f2b'
                  }}
                  onClick={async () => {
                    const valid = (await testConnection({
                      ...values,
                      id: Number(values.id),
                      port: Number(values.port)
                    })) as any;
                    setIsValid(valid);
                  }}
                  variant={'contained'}
                  color={'secondary'}
                  fullWidth
                >
                  Test Connection
                </Button>
                <Button
                  disabled={!isValid}
                  component={'button'}
                  style={{ marginTop: 25 }}
                  type={'submit'}
                  variant={'contained'}
                  color={'primary'}
                  fullWidth
                >
                  {variant === 'add' ? 'Add' : 'Update'} Server
                </Button>
              </InnerWrapper>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Dialog>
  );
};

export default AddEditServerDialog;
