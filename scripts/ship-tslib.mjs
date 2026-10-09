import { cpSync, existsSync } from "node:fs";

const func = ".vercel/output/functions/__server.func";
const src = "node_modules/tslib";
if (existsSync(func) && existsSync(src)) {
  cpSync(src, `${func}/node_modules/tslib`, { recursive: true });
  cpSync(src, `${func}/_libs/node_modules/tslib`, { recursive: true });
}
