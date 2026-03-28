#!/usr/bin/env node
import bcrypt from 'bcryptjs';

const [,, plainPassword, bcryptHash] = process.argv;

if (!plainPassword || !bcryptHash) {
  console.log('Usage: node scripts/decrypt.js <plainPassword> <bcryptHash>');
  console.log('Note: bcrypt hashes are one-way and cannot be decrypted. This script verifies a password against a hash.');
  process.exit(1);
}

const match = await bcrypt.compare(plainPassword, bcryptHash);
console.log(match ? 'MATCH' : 'NO_MATCH');
