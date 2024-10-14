import { defineConfig } from 'tsup';
import dotenv from 'dotenv';


export default defineConfig({
  entry: ['src/index.ts'], // Ajuste conforme necessário
  format: ['esm'], // Mude para 'esm' para suportar top-level await
  dts: true,
  sourcemap: true,
  clean: true,
  env: dotenv.config().parsed
});
