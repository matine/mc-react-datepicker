# Date Picker

## Configuration

The datepicker accepts an optional user configuration object with the following properties.

### selectedStartDefaultString

Type: String

Default: "Start date"

The text that appears in the input field for the start date, when a date has not yet been selected

Example:
```javascript
selectedStartDefaultString : "Check In",
```

### selectedEndDefaultString

Type: String

Default: "End date"

The text that appears in the input field for the end date, when a date has not yet been selected

Example:
```javascript
selectedEndDefaultString : "Check Out",
```

### disabledDays

Type: Array

Default: null

Each item in the array should be an object with two properties 'firstDay' and 'lastDay' with date objects as the values

Example:
```javascript
disabledDays : [
    {
        firstDay : new Date("October 16, 2016"),
        lastDay : new Date("October 19, 2016")
    },
    {
        firstDay : new Date("December 4, 2016"),
        lastDay : new Date("December 4, 2016"),
    }
]
```

### theme

Type: Object
