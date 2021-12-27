# date-range-picker

![Single select](https://raw.githubusercontent.com/VolkenoMakers/date-range-picker/files/demo.gif)

## Add it to your project

- Using NPM
  `npm install @volkenomakers/date-range-picker react-native-elements moment`
- or:
- Using Yarn
  `yarn add @volkenomakers/date-range-picker react-native-elements moment`

## Usage

```javascript
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import DateRangePicker from "@volkenomakers/date-range-picker";

export default function DateRangePickerApp() {
  const [dates, setDates] = React.useState(["2021-12-30"]);
  const [show, setShow] = React.useState(false);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <DateRangePicker
        visible={show}
        onHide={() => setShow(false)}
        minDate={new Date()}
        maxDate={new Date("2022-01-01")}
        primaryColor="#34495e"
        secondaryColor="#8e44ad"
        onChange={(values) => {
          setDates(values);
        }}
        values={dates}
      />
      <Button title={"Show picker"} onPress={() => setShow(true)} />
    </View>
  );
}
```
