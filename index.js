const prefix = ['y', 'z', 'a', 'f', 'p', 'n', 'u', 'm', '', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
	atomicprefix = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
	localeDelimiter = .5.toLocaleString().substring(1, 2);

var format = function(n, o) {
	o = o || {};
	const bppfix = o.prefix || 0,
		base = o.base || 1000,
		precision = o.precision || 3,
		unit = o.unit || '',
		unitnotgiven = o.unit == undefined,
		forced = !!o.precision,
		atomic = o.atomic,
		round = o.round,
		lowerbound = atomic ? 0 : -8,
		table = atomic ? atomicprefix : prefix,
		trailing = o.trailing,
		delimiter = o.delimiter;

	var ppfix = bppfix,
		sign = n < 0 ? '-' : '';

	if (n < 0) {
		n = -n;
	}

	if (n >= base) {
		while (ppfix < 8 && n >= base) {
			n /= base;
			ppfix++;
		}
	}
	else if (n < 1) {
		while (ppfix > lowerbound && n <= base) {
			n *= base;
			ppfix--;
		}
	}

	if (!atomic) {
		ppfix += 8;
	}

	var num = round && atomic && ppfix == 0 ? n | 0 : n.toFixed(precision),
		str = (trailing ? num : parseFloat(num)) + '';

	if (delimiter) {
		str = str.replace(localeDelimiter, delimiter);
	}

	return sign + str + (!unitnotgiven ? ' ' + table[ppfix] + unit : table[ppfix]);
};

var formatter = function(o) {
	o = o || {};
	const bppfix = o.prefix || 0,
		base = o.base || 1000,
		precision = o.precision || 3,
		unit = o.unit || '',
		unitnotgiven = o.unit == undefined,
		forced = !!o.precision,
		atomic = o.atomic,
		round = o.round,
		lowerbound = atomic ? 0 : -8,
		table = atomic ? atomicprefix : prefix,
		trailing = o.trailing,
		delimiter = o.delimiter;

	return function(n) {
		var ppfix = bppfix,
			sign = n < 0 ? '-' : '';

		if (n < 0) {
			n = -n;
		}

		if (n >= base) {
			while (ppfix < 8 && n >= base) {
				n /= base;
				ppfix++;
			}
		}
		else if (n < 1) {
			while (ppfix > lowerbound && n <= base) {
				n *= base;
				ppfix--;
			}
		}

		if (!atomic) {
			ppfix += 8;
		}

		var num = round && atomic && ppfix == 0 ? n | 0 : n.toFixed(precision),
			str = (trailing ? num : parseFloat(num)) + '';

		if (delimiter) {
			str = str.replace(localeDelimiter, delimiter);
		}

		return sign + str + (!unitnotgiven ? ' ' + table[ppfix] + unit : table[ppfix]);
	}
}

module.exports.format = format;
module.exports.formatter = formatter;
module.exports.siprefix = prefix;
module.exports.iecprefix = atomicprefix;
