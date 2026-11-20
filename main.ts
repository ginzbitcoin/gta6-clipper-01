// Entrypoint gta6-clipper-01: menyampaikan alamat video ke house.
// Program ini membaca VIDEO.json dari direktori bot lalu menulis
// salinan byte-identiknya ke direktori output. House membaca
// /output/VIDEO.json dan mengambil jumlah tayang dari YouTube.
// Tidak ada penilaian terhadap isi video di dalam program ini.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = `${botDir}/VIDEO.json`;
const target = `${outDir}/VIDEO.json`;

mkdirSync(outDir, { recursive: true });

let payload: Buffer;
try {
  payload = readFileSync(source);
} catch (err) {
  console.error(`Gagal membaca ${source}: ${(err as Error).message}`);
  process.exit(1);
}

try {
  writeFileSync(target, payload);
  console.log(`VIDEO.json disalin ke ${target} (${payload.length} byte).`);
} catch (err) {
  console.error(`Gagal menulis ${target}: ${(err as Error).message}`);
  process.exit(1);
}
