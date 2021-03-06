var extend = require('xtend/mutable');

module.exports = GAFeeEstimatesFactory;

extend(GAFeeEstimatesFactory.prototype, {
  getFeeEstimate: getFeeEstimate
});

function GAFeeEstimatesFactory (gaService, initialEstimates) {
  this.gaService = gaService;
  this.estimates = initialEstimates;
  var _this = this;
  gaService.addNotificationCallback('feeEstimates', function (event) {
    _this.estimates = event[0];
  });
}

function getFeeEstimate (confs) {
  var estimate = this.estimates[confs];
  if (+estimate['feerate'] > 0) {
    return [
      /* satoshis = */ 1000 * 1000 * 100 * estimate['feerate'],
      estimate['blocks']
    ];
  } else {
    return [10000, 1];
  }
}
