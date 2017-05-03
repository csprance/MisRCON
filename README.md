<a href="https://github.com/csprance/MisRCON/blob/master/resources/icon.png" ><img src="https://github.com/csprance/MisRCON/blob/master/resources/icon.png?raw=true" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a><br/>
# MisRCON
> RCON utility for Miscreated

## Download
<a href="https://github.com/csprance/MisRCON/releases/download/0.2.0/MisRCON.Setup.0.2.0.exe" >Download the latest version here</a>

Default installation directory is Users/username/ApplicationData/Local/Programs/MisRCON



## Screenshots
<a href="http://www.csprance.com/shots/2016-12-07_21-55-548aad9111-c619-4d9f-bd07-b20f4c69f248.png"><img src="http://www.csprance.com/shots/2016-12-07_21-55-548aad9111-c619-4d9f-bd07-b20f4c69f248.png" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>
<a href="http://www.csprance.com/shots/2016-12-07_21-56-479a7d6332-17b6-4ce7-b7d7-56f2d2dc9ee0.png"><img src="http://www.csprance.com/shots/2016-12-07_21-56-479a7d6332-17b6-4ce7-b7d7-56f2d2dc9ee0.png" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>
<a href="http://www.csprance.com/shots/2016-12-07_21-57-27c1506c2f-9f46-411d-b6d2-a2d41c6029d3.png"><img src="http://www.csprance.com/shots/2016-12-07_21-57-27c1506c2f-9f46-411d-b6d2-a2d41c6029d3.png" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>
<a href="http://www.csprance.com/shots/2016-12-07_21-57-50a53967dd-f056-4ef0-a54e-78911b75a496.png"><img src="http://www.csprance.com/shots/2016-12-07_21-57-50a53967dd-f056-4ef0-a54e-78911b75a496.png" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>
<a href="http://www.csprance.com/shots/2016-12-07_21-59-10a0066b2c-2e0f-4f4f-a5c3-0315af279b85.png"><img src="http://www.csprance.com/shots/2016-12-07_21-59-10a0066b2c-2e0f-4f4f-a5c3-0315af279b85.png" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

## Previous Versions
* <a href="https://github.com/csprance/MisRCON/releases/download/v0.0.3-macadocious/MisRCON.Setup.0.0.3.exe" >MisRCON.Setup.0.0.3.exe</a>
* <a href="https://github.com/csprance/MisRCON/releases/download/v0.0.21-macadocious/MisRCON.Setup.0.0.21.exe" >MisRCON.Setup.0.0.21.exe</a>
* <a href="https://github.com/csprance/MisRCON/releases/download/v0.0.2-macadocious/MisRCON.Setup.0.0.2.exe" >MisRCON.Setup.0.0.2.exe</a>
* <a href="https://github.com/csprance/MisRCON/releases/download/v0.0.1-babycakes/MisRCON.Setup.0.0.1.exe" >MisRCON.Setup.0.0.1.exe</a>
 
## Developer Install
* **Note: You must add in your own secrets.js file with a steam API key in app/secrets.js** 
```js
export const apiKey = 'APIKEY';
export const chatLogPath = 'C:\\Downloads\\chatlog_2016-12-13.txt';
export const damageLogPath = 'C:\\Downloads\\damagelog_2016-11-25.txt';
```
* **Note: requires a node version >= 6 and an npm version >= 3.**
* **If you have installation or compilation issues with this project, please see [our debugging guide](https://github.com/chentsulin/electron-react-boilerplate/issues/400)**

First, clone the repo via git:

```bash
git clone https://github.com/csprance/MisRCON
```

And then install dependencies.
**ProTip**: Install with [yarn](https://github.com/yarnpkg/yarn) for faster and safer installation

```bash
$ cd MisRCON && npm install
```

## Developer Run

To start development run the command
```bash
$ npm run dev
```

## Editor Configuration
**Atom**
```bash
apm install editorconfig es6-javascript autocomplete-flow javascript-snippets linter linter-eslint language-babel
```

**Sublime**
* https://github.com/sindresorhus/editorconfig-sublime#readme
* https://github.com/SublimeLinter/SublimeLinter3
* https://github.com/roadhump/SublimeLinter-eslint
* https://github.com/babel/babel-sublime

**Others**
* [Editorconfig](http://editorconfig.org/#download)
* [ESLint](http://eslint.org/docs/user-guide/integrations#editors)
* Babel Syntax Plugin

## DevTools

#### Toggle Chrome DevTools

- OS X: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

*See [electron-debug](https://github.com/sindresorhus/electron-debug) for more information.*

#### DevTools extension

This boilerplate is included following DevTools extensions:

* [Devtron](https://github.com/electron/devtron) - Install via [electron-debug](https://github.com/sindresorhus/electron-debug).
* [React Developer Tools](https://github.com/facebook/react-devtools) - Install via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).
* [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) - Install via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).

You can find the tabs on Chrome DevTools.

If you want to update extensions version, please set `UPGRADE_EXTENSIONS` env, just run:

```bash
$ UPGRADE_EXTENSIONS=1 npm run dev

# For Windows
$ set UPGRADE_EXTENSIONS=1 && npm run dev
```



## CSS Modules

This boilerplate out of the box is configured to use [css-modules](https://github.com/css-modules/css-modules).

All `.css` file extensions will use css-modules unless it has `.global.css`.

If you need global styles, stylesheets with `.global.css` will not go through the
css-modules loader. e.g. `app.global.css`

If you want to import global css libraries (like `bootstrap`), you can just write the following code in `.global.css`:

```css
@import "~bootstrap/dist/css/bootstrap.css";
```


## Packaging

To package apps for the local platform:

```bash
$ npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build) for dependencies.

Then,
```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

## Further commands

To run the application without packaging run

```bash
$ npm run build
$ npm start
```

To run End-to-End Test

```bash
$ npm run build
$ npm run test-e2e
```

#### Options

See [electron-builder CLI Usage](https://github.com/electron-userland/electron-builder#cli-usage)

#### Module Structure

This boilerplate uses a [two package.json structure](https://github.com/electron-userland/electron-builder#two-packagejson-structure).

1. If the module is native to a platform or otherwise should be included with the published package (i.e. bcrypt, openbci), it should be listed under `dependencies` in `./app/package.json`.
2. If a module is `import`ed by another module, include it in `dependencies` in `./package.json`.   See [this ESLint rule](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md).
3. Otherwise, modules used for building, testing and debugging should be included in `devDependencies` in `./package.json`.


## Maintainers

- [Chris Sprance](https://github.com/csprance)



## License
MIT 

## Credits
This application is forked from the electron-react-boilerplate
