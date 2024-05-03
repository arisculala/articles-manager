import bcrypt from 'bcrypt';

// hash a string
async function hash(password: string | Buffer) {
  try {
    const saltRounds = 10; // number of salt rounds (higher is more secure but slower)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

export { hash };
