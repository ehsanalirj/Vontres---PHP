const tracer = require('dd-trace').init();
const StatsD = require('hot-shots');
const dogstatsd = new StatsD();

module.exports = {
  tracer,
  dogstatsd,
};