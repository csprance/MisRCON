import * as Splashscreen from '@trodi/electron-splashscreen';
import { app } from 'electron';
import { enableLiveReload } from 'electron-compile';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from 'electron-devtools-installer';
import * as isDev from 'electron-is-dev';
import * as path from 'path';
import logger from './lib/logger';
import { darkDarkBlack } from './styles/colors';

// tslint:disable-next-line:no-var-requires
if (require('electron-squirrel-startup')) {
  // Handle creating/removing shortcuts on Windows when installing/uninstalling.
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;

if (isDev) {
  enableLiveReload({ strategy: 'react-hmr' });
}

const createWindow = async () => {
  logger.info('MisRCON Starting');

  // ! This is here to deal with Server Avatars not showing up in production
  const { addBypassChecker } = require('electron-compile');
  addBypassChecker(
    (filePath: string) =>
      /.jpg/.test(filePath) || /.mp4/.test(filePath) || /.png/.test(filePath)
  );

  const windowOptions: Electron.BrowserWindowConstructorOptions = {
    backgroundColor: darkDarkBlack,
    frame: false,
    height: 768,
    icon: path.join(__dirname, 'resources/images/64x64.png'),
    minHeight: 500,
    minWidth: 1024,
    show: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    },
    width: 1024
  };
  // configure the splashscreen
  mainWindow = Splashscreen.initSplashScreen({
    splashScreenOpts: {
      height: 400,
      transparent: true,
      width: 400
    },
    templateUrl: path.join(__dirname, 'resources', 'images', 'icon.png'),
    windowOpts: windowOptions
  });

  // Open the DevTools.
  if (isDev) {
    await installExtension(REDUX_DEVTOOLS);
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  // and load the index.html of the appState.
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
  // On OS X it's common to re-create a window in the appState when the
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
