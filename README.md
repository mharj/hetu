# Finnish Person ID Check 
![github action](https://github.com/mharj/hetu/actions/workflows/main.yml/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/3dca350166c6d1ea4105/maintainability)](https://codeclimate.com/github/mharj/hetu/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3dca350166c6d1ea4105/test_coverage)](https://codeclimate.com/github/mharj/hetu/test_coverage)

## Overview

This module provides functions to validate Finnish person IDs (Henkilötunnus) and determine the gender based on the ID. A valid Finnish person ID consists of 11 characters in the format `DDMMYYCZZZQ`, where:
- `DDMMYY` represents the date of birth
- `C` is the century sign ('+' for 1800s, '-' for 1900s, 'A' for 2000s)
- `ZZZ` is an individual number (odd numbers are males, even numbers are females)
- `Q` is a checksum character

## Functions

### `isValidPersonId(personId: string): boolean`

Validates if the provided string is a valid Finnish person ID.

**Parameters:**
- `personId` - The person ID string to validate

**Returns:**
- `true` if the person ID is valid, `false` otherwise

**Example:**
```javascript
isValidPersonId('131052-308T') // true
isValidPersonId('131052-3082') // false
```

### `isMale(personId: string): boolean`

Checks if the provided Finnish person ID belongs to a male.

**Parameters:**
- `personId` - The Finnish person ID string

**Returns:**
- `true` if the person ID belongs to a male, `false` otherwise

**Example:**
```javascript
isMale('131052-309U') // true
isMale('131052-308T') // false
```

### `isFemale(personId: string): boolean`

Checks if the provided Finnish person ID belongs to a female.

**Parameters:**
- `personId` - The Finnish person ID string

**Returns:**
- `true` if the person ID belongs to a female, `false` otherwise

**Example:**
```javascript
isFemale('131052-308T') // true
isFemale('131052-309U') // false
```

## Usage

### JavaScript

```javascript
const {isFemale, isMale, isValidPersonId} = require('fi-pin');

if (isValidPersonId('131052-308T')) {
    console.log('male', isMale('131052-308T'));
    console.log('female', isFemale('131052-308T'));
}
```

### TypeScript

```typescript
import {isFemale, isMale, isValidPersonId} from 'fi-pin';

if (isValidPersonId('131052-308T')) {
    console.log('male', isMale('131052-308T'));
    console.log('female', isFemale('131052-308T'));
}
```
