import { NS } from '@ns';

export async function main(ns: NS) {
  let dest = ns.args[0].toString();
 await ns.grow(dest);
}