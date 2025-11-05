import { NS, Server } from '@ns';
import * as c from './consts.js';

const delay = 50;
const hackPath = c.filePath(c.hackFile);
const growPath = c.filePath(c.growFile);
const weakPath = c.filePath(c.weakFile);
const constPath = c.filePath(c.constFile);

export async function main(ns: NS) {
    let count = 0;
    let FH = ns.formulas.hacking;
    let hackThread = 1;
    let GroThread = 1;
    let weakThread1 = 1;
    let weakThread2 = 1;
    while(true){
    let dest = ns.peek(c.bestServ).server as Server;
    let host = ns.peek(c.hostServ).name;
    //if(FH.hackPercent(dest, ns.getPlayer()) > FH.growPercent(dest, GroThread, ns.getPlayer())){
    //    GroThread++;
    //}
    let ramCost = (hackThread * 1.7) + (GroThread * 1.75) + (weakThread1 * 1.75) + (weakThread2 * 1.75);
    if ((ns.getServer(host).maxRam - ns.getServer(host).ramUsed) > ramCost) {
        let player = ns.getPlayer();
        let weakTime = FH.weakenTime(dest, player);
        let hackT = FH.hackTime(dest, player);
        let growT = FH.growTime(dest, player)
        //ns.scp([constPath, hackPath, growPath, weakPath], host, "home");
        ns.exec(hackPath, host, hackThread, dest.hostname, weakTime - hackT);
        ns.exec(weakPath, host, weakThread1, dest.hostname, 0);
        ns.exec(growPath, host, GroThread, dest.hostname, weakTime - growT);
        ns.exec(weakPath, host, weakThread2, dest.hostname, 0);
    }
    count++;
    await ns.sleep(delay);
    if (count > 60000/delay) {
        checkServer(ns, dest);
        count = 0;
    }

    }
}

async function checkServer(ns: NS, dest: Server) {
    let upDest = ns.getServer(dest.hostname);
    if((upDest.hackDifficulty as number) - (upDest.minDifficulty as number) > 0.01){
        ns.toast("unable to weaken fast enough");
    }
    if(upDest.moneyAvailable!/upDest.moneyMax! > 1.01){
        ns.toast("unable to grow fast enough");
    }
    ns.toast("batching checked")
}


/*ns.exec(hack, extendHack);
ns.exec(weaken);
ns.exec(grow, extendGrow);
ns.exec(weaken);*/