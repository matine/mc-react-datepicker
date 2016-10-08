# Date Picker documentation

## Getting Started

Once the datepicker is in the node_modules folder, you can import it on your page and render it with an optional userConfig object passed in, as explained below.

**Import the datepicker:**
```javascript
import McReactDatepicker from 'mc-react-datepicker';
```

**Render the datepicker:**
```javascript
<DatePicker></DatePicker>
```

OR

**Render the datepicker with a userConfig object:**
```javascript
<DatePicker userConfig={userConfig}></DatePicker>
```

**Include either the raw SASS styles or compiled CSS:**

[datepicker.scss](https://github.com/matine/mc-react-datepicker/blob/master/dist/assets/styles/components/datepicker.scss)

OR

[datepicker.css](https://github.com/matine/mc-react-datepicker/blob/master/dist/assets/styles/components/datepicker.css)


## User configuration object

The datepicker accepts an optional user configuration object with the following properties explained.

### selectedStartDefaultString

**Type:** String

**Default:** "Start date"

**Description:**
The text that appears in the input field for the start date, when a date has not yet been selected

**Example:**
```javascript
selectedStartDefaultString : "Check In",
```

### selectedEndDefaultString

**Type:** String

**Default:** "End date"

**Description:**
The text that appears in the input field for the end date, when a date has not yet been selected

**Example:**
```javascript
selectedEndDefaultString : "Check Out",
```

### disabledDays

**Type:** Array

**Default:** null

**Description:**
Disabled date ranges. Each item in the array should be an object with two properties 'firstDay' and 'lastDay' with date objects as the values.

**Example:**
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

**Type:** Object

**Default:** Teal theme ("#565a5c", "#66e2da", "#99ede6", "#00a699")

**Description:**
Colour theming for the input field active states, the selected days and inbetween days.
The two nested objects are 'inputs' and 'days' which contain properties that accept a string colour value.

**Example:**
```javascript
theme : {
    inputs : {
        activeBackgroundColor: "#ffcccc",
        activeColor: "#565a5c"
    },
    days : {
        selectedBackgroundColor: "#ff4d4d",
        inbetweenBackgroundColor: "#ffcccc",
    }
}
```


