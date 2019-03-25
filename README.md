### Finnish Person ID check [![Build Status](https://travis-ci.org/mharj/hetu.svg?branch=master)](https://travis-ci.org/mharj/hetu)
```javascript
const {isFemale, isMale, isValidPersonId} = require('fi-pin');

if ( isValidPersonId('131052-308T') ) {
    console.log('male', isMale('131052-308T') );
    console.log('female', isFemale('131052-308T') );
}
```