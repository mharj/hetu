### Finnish Person ID check [![Build Status](https://travis-ci.org/mharj/hetu.svg?branch=master)](https://travis-ci.org/mharj/hetu) [![Maintainability](https://api.codeclimate.com/v1/badges/3dca350166c6d1ea4105/maintainability)](https://codeclimate.com/github/mharj/hetu/maintainability)

```javascript
const {isFemale, isMale, isValidPersonId} = require('fi-pin');

if (isValidPersonId('131052-308T')) {
	console.log('male', isMale('131052-308T'));
	console.log('female', isFemale('131052-308T'));
}
```

```typescript
import {isFemale, isMale, isValidPersonId} from 'fi-pin';

if (isValidPersonId('131052-308T')) {
	console.log('male', isMale('131052-308T'));
	console.log('female', isFemale('131052-308T'));
}
```
