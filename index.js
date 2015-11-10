var data = require("./data");
var perCountry = {};
var perMcc = {};
var perMccPerMnc = {};
data.forEach(function (row) {
	if (null == perCountry[row.country]) {
		perCountry[row.country] = [];
	}
	perCountry[row.country].push(row);

	if (!row.mcc) {
		return;
	}
	if (null == perMcc[row.mcc]) {
		perMcc[row.mcc] = [];
	}
	perMcc[row.mcc].push(row);

	if (null == perMccPerMnc[row.mcc]) {
		perMccPerMnc[row.mcc] = {};
	}
	perMccPerMnc[row.mcc][row.mnc] = row;
});
module.exports = perMccPerMnc;
module.exports.isValidMcc = function (mcc) {
	return perMcc.hasOwnProperty(mcc);
};
module.exports.lookup = function (mcc, mnc) {
	try {
		return perMccPerMnc[mcc][mnc];
	}
	catch (error) {
		return null;
	}
};
module.exports.perCountry = perCountry;
module.exports.perMcc = perMcc;
