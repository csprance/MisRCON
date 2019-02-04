![MisRCON](https://github.com/csprance/MisRCON/blob/v3/src/resources/images/icon.png?raw=true)

# MisRCON

> RCON utility for Miscreated a Sandbox Survival Game on CRYENGINE

## Download

<a href="https://github.com/csprance/MisRCON/releases/latest">Download the latest version here</a>

# Features

- Schedule recurring or specific tasks to occur
  - Tasks can be an RCON command or javascript code
- Send RCON commands
- Whitelist/De-Whitelist Players
- Ban/Kick Players
- Keep notes and stats on players
- View Game map and add custom markers/areas

## Install

Grab the latest version from the repository and install it.
Depending on the system it will install into a different default installation directory

| Operating System | Default Install Directory                             |
| ---------------- | ----------------------------------------------------- |
| Windows          | Users/username/ApplicationData/Local/Programs/MisRCON |
| Linux            | /usr/local/bin/MisRCON                                |
| Mac              | ?                                                     |

## Tasks

Tasks are just some javascript that runs and has access to dispatch, getState, and the task all passed into it

```typescript
const func = (dispatch: Dispatch, getState: GetStateFunc) => {
  // Do any initialization here
  console.log('Initializing');
  const date = Date.now();
  return () => {
    // Anything that should run each task
    console.log('task 1');
  };
};
```

## Developer Install

- Clone the repository and cd into `https://github.com/csprance/misrcon.git && cd misrcon`
- Install dependencies `yarn`
- Add in a `src/constants/secrets.ts`
  - To that file add your steam API key `export const steamAPIKey = 'STEAM-API-KEY';`
- To start developing run `yarn run dev`
- To get the build ready for release run `yarn run make` - This will take a while
