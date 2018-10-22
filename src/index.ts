import * as Splashscreen from '@trodi/electron-splashscreen';
import { app } from 'electron';
import { enableLiveReload } from 'electron-compile';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from 'electron-devtools-installer';
import * as path from 'path';
import 'reflect-metadata';
import logger from './lib/logger';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload({ strategy: 'react-hmr' });
}

const createWindow = async () => {
  logger.info('MisRCON Starting');

  const windowOptions = {
    width: 1024,
    height: 768,
    backgroundColor: '#333333',
    show: false,
    icon: path.join(__dirname, 'resources/images/64x64.png')
  };
  // configure the splashscreen
  mainWindow = Splashscreen.initSplashScreen({
    windowOpts: windowOptions,
    templateUrl: path.join(__dirname, 'resources', 'images', 'icon.png'),
    delay: 0, // force show immediately since example will load fast
    minVisible: 1500, // show for 1.5s so example is obvious
    splashScreenOpts: {
      width: 400,
      height: 400,
      transparent: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REDUX_DEVTOOLS);
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });

  mainWindow.on('unresponsive', () => {
    mainWindow = null;
    app.quit();
  });

  mainWindow.webContents.on('crashed', () => {
    mainWindow = null;
    app.quit();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  app.quit();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

process.on('uncaughtException', err => {
  logger.error('uncaughtException', err);
  mainWindow = null;
  app.quit();
});

process.on('unhandledRejection', err => {
  logger.error('unhandledRejection', err);
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
