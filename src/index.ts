const c = '0123456789ABCDEFHJKLMNPRSTUVWXY';

/**
 * Parse string to integer
 * @throws TypeError if value is not a number
 * @param value
 * @returns value as number
 */
function toInt(value: string | undefined): number {
	if (!value) {
		throw new TypeError('undefined');
	}
	const outValue = parseInt(value, 10);
	if (isNaN(outValue)) {
		throw new TypeError(`${value} not a number`);
	}
	return outValue;
}

/**
 * Validate that value is a string
 * @throws TypeError if value is not a string
 * @param value
 * @returns value as string
 */
function getString(value: unknown): string {
	if (typeof value !== 'string') {
		throw new TypeError(`${JSON.stringify(value)} not a string`);
	}
	return value;
}

/**
 * Build checksum for personId (last character)
 * @param num - number to build checksum from
 * @returns checksum character
 */
function buildCheckSum(num: number): string | undefined {
	return c[num];
}

/**
 * Construct array of string values from personId string
 * @param personId - personId string
 * @returns
 */
function buildCcValues(personId: string): [string, string, string, string, string, string, string, string, string, string, string] {
	return [
		getString(personId[0]),
		getString(personId[1]),
		getString(personId[2]),
		getString(personId[3]),
		getString(personId[4]),
		getString(personId[5]),
		getString(personId[6]),
		getString(personId[7]),
		getString(personId[8]),
		getString(personId[9]),
		getString(personId[10]),
	];
}

/**
 * Validate if string is a valid personId
 * @param personId - personId string
 * @returns true if valid, false if not
 * @example
 * isValidPersonId('131052-308T') // true
 * isValidPersonId('131052-3082') // false
 */
export function isValidPersonId(personId: string): boolean {
	if (personId.length !== 11) {
		return false;
	}
	const d = buildCcValues(personId.toUpperCase());
	return d[10] === buildCheckSum(toInt(d[0] + d[1] + d[2] + d[3] + d[4] + d[5] + d[7] + d[8] + d[9]) % 31);
}

/**
 * Check if personId is for male
 * @throws TypeError if personId is not valid
 * @param personId - personId string
 * @returns true if valid, false if not
 * @example
 * isMale('131052-308T') // false
 */
export function isMale(personId: string): boolean {
	if (!isValidPersonId(personId)) {
		throw new TypeError('not valid person id');
	}
	const d = buildCcValues(personId);
	return toInt(d[7] + d[8] + d[9]) % 2 === 1;
}

/**
 * Check if personId is for female
 * @throws TypeError if personId is not valid
 * @param personId - personId string
 * @returns true if valid, false if not
 * @example
 * isFemale('131052-308T') // true
 */
export function isFemale(personId: string): boolean {
	return !isMale(personId);
}
