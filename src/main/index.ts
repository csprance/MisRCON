import * as Splashscreen from '@trodi/electron-splashscreen';
import { app } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from 'electron-devtools-installer';
import * as path from 'path';
import { format as formatUrl } from 'url';

// tslint:disable-next-line:no-var-requires
if (require('electron-squirrel-startup')) {
  // Handle creating/removing shortcuts on Windows when installing/uninstalling.
  app.quit();
}

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;

const createMainWindow = () => {
  const windowOptions: Electron.BrowserWindowConstructorOptions = {
    backgroundColor: '#131313',
    frame: false,
    height: 768,
    minHeight: 500,
    minWidth: 1024,
    show: true,
    webPreferences: {
      nodeIntegration: true
    },
    width: 1024
  };
  // configure the splashscreen
  const window = Splashscreen.initSplashScreen({
    splashScreenOpts: {
      height: 400,
      transparent: true,
      width: 400
    },
    templateUrl: path.join('/static', 'images', 'icon.png'),
    windowOpts: windowOptions
  });

  // Open the DevTools.
  if (isDevelopment) {
    installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS]).catch(e =>
      console.log(e)
    );
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
      })
    );
  }

  window.on('closed', () => {
    mainWindow = null;
  });

  return window;
};

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow();
});
