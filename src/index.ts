const checksumCharacterMap = '0123456789ABCDEFHJKLMNPRSTUVWXY';
const checkSumMapLength = checksumCharacterMap.length; // is always 31

/**
 * Parse string to integer
 * @throws TypeError if value is not a number
 * @param value - string to parse
 * @returns value as number
 */
function parseStringToInt(value: string | undefined): number {
	if (!value) {
		/* c8 ignore next 2 */
		throw new TypeError('Value is undefined');
	}
	const parsedValue = parseInt(value, 10);
	if (isNaN(parsedValue)) {
		throw new TypeError(`Value is not a number: ${value}`);
	}
	return parsedValue;
}

/**
 * Validate that value is a string
 * @throws TypeError if value is not a string
 * @param value - value to validate
 * @returns value as string
 */
function validateString(value: unknown): string {
	if (typeof value !== 'string') {
		/* c8 ignore next 2 */
		throw new TypeError(`${JSON.stringify(value)} not a string`);
	}
	return value;
}

/**
 * Get checksum for check sum index number
 * @param index - index number to lookup checksum character
 * @returns checksum character from checksum index map
 */
function getCheckSum(index: number): string | undefined {
	if (index < 0 || index >= checkSumMapLength) {
		/* c8 ignore next 2 */
		throw new RangeError(`Index out of bounds: ${index.toString()}`);
	}
	return checksumCharacterMap[index];
}

type PersonIdArray = [string, string, string, string, string, string, string, string, string, string, string];

function idDataToArray(personId: string): PersonIdArray {
	return Array.from(personId).map(validateString) as PersonIdArray;
}

/**
 * Validate if a string is a valid Finnish person ID
 *
 * A valid Finnish person ID consists of 11 characters in the format DDMMYYCZZZQ, where:
 * - DDMMYY represents the date of birth
 * - C is the century sign ('+' for 1800s, '-' for 1900s, 'A' for 2000s)
 * - ZZZ is an individual number (odd numbers are males, even numbers are females)
 * - Q is a checksum character
 *
 * The checksum character is calculated based on the first 10 characters.
 *
 * @param personId - The person ID string to validate
 * @returns true if the person ID is valid, false otherwise
 * @example
 * isValidPersonId('131052-308T') // true
 * isValidPersonId('131052-3082') // false
 * @since v0.0.1
 */
export function isValidPersonId(personId: string): boolean {
	if (personId.length !== 11) {
		return false;
	}
	const d = idDataToArray(personId.toUpperCase());
	try {
		const checkSumIndex = parseStringToInt(d[0] + d[1] + d[2] + d[3] + d[4] + d[5] + d[7] + d[8] + d[9]) % checkSumMapLength;
		return d[10] === getCheckSum(checkSumIndex);
	} catch (_error) {
		return false;
	}
}

/**
 * Check if personId belongs to a Finnish male
 * @throws TypeError if personId is not valid
 * @param personId - Finnish personId string
 * @returns true if the personId belongs to a male, false otherwise
 * @example
 * isMale('131052-309U') // true
 * isMale('131052-308T') // false
 * @since v0.0.1
 */
export function isMale(personId: string): boolean {
	if (!isValidPersonId(personId)) {
		throw new TypeError(`${personId} is not valid person id`);
	}
	const d = idDataToArray(personId);
	return parseStringToInt(d[7] + d[8] + d[9]) % 2 === 1; // check if the individual number is odd
}

/**
 * Check if personId belongs to a Finnish female
 * @throws TypeError if personId is not valid
 * @param personId - Finnish personId string
 * @returns true if the personId belongs to a female, false otherwise
 * @example
 * isFemale('131052-308T') // true
 * isFemale('131052-309U') // false
 * @since v0.0.1
 */
export function isFemale(personId: string): boolean {
	return !isMale(personId);
}
