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
import { darkDarkBlack } from './styles/colors';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload({ strategy: 'react-hmr' });
}

const createWindow = async () => {
  logger.info('MisRCON Starting');

  const windowOptions: Electron.BrowserWindowConstructorOptions = {
    width: 1024,
    height: 768,
    minHeight: 642,
    minWidth: 444,
    backgroundColor: darkDarkBlack,
    show: false,
    icon: path.join(__dirname, 'resources/images/64x64.png'),
    frame: false
  };
  // configure the splashscreen
  mainWindow = Splashscreen.initSplashScreen({
    windowOpts: windowOptions,
    templateUrl: path.join(__dirname, 'resources', 'images', 'icon.png'),
    splashScreenOpts: {
      width: 400,
      height: 400,
      transparent: true
    }
  });

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REDUX_DEVTOOLS);
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
    logger.info('closed');
    app.quit();
  });

  mainWindow.on('unresponsive', () => {
    mainWindow = null;
    logger.info('unresponsive');
    app.quit();
  });

  mainWindow.webContents.on('crashed', () => {
    mainWindow = null;
    logger.info('crashed');
    app.quit();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  mainWindow = null;
  logger.info('window-all-closed');
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
  logger.info('uncaughtException', err);
  app.quit();
});

process.on('unhandledRejection', err => {
  logger.info('unhandledRejection', err);
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
