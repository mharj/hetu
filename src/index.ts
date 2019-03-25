const c = '0123456789ABCDEFHJKLMNPRSTUVWXY';

const getCC = (num: number): string | null => {
	return c[num] ? c[num] : null;
};

export const isValidPersonId = (hetu: string): boolean => {
	if (hetu.length !== 11) {
		return false;
	}
	const d = hetu.toUpperCase();
	return d[10] === getCC(parseInt(d[0] + d[1] + d[2] + d[3] + d[4] + d[5] + d[7] + d[8] + d[9], 10) % 31);
};

export const isMale = (hetu: string): boolean => {
	if (!isValidPersonId(hetu)) {
		throw new Error('not valid person id');
	}
	return parseInt(hetu[7] + hetu[8] + hetu[9], 10) % 2 === 1 ? true : false;
};

export const isFemale = (hetu: string): boolean => {
	return !isMale(hetu);
};
