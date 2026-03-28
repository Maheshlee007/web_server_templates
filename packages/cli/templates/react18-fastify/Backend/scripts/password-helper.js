#!/usr/bin/env node
import bcrypt from 'bcryptjs';

const [,, command, ...args] = process.argv;

async function main() {
  if (!command || !['hash', 'verify'].includes(command)) {
    console.log('Usage:');
    console.log('  node scripts/password-helper.js hash <plainPassword>');
    console.log('  node scripts/password-helper.js verify <plainPassword> <bcryptHash>');
    process.exit(1);
  }

  if (command === 'hash') {
    const plain = args[0];
    if (!plain) {
      console.error('Missing plain password.');
      process.exit(1);
    }

    const hash = await bcrypt.hash(plain, 12);
    console.log(hash);
    return;
  }

  if (command === 'verify') {
    const plain = args[0];
    const hash = args[1];

    if (!plain || !hash) {
      console.error('Missing arguments.');
      process.exit(1);
    }

    const ok = await bcrypt.compare(plain, hash);
    console.log(ok ? 'MATCH' : 'NO_MATCH');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
