import { NS } from '@ns';
import * as c from './consts.js';
export async function main(ns: NS) {
  let servers;
  let newServs: string[];

  while (true) {
    servers = ["home"];
    newServs = ns.scan('home');
    servers = scan_1(ns, newServs, servers);
    ns.writePort(c.servList, servers);
    ns.print(servers);

    await ns.sleep(2500);
  }

}

function scan_1(ns: NS, newServs: string[], servers1: string[], passed = false) {
  let servers = servers1;
  ns.print("Scan_1: started " + newServs.length);
  let seperate = [];
  let y = 0
  let i = 1;
  if (passed === false) {
    i = 0;
  }
  for (i; i < newServs.length; i++) {
    y = servers.length;
    //ns.print(y);
    servers[y] = newServs[i];
    seperate = scan_1(ns, ns.scan(newServs[i]), servers, true);
    servers1 = seperate;
    //await ns.sleep(3);
  }
  return servers;
}