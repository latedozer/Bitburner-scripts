import { NS } from '@ns';
import * as c from './consts.js';

export async function main(ns: NS) {
  let has = 0;

  if (!ns.singularity.purchaseTor()) {
    ns.writePort(c.portsHas, has);
    return;
  }

  for (let i = 0; i < c.ports.length; i++) {
    if (ns.fileExists(c.ports[i], 'home')) {
      has++;
    }
    else if (ns.singularity.getDarkwebProgramCost(c.ports[i]) < ns.getPlayer().money) {
      ns.singularity.purchaseProgram(c.ports[i]);
      has++
    }
  }
  if(!ns.fileExists('Formulas.exe')){
    if(ns.singularity.getDarkwebProgramCost('Formulas.exe') < ns.getPlayer().money){
      ns.singularity.purchaseProgram('Formulas.exe');
    }
  }

  await ns.writePort(c.portsHas, has);

}