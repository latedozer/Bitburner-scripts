import { NS } from '@ns';
import * as c from './consts.js';
const folder = "/hgw/";
const FB = c.filePath(c.startScripts[1]);
const SA = c.filePath(c.startScripts[2]);
const FH = c.filePath(c.startScripts[3]);
const BR = c.filePath(c.startScripts[4]);
const LP = c.filePath(c.startScripts[5]);
export async function main(ns: NS) {
  if (ns.args[0] === 1) {
    for (let i = 1; i < c.maxPort; i++) {
      await ns.clearPort(i);
    }
    await ns.killall('home', true);
  }

  let data;
  if (!ns.scriptRunning(SA, "home")) {
    await ns.run(SA);
    do {
      data = ns.peek(c.servList);
      await ns.sleep(100);
      ns.print(SA)
    } while (data === "NULL PORT DATA");
  }
  if (!ns.scriptRunning(FH, "home")) {
    await ns.run(FH);
    do {
      data = ns.peek(c.hostServ);
      await ns.sleep(100);
      ns.print(FH)
    } while (data === "NULL PORT DATA");
  }

  if (!ns.scriptRunning(FB, "home")) {
    await ns.run(FB);
    do {
      data = ns.peek(c.bestServ);
      await ns.sleep(100);
      ns.print(FB)
    } while (data === "NULL PORT DATA");
  }

  if (!ns.scriptRunning(LP, "home") && ns.fileExists('Formulas.exe')) {
    await ns.run(LP);
  }
  else{
    ns.run(c.filePath(c.buyFile));
    ns.run(c.filePath(c.bruteFile));
  }


}