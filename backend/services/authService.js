import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const usersByEmail = new Map();

export const createUser = async ({ name, email, password }) => {
  const key = String(email).toLowerCase().trim();
  if (usersByEmail.has(key)) {
    throw new Error('Email already registered');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    sub: cryptoRandomId(),
    name: String(name),
    email: key,
    passwordHash,
    createdAt: Date.now(),
  };
  usersByEmail.set(key, user);
  return user;
};

export const authenticateUser = async ({ email, password }) => {
  const key = String(email).toLowerCase().trim();
  const user = usersByEmail.get(key);
  if (!user) throw new Error('Invalid email or password');

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error('Invalid email or password');
  return user;
};

export const signToken = (user) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('Server misconfigured: JWT_SECRET missing');

  return jwt.sign(
    {
      sub: user.sub,
      email: user.email,
      name: user.name,
    },
    secret,
    { expiresIn: '7d' }
  );
};

export const getPublicUser = (user) => {
  if (!user) return null;
  return {
    id: user.sub,
    name: user.name,
    email: user.email,
  };
};

function cryptoRandomId() {
  // Small helper to avoid bringing in extra deps.
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

