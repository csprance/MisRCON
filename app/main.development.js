import { app, BrowserWindow, Menu, shell } from 'electron';
import _ from 'lodash';

import { getDamageLogFromFS } from './utils/damageLogUtils';
import { getChatLogFromFS } from './utils/chatLogUtils';

let menu;
let template;
let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) {
      // eslint-disable-line
      try {
        await installer.default(installer[name], forceDownload);
      } catch (e) {} // eslint-disable-line
    }
  }
};
// In main process.
const { ipcMain } = require('electron');

const getEmitters = data => {
  return _.uniqBy(data, e => e.steam);
};

//////////////////////////////////////////
//getDamageLog
//////////////////////////////////////////
ipcMain.on('getDamageLog', (event, arg) => {
  console.log('Fetching Damage Logs', arg);
  getDamageLogFromFS(arg)
    .then(data => {
      event.sender.send('receiveDamageLog', {
        emitters: getEmitters(data),
        allEvents: data
      });
      console.log('finished parsing');
    })
    .catch(err => {
      console.log(err);
      event.sender.send('receiveDamageLog', { failed: true, err: err });
    });
});

//////////////////////////////////////////
//getChatLog
//////////////////////////////////////////
ipcMain.on('getChatLog', (event, arg) => {
  console.log('Fetching Chat Logs', arg);
  getChatLogFromFS(arg)
    .then(data => {
      event.sender.send('receiveChatLog', {
        emitters: getEmitters(data),
        allEvents: data
      });
      console.log('finished parsing');
    })
    .catch(err => {
      console.log(err);
      event.sender.send('receiveChatLog', { failed: true, err: err });
    });
});

app.on('ready', async () => {
  await installExtensions();

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  }

  //TODO: Add in my menu options
  if (process.platform === 'darwin') {
    template = [
      {
        label: 'Electron',
        submenu: [
          {
            label: 'About ElectronReact',
            selector: 'orderFrontStandardAboutPanel:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Services',
            submenu: []
          },
          {
            type: 'separator'
          },
          {
            label: 'Hide ElectronReact',
            accelerator: 'Command+H',
            selector: 'hide:'
          },
          {
            label: 'Hide Others',
            accelerator: 'Command+Shift+H',
            selector: 'hideOtherApplications:'
          },
          {
            label: 'Show All',
            selector: 'unhideAllApplications:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click() {
              app.quit();
            }
          }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          {
            label: 'Undo',
            accelerator: 'Command+Z',
            selector: 'undo:'
          },
          {
            label: 'Redo',
            accelerator: 'Shift+Command+Z',
            selector: 'redo:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Cut',
            accelerator: 'Command+X',
            selector: 'cut:'
          },
          {
            label: 'Copy',
            accelerator: 'Command+C',
            selector: 'copy:'
          },
          {
            label: 'Paste',
            accelerator: 'Command+V',
            selector: 'paste:'
          },
          {
            label: 'Select All',
            accelerator: 'Command+A',
            selector: 'selectAll:'
          }
        ]
      },
      {
        label: 'View',
        submenu:
          process.env.NODE_ENV === 'development'
            ? [
                {
                  label: 'Reload',
                  accelerator: 'Command+R',
                  click() {
                    mainWindow.webContents.reload();
                  }
                },
                {
                  label: 'Toggle Full Screen',
                  accelerator: 'Ctrl+Command+F',
                  click() {
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                  }
                },
                {
                  label: 'Toggle Developer Tools',
                  accelerator: 'Alt+Command+I',
                  click() {
                    mainWindow.toggleDevTools();
                  }
                }
              ]
            : [
                {
                  label: 'Toggle Full Screen',
                  accelerator: 'Ctrl+Command+F',
                  click() {
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                  }
                }
              ]
      },
      {
        label: 'Window',
        submenu: [
          {
            label: 'Minimize',
            accelerator: 'Command+M',
            selector: 'performMiniaturize:'
          },
          {
            label: 'Close',
            accelerator: 'Command+W',
            selector: 'performClose:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
          }
        ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Learn More',
            click() {
              shell.openExternal('http://electron.atom.io');
            }
          },
          {
            label: 'Documentation',
            click() {
              shell.openExternal(
                'https://github.com/atom/electron/tree/master/docs#readme'
              );
            }
          },
          {
            label: 'Community Discussions',
            click() {
              shell.openExternal('https://discuss.atom.io/c/electron');
            }
          },
          {
            label: 'Search Issues',
            click() {
              shell.openExternal('https://github.com/atom/electron/issues');
            }
          }
        ]
      }
    ];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Log Out',
            accelerator: 'Ctrl+L',
            click() {
              mainWindow.webContents.send('clearUserCredentials');
            }
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: 'Alt+Command+I',
            click() {
              mainWindow.toggleDevTools();
            }
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click() {
              mainWindow.close();
            }
          }
        ]
      },
      {
        label: '&View',
        submenu:
          process.env.NODE_ENV === 'development'
            ? [
                {
                  label: '&Reload',
                  accelerator: 'Ctrl+R',
                  click() {
                    mainWindow.webContents.reload();
                  }
                },
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click() {
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                  }
                },
                {
                  label: 'Toggle &Developer Tools',
                  accelerator: 'Alt+Ctrl+I',
                  click() {
                    mainWindow.toggleDevTools();
                  }
                }
              ]
            : [
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click() {
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                  }
                }
              ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Console Commands',
            click() {
              shell.openExternal('https://miscreatedgame.com/forums');
            }
          },
          {
            label: 'Report an issue',
            click() {
              shell.openExternal('https://github.com/csprance/MisRCON/issues');
            }
          },
          {
            label: 'Miscreated Website',
            click() {
              shell.openExternal('https://miscreatedgame.com/');
            }
          },
          {
            label: 'Miscreated Forums',
            click() {
              shell.openExternal('https://miscreatedgame.com/forums');
            }
          }
        ]
      }
    ];
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
});
