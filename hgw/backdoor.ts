import { NS } from '@ns';
import * as c from './consts.js';

export async function main(ns: NS) {
  let path: string[] = [];
  while (true) {
    for (const server of c.backdoors) {
      if (ns.serverExists(server)) {
        let serv = ns.getServer(server);
        if (!serv.backdoorInstalled) {
          if (!serv.hasAdminRights && await ns.peek(c.portsHas) === 5) {
            await ns.brutessh(serv.hostname);
            await ns.ftpcrack(serv.hostname);
            await ns.relaysmtp(serv.hostname);
            await ns.httpworm(serv.hostname);
            await ns.sqlinject(serv.hostname);
            await ns.nuke(serv.hostname);
          }
          else if (serv.hasAdminRights && ns.getHackingLevel() > serv.requiredHackingSkill!) {
            if (serv.hostname === c.backdoors[4]) {
              ns.tprint(`the w0r1d_d43m0n is ready for breaking`);
              return;
            }
            let i = 0;
            path[i] = serv.hostname;
            do {
              i++;
              path[i] = ns.scan(path[i - 1])[0];
              await ns.sleep(1)
            } while (path[i] != 'home');
            for (let y = path.length - 1; y >= 0; y--) {
              ns.singularity.connect(path[y]);
            }
            await ns.singularity.installBackdoor();
          }
        }
      }
    }
    await ns.sleep(1000);
  }
}