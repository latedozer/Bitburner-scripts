import { NS } from '@ns';
import * as c from './consts.js';

export async function main(ns: NS) {
    let i = 0;
    if (!ns.serverExists("host")) {
        do {
            i++
        } while (ns.getPurchasedServerCost(2 ** (i + 1)) < ns.getPlayer().money && i < 21);
        if (2**i > 32) {
            ns.purchaseServer("host", 2 ** i);
        }
        return;
    }
    if(ns.getServer("host").maxRam === 2**20){
        ns.toast("there's no more ram to buy for host server");
    }
    do {
        i++
    } while (ns.getPurchasedServerUpgradeCost("host", 2 ** (i + 1)) < ns.getPlayer().money && i < 21);
    ns.upgradePurchasedServer("host", 2**i)
}