![MisRCON](https://github.com/csprance/MisRCON/blob/v3/src/resources/images/icon.png?raw=true)

# MisRCON

> RCON utility for Miscreated a Sandbox Survival Game on CRYENGINE

## Download

<a href="https://github.com/csprance/MisRCON/releases/latest">Download the latest version here</a>

# Features

* Schedule recurring or specific tasks to occur
  * Tasks can be an RCON command or javascript code
* Send RCON commands
* Whitelist/De-Whitelist Players
* Ban/Kick Players
* Keep notes and stats on players
* View Game map and add custom markers/areas

# Screenshots

<a href="https://csprance.com/shots/2019-08-24_2c4afa8e-14d2-431a-8b4f-98780945e61c.png"><img src="https://csprance.com/shots/2019-08-24_2c4afa8e-14d2-431a-8b4f-98780945e61c.png" width="400"/></a>
<a href="https://csprance.com/shots/2019-08-24_9b27e000-3809-4715-918c-5d5d5c361325.png"><img src="https://csprance.com/shots/2019-08-24_9b27e000-3809-4715-918c-5d5d5c361325.png" width="400"/></a>
<a href="https://csprance.com/shots/2019-08-24_a1f672d8-fa0a-4400-be99-4da13e0ff3ab.png"><img src="https://csprance.com/shots/2019-08-24_a1f672d8-fa0a-4400-be99-4da13e0ff3ab.png" width="400"/></a>
<a href="https://csprance.com/shots/2019-08-24_5e029cb1-fa04-4139-b1f0-72bd7b5a6686.png"><img src="https://csprance.com/shots/2019-08-24_5e029cb1-fa04-4139-b1f0-72bd7b5a6686.png" width="400"/></a>
<a href="https://csprance.com/shots/2019-08-24_e54fbf50-baad-4f1a-8bac-93f3724a6b4f.png"><img src="https://csprance.com/shots/2019-08-24_e54fbf50-baad-4f1a-8bac-93f3724a6b4f.png" width="400"/></a>
<a href="https://csprance.com/shots/2019-08-24_a9ce6766-601c-4504-8ade-c8febcd6219f.png"><img src="https://csprance.com/shots/2019-08-24_a9ce6766-601c-4504-8ade-c8febcd6219f.png" width="400"/></a>
<a href="https://csprance.com/shots/2019-08-24_4d20db03-d837-48c0-9ea3-4c5f2ba5b294.png"><img src="https://csprance.com/shots/2019-08-24_4d20db03-d837-48c0-9ea3-4c5f2ba5b294.png" width="400"/></a>
<a href="https://csprance.com/shots/2019-08-24_ef53623a-d8f0-43be-ad8a-355eab1b3bad.png"><img src="https://csprance.com/shots/2019-08-24_ef53623a-d8f0-43be-ad8a-355eab1b3bad.png" width="400"/></a>
<a href="https://csprance.com/shots/2019-08-24_9bedf043-f790-4d60-9cd7-a4a9fadf0c5b.png"><img src="https://csprance.com/shots/2019-08-24_9bedf043-f790-4d60-9cd7-a4a9fadf0c5b.png" width="400"/></a>

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

* Clone the repository and cd into `https://github.com/csprance/misrcon.git && cd misrcon`
* Install dependencies `yarn`
* To start developing run `yarn run dev`
* To get the build ready for release run `yarn run make` - This will take a while
