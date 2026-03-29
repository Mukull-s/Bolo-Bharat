import { getTestMessage } from '../services/testService.js';

export const getTest = (req, res) => {
  res.json(getTestMessage());
};

