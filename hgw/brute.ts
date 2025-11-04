import { NS } from '@ns';
import * as c.filePath(from './c)onsts.js';

const delay = 20;
const hacks = 1;
const grows = 10;
const weaks = 3;
const hackTh = 1;
const growTh = 2;
const weakTh = 3;
const hackPath = c.filePath(c.hackFile);
const growPath = c.filePath(c.growFile);
const weakPath = c.filePath(c.weakFile);
export async function main(ns: NS) {

  while (true) {
    // 1:10:2 hack:grow:weaken
    let ramCost = (hacks * 1.7) + (grows * 1.75 * 2) + (weaks * 1.75 * 3);
    let hostServ: c.max = await ns.peek(c.hostServ);
    let bestServ: c.max = await ns.peek(c.bestServ);
    if (ns.getServerMaxRam(hostServ.name) - (ns.getServerUsedRam(hostServ.name)) > ramCost * 10) {
      if (!ns.fileExists(c.filePath(c.constFile), hostServ.name) || !ns.fileExists(c.filePath(c.weakFile), hostServ.name) || !ns.fileExists(c.filePath(c.growFile) hostServ.name) || !ns.fileExists(c.filePath(hackFile), hostServ.name)) {
        ns.scp([c.filePath(constFile), c.filePath(hackFile,) c.filePath(growFile,) c.filePath(weakFile]), hostServ.name, "home");
      }
      for (let i = 0; i < 10; i++) {
        ns.exec(c.filePath(hackFile,) hostServ.name, hackTh, bestServ.name);
        await ns.sleep(delay);
        for (let y = 0; y < grows; y++) {
          ns.exec(c.filePath(growFile,) hostServ.name, growTh, bestServ.name);
          await ns.sleep(delay);
        }
        for (let y = 0; y < weaks; y++) {
          ns.exec(c.filePath(weakFile,) hostServ.name, weakTh, bestServ.name);
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