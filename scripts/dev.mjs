#!/usr/bin/env node
/**
 * next dev 래퍼 — 깨진 .next 캐시가 있으면 시작 전에 자동 삭제.
 * (routes-manifest.json / BUILD_ID 없음 = 이전 빌드·HMR 중단 잔해)
 */
import { spawn } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const nextDir = join(root, '.next');
const useWebpack = process.argv.includes('--webpack');

function isStaleNextDir() {
  if (!existsSync(nextDir)) return false;
  const markers = ['routes-manifest.json', 'BUILD_ID'];
  return markers.some((name) => !existsSync(join(nextDir, name)));
}

if (isStaleNextDir()) {
  console.log('[dev] 깨진 .next 캐시 감지 → 삭제 후 다시 시작합니다.');
  rmSync(nextDir, { recursive: true, force: true });
}

const args = ['dev', ...(useWebpack ? [] : ['--turbopack'])];

const child = spawn('bunx', ['next', ...args], {
  cwd: root,
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
