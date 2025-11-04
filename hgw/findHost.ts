import { NS } from '@ns';
import * as c from './consts.js';
export async function main(ns: NS) {
  let data = ["NULL DATA"];
  let max: c.max = {
    name: "null",
    max: 0,
    server: undefined
  };
  while (true) {
    let data = await ns.peek(c.servList);
      for (let i = 0; i < data.length; i++) {
        let hold = await ns.getServerMaxRam(data[i])
        let check = "";
        for (let y = 0; y < 4; y++) {
          check += data[i][y]
        }
        if (check != "hack" && check != "home")
          if (max.max < hold && await ns.hasRootAccess(data[i])) {
            max.name = data[i];
            max.max = hold;
            max.server = ns.getServer(data[i]);
          }
      }
    await ns.writePort(c.hostServ, max);
    await ns.print(max.name);
    await ns.sleep(100);
  }
}