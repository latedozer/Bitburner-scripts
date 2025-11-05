import { NS } from '@ns';
import * as c from './consts.js';

const delay = c.batchDelay + 10;
const hacks = 1;
const grows = 10;
const weaks = 3;
const hackTh = 1;
const growTh = 2;
const weakTh = 3;
const hackPath = c.filePath(c.hackFile);
const growPath = c.filePath(c.growFile);
const weakPath = c.filePath(c.weakFile);
const constPath = c.filePath(c.constFile);
export async function main(ns: NS) {

  while (true) {
    if(ns.fileExists("Formulas.exe")){
      ns.run(c.filePath(c.loopFile), 1, true);
      return;
    }
    // 1:10:2 hack:grow:weaken
    let ramCost = (hacks * 1.7) + (grows * 1.75 * 2) + (weaks * 1.75 * 3);
    let hostServ: c.max = await ns.peek(c.hostServ);
    let bestServ: c.max = await ns.peek(c.bestServ);
    if (ns.getServerMaxRam(hostServ.name) - (ns.getServerUsedRam(hostServ.name)) > ramCost * 10) {
      if (!ns.fileExists(constPath, hostServ.name) || !ns.fileExists(weakPath, hostServ.name) || !ns.fileExists((growPath), hostServ.name) || !ns.fileExists(hackPath, hostServ.name)) {
        ns.scp([constPath, hackPath, growPath, weakPath], hostServ.name, "home");
      }
      for (let i = 0; i < 10; i++) {
        ns.exec(hackPath, hostServ.name, hackTh, bestServ.name);
        await ns.sleep(delay);
        for (let y = 0; y < grows; y++) {
          ns.exec(growPath, hostServ.name, growTh, bestServ.name);
          await ns.sleep(delay);
        }
        for (let y = 0; y < weaks; y++) {
          ns.exec(weakPath, hostServ.name, weakTh, bestServ.name);
          await ns.sleep(delay);
        }
      }
    }
    let server = ns.getServer(bestServ.name);
    ns.print(server.moneyMax!/server.moneyAvailable!);
    ns.print(server.hackDifficulty + "/" + server.minDifficulty)
    await ns.sleep(800)
  }

}