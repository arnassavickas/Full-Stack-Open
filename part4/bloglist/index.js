const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
