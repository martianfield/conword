# Conword

Converts things to words.

## Months

Converts an array of integers to strings expressing months and periods. E.g.:

- `[1,2]`
    - months: ['January', 'February']
    - periods: `['January-February']`
- `[1,2,3,9,11]`
    - months: ['January', 'February', 'March', 'September', 'October', 'November']
    - periods: `['January-March', 'September-November']`

```
'use strict'

const conword = require('conword')

let options = {
    language: 'en',
    zeroBased: false,
    connector: '-'
}

let months = [1, 4, 6]

let result = conword.months(months, options)

// output name of months
console.log(result.months)

// output all periods
console.log(result.periods)
```