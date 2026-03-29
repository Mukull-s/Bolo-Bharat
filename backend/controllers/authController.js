import {
  createUser,
  authenticateUser,
  getPublicUser,
  signToken,
} from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email, password are required' });
    }

    const user = await createUser({ name, email, password });
    const token = signToken(user);
    res.status(201).json({ token, user: getPublicUser(user) });
  } catch (err) {
    return res.status(400).json({ message: err.message || 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await authenticateUser({ email, password });
    const token = signToken(user);
    res.json({ token, user: getPublicUser(user) });
  } catch (err) {
    return res.status(401).json({ message: err.message || 'Login failed' });
  }
};

export const me = async (req, res) => {
  const { email } = req.user || {};
  if (!email) return res.status(400).json({ message: 'Invalid user token' });
  const user = getPublicUser(req.user);
  res.json({ user });
};

