import crypto from 'crypto';

// Generate a secret key
const secret = crypto.randomBytes(64).toString('hex');
console.log(secret);