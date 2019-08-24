import axios from 'axios';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import * as path from 'path';

const SCRIPT_URL =
  'https://raw.githubusercontent.com/Spafbi/simplified-miscreated-server-setup/master/start_server.cmd';

// Run the Script
export const runSetupScript = async (rootPath: string) => {
  const scriptPath = await downloadLatestScript(rootPath);
  return openCmdExecScript(scriptPath);
};

// Download latest version of script to root path
export const downloadLatestScript = async (
  rootPath: string
): Promise<string> => {
  // Download and copy the script to the rootPath
  const { data } = await axios.get(SCRIPT_URL);
  // Write script to rootPath
  const scriptPath = path.join(rootPath, 'start_server.cmd');
  await fs.writeFile(scriptPath, data, 'utf8');
  return scriptPath;
};

// Run The script
export const openCmdExecScript = async (
  scriptPath: string
): Promise<boolean> => {
  await exec(
    `start cmd.exe /K ${scriptPath}`,
    (error: any, stdout: any, stderr: any) => {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
    }
  );
  return true;
};
