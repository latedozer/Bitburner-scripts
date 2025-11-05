import { NS, Server } from '@ns';
export const maxPort = 4;
export const servList = 1;
export const bestServ = 2;
export const hostServ = 3;
export const portsHas = 4;
export const subFolder = "/hgw/";
export const startScripts = ["consts.js", "findBest.js", "scanAll.js", "findHost.js", "buy.js", "brute.js", "loop.js"];
export const hackFile = "hack.js";
export const growFile = "grow.js";
export const weakFile = "weak.js";
export const buyFile = "buy.js";
export const loopFile = "loop.js";
export const constFile = "consts.js";
export const portNull = "NULL PORT DATA";
export const ports = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"];
export const backdoors = ["CSEC", "avmnite-02h", "I.I.I.I", "run4theh111z", "w0r1d_d43m0n"];
export type max = {
  name: string;
  max: number;
  server: Server | undefined;
};

export function compare(a: max, b: max): boolean {
  return (a.name === b.name && a.max === b.max && a.server === b.server);
}

export function filePath(file: string){
  return(subFolder + file);
}