import { NS } from '@ns';
import * as c from './consts.js';

export async function main(ns: NS) {
  let data = await ns.peek(c.servList);
  while (data != "NULL PORT DATA") {
    let max: c.max = {
      name: "",
      max: 0,
      server: undefined
    };
    data = await ns.peek(c.servList);
    for (let i = 0; i < data.length; i++) {
      let serv = data[i]
      if (await ns.hasRootAccess(serv)) {
        max = await check(ns, max, serv);
      }
      else {
        if (await portOpen(ns, serv, await ns.peek(c.portsHas))) {
          max = await check(ns, max, serv);
        }
        else {
          await ns.run(c.filePath(c.buyFile));
          await ns.sleep(100);
          if (await portOpen(ns, serv, await ns.peek(c.portsHas))) {
            max = await check(ns, max, serv);
          }
        }
      }
    }
    if (!await c.compare(await ns.peek(c.bestServ), max)) {
      await ns.writePort(c.bestServ, max);
    }
    await ns.print(max.name);
    await ns.sleep(100);
  }
  ns.tprint("servList port Empty")
  ns.toast("servList port Empty", 'error', 10000)
}

async function portOpen(ns: NS, serv: string, ports: number | string) {
  if (typeof ports != 'string') {
    if (ns.getServerNumPortsRequired(serv) <= ports) {
      if (ns.fileExists("BruteSSH.exe"))7
        await ns.brutessh(serv);
      if (ns.fileExists("FTPCrack.exe"))
        await ns.ftpcrack(serv);
      if (ns.fileExists("relaySMTP.exe"))
        await ns.relaysmtp(serv);
      if (ns.fileExists("HTTPWorm.exe"))
        await ns.httpworm(serv);
      if (ns.fileExists("SQLInject.exe"))
        await ns.sqlinject(serv);
      await ns.nuke(serv);
      return true;
    }
  }
  return false;
}

async function check(ns: NS, max: c.max, serv: string) {
  let hacking = ns.getHackingLevel()
  let required = ns.getServerRequiredHackingLevel(serv)
  if (required <= hacking) {
    let potential = await ns.getServer(serv).moneyMax;
    if (typeof potential === 'number') {
      if (potential > max.max) {
        max.name = serv;
        max.max = potential;
        max.server = await ns.getServer(serv);
      }
    }
  }

  return max;
}