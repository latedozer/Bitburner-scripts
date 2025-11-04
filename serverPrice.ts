import { NS } from '@ns';

export async function main(ns: NS) {
  let i = 0;

  do{
    i++
  }while(ns.getPurchasedServerCost(2**(i+1)) < ns.getPlayer().money);

  ns.tprint(`${2**i}gb for $` + ns.getPurchasedServerCost(2**i))

  if(ns.args[0] === true){
    ns.purchaseServer('host', 2**i);
  }

}