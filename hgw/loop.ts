import { NS, Server } from '@ns';
import * as c from './consts.js';

const delay = c.batchDelay;
const hackPath = c.filePath(c.hackFile);
const growPath = c.filePath(c.growFile);
const weakPath = c.filePath(c.weakFile);
const constPath = c.filePath(c.constFile);
const minutes = 5;
export async function main(ns: NS) {
    let count = 0;
    let FH = ns.formulas.hacking;
    let hackThread = 1;
    let GroThread = 1;
    let weakThread1 = 1;
    let weakThread2 = 1;
    let rewriteFiles = ns.args[0] as boolean || false;
    let time1 = performance.now();
    let time2 = 0;
    while (true) {
        let dest = ns.peek(c.bestServ).server as Server;
        let host = ns.peek(c.hostServ).name;
        //if(FH.hackPercent(dest, ns.getPlayer()) > FH.growPercent(dest, GroThread, ns.getPlayer())){
        //    GroThread++;
        //}
        let ramCost = (hackThread * 1.7) + (GroThread * 1.75) + (weakThread1 * 1.75) + (weakThread2 * 1.75);
        if ((ns.getServer(host).maxRam - ns.getServer(host).ramUsed) > ramCost && ns.ps(host).length < c.maxScripts) {
            let player = ns.getPlayer();
            let weakTime = FH.weakenTime(dest, player);
            let hackT = FH.hackTime(dest, player);
            let growT = FH.growTime(dest, player)
            if ((!ns.fileExists(constPath, host) || !ns.fileExists(weakPath, host) || !ns.fileExists((growPath), host) || !ns.fileExists(hackPath, host)) || rewriteFiles) {
                ns.scp([constPath, hackPath, growPath, weakPath], host, "home");
                rewriteFiles = false;
            }
            ns.exec(hackPath, host, hackThread, dest.hostname, weakTime - hackT);
            ns.exec(weakPath, host, weakThread1, dest.hostname, 0);
            ns.exec(growPath, host, GroThread, dest.hostname, weakTime - growT);
            ns.exec(weakPath, host, weakThread2, dest.hostname, 0);
        }
        if (ns.serverExists("host")) {
                if (ns.getServer('host').maxRam !== 2 ** 20) {
                  ns.run(c.filePath(c.buyServerFile))
                }
              }5
              else {
                ns.run(c.filePath(c.buyServerFile))
              }
        time2 = performance.now();
        if(time2 - time1 > delay){
            ns.print(time2 - time1);
             await ns.sleep(delay);
            time1 = performance.now();
            time2 = performance.now();
            count++;
        }
        //await ns.sleep(delay);
        if (count > (60000 * minutes) / (delay)) {
            checkServer(ns, dest);
            count = 0;
        }
    }
}

async function checkServer(ns: NS, dest: Server) {
    let upDest = ns.getServer(dest.hostname);
    if ((upDest.hackDifficulty as number) - (upDest.minDifficulty as number) > 0.01) {
        ns.toast("unable to weaken fast enough");
    }
    if (upDest.moneyAvailable! / upDest.moneyMax! > 1.01) {
        ns.toast("unable to grow fast enough");
    }
    ns.toast("batching checked")
}


/*ns.exec(hack, extendHack);
ns.exec(weaken);
ns.exec(grow, extendGrow);
ns.exec(weaken);*/