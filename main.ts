import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const line = 'The 9 AM status meeting was essentially a live podcast where the hosts didn\'t know the topic and the audience was held hostage.';
const length = Array.from(line).length;

if (length < 1 || length > 200 || /[\r\n]/.test(line)) {
  throw new Error('Entry must be a single line of 1 to 200 characters');
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(outputDir, { recursive: true });
writeFileSync(`${outputDir}/entry.txt`, `${line}\n`);

const written = readFileSync(`${outputDir}/entry.txt`, 'utf8');
const readBackLine = written.endsWith('\n') ? written.slice(0, -1) : written;
const readBackLength = Array.from(readBackLine).length;
if (written !== `${line}\n` || readBackLength !== length || readBackLength < 1 || readBackLength > 200 || /[\r\n]/.test(readBackLine)) {
  throw new Error('Written entry failed the read-back self-check');
}
