function getCC(num) {
	var c='0123456789ABCDEFHJKLMNPRSTUVWXY';
	return (c[num]?c[num]:null);
}

function isValidHetu(d) {
	if ( d.length < 10 ) 
		return false;
	d = d.toUpperCase();
	return (d[10] == getCC(parseInt(d[0]+d[1]+d[2]+d[3]+d[4]+d[5]+d[7]+d[8]+d[9])%31));
}

function isMale(d) {
	if ( d.length < 10 ) 
		return null;
	return (parseInt(d[7]+d[8]+d[9])%2==1?true:false);
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = isValidHetu;
} else {
	if (typeof define === 'function' && define.amd) {
		define([], function() {
			return isValidHetu;
		});
	} else {
		window.isValidHetu = isValidHetu;
	}
}
