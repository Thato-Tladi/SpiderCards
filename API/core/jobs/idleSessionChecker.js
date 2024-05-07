const { terminateIdleSessions } = require('../utils/idleSessionTerminator');

const startIdleSessionChecker = (intervalMinutes = 5) => {
  const intervalMillis = intervalMinutes * 60 * 1000;

  setInterval(async () => {
    console.log(`Running idle session terminator...`);
    try {
      await terminateIdleSessions();
    } catch (error) {
      console.error('Error while terminating idle sessions:', error);
    }
  }, intervalMillis);
};

module.exports = {
  startIdleSessionChecker
};
