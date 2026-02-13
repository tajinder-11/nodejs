const fs = require('node:fs');

exports.loggerMiddleware = (req, res, next) => {
  const log = `[${Date.now()}] ${req.method} ${req.path}\n`;
  fs.appendFileSync('logs.txt', log, 'utf-8');
  next();
};
