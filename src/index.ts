const checksumCharacterSet = '0123456789ABCDEFHJKLMNPRSTUVWXY';
const checkSumMapLength = checksumCharacterSet.length; // is always 31

/**
 * Parse string to integer
 * @throws TypeError if value is not a number
 * @param value - string to parse
 * @returns value as number
 */
export function parseStringToInt(value: string | undefined): number {
	if (!value) {
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
export function validateString(value: unknown): string {
	if (typeof value !== 'string') {
		throw new TypeError(`${String(value)} not a string`);
	}
	return value;
}

/**
 * Get checksum for check sum index number
 * @param index - index number to lookup checksum character
 * @returns checksum character from checksum index map
 */
export function getCheckSum(index: number): string | undefined {
	if (index < 0 || index >= checkSumMapLength) {
		throw new RangeError(`Index out of bounds: ${index.toString()} (valid range: 0-${String(checkSumMapLength - 1)})`);
	}
	return checksumCharacterSet[index];
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
 * @param personId - The person ID string to validate
 * @template BRAND - Optional: brand type for more strict type (i.e. use Zod branded type or custom type)
 * @returns true if the person ID is valid, false otherwise
 * @example
 * isValidPersonId('131052-308T') // true
 * isValidPersonId('131052-3082') // false
 * const personId = '131052-308T';
 * if(isValidPersonId<z.BRAND<'PersonID'>>(personId)) { // personId type is now: string & z.BRAND<'PersonID'>
 *   // personId type is now: string & z.BRAND<'PersonID'>
 * }
 * @since v0.0.1
 */
export function isValidPersonId<BRAND = string>(personId: string): personId is string & BRAND {
	if (typeof personId !== 'string' || personId.length !== 11) {
		return false;
	}
	const upperPersonId = personId.toUpperCase();
	try {
		return upperPersonId[10] === getCheckSum(parseStringToInt(upperPersonId.slice(0, 6) + upperPersonId.slice(7, 10)) % checkSumMapLength);
	} catch (_error) {
		return false;
	}
}

/**
 * Check if personId belongs to a Finnish male
 * @throws TypeError if personId is not valid
 * @param personId - Finnish personId string
 * @template BRAND - Optional: brand type for more strict type (i.e. use Zod branded type or custom type)
 * @returns true if the personId belongs to a male, false otherwise
 * @example
 * isMale('131052-309U') // true
 * isMale('131052-308T') // false
 * isMale<z.BRAND<'PersonIdMale'>>(personId) // if true, personId type is now: string & z.BRAND<'PersonIdMale'>
 * @since v0.0.1
 */
export function isMale<BRAND = string>(personId: string): personId is string & BRAND {
	if (!isValidPersonId(personId)) {
		throw new TypeError(`${String(personId)} is not valid person id`);
	}
	return parseStringToInt(personId.slice(7, 10)) % 2 === 1; // check if the individual number is odd
}

/**
 * Check if personId belongs to a Finnish female
 * @throws TypeError if personId is not valid
 * @param personId - Finnish personId string
 * @template BRAND - Optional: brand type for more strict type (i.e. use Zod branded type or custom type)
 * @returns true if the personId belongs to a female, false otherwise
 * @example
 * isFemale('131052-308T') // true
 * isFemale('131052-309U') // false
 * isFemale<z.BRAND<'PersonIdFemale'>>(personId) // if true, personId type is now: string & z.BRAND<'PersonIdFemale'>
 * @since v0.0.1
 */
export function isFemale<BRAND = string>(personId: string): personId is string & BRAND {
	return !isMale(personId);
}
