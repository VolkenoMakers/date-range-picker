import moment from "moment";
import React from "react";
import { Text } from "react-native";
import { Dimensions } from "react-native";
import { Modal, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

function range(start: number, end: number) {
  const array = [];
  for (let i = start; i < end; i++) {
    array.push(i);
  }
  return array;
}

const DIMENSIONS = Dimensions.get("screen");
function reset(date?: any): moment.Moment {
  return moment(date).seconds(0).hours(0).minutes(0).milliseconds(0);
}
function compareDate(
  d1: moment.Moment,
  d2: moment.Moment,
  format = "DD-MM-YYYY"
) {
  return d1.format(format) === d2.format(format);
}
const DateRangePicker = ({
  onHide,
  visible,
  onChange,
  values = [],
  minDate,
  maxDate,
  primaryColor = "#34495e",
  secondaryColor = "#8e44ad",
}) => {
  const [activeDate, setActiveDate] = React.useState(
    reset(values[0] || undefined).set("date", 1)
  );
  const [selectedDates, setSelectedDates] = React.useState([]);
  React.useEffect(() => {
    const d = values.map((d: any) => reset(d));
    setActiveDate(reset(d[0] || undefined).set("date", 1));
    setSelectedDates(d);
  }, [values, visible]);
  const addDate = React.useCallback(
    (amount) => {
      setActiveDate(
        reset(activeDate).set("date", 1).add(amount, "month").set("date", 1)
      );
    },
    [activeDate]
  );

  return (
    <Modal transparent visible={visible} onRequestClose={onHide}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,.3)",
          justifyContent: "flex-end",
        }}
      >
        <View style={{ width: DIMENSIONS.width, backgroundColor: "#FFF" }}>
          <Header
            primaryColor={primaryColor}
            activeDate={reset(activeDate)}
            addDate={addDate}
          />
          <View style={{ alignItems: "center" }}>
            <Days primaryColor={primaryColor} activeDate={reset(activeDate)} />
            <DaysNumber
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              minDate={minDate}
              maxDate={maxDate}
              onPress={(date) => {
                const values = selectedDates.filter(
                  (d) => !compareDate(d, date)
                );
                if (values.length === selectedDates.length) {
                  values.push(date);
                }
                setSelectedDates(values.sort((a, b) => a - b));
              }}
              values={selectedDates}
              days={activeDate.daysInMonth() + 1}
              weekday={activeDate.weekday()}
              activeDate={reset(activeDate)}
            />
          </View>
          <Buttons
            onCancel={onHide}
            primaryColor={primaryColor}
            onConfirm={() => {
              onChange(selectedDates.map((s) => s.format("YYYY-MM-DD")));
              onHide();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default DateRangePicker;
const { width, height } = DIMENSIONS;

const ITEM_W = (width - 20) / 7;

const ITEM_H = height * 0.07;

function Days({ activeDate, primaryColor }) {
  const days = range(0, 7);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        width: ITEM_W * 7,
        marginHorizontal: 10,
      }}
    >
      {days.map((d) => (
        <View
          key={d}
          style={{
            width: ITEM_W - 5,
            alignItems: "center",
            marginHorizontal: 2,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textTransform: "uppercase",
              color: primaryColor,
              fontWeight: "bold",
            }}
            key={d}
          >
            {activeDate.weekday(d).format("ddd")}
          </Text>
        </View>
      ))}
    </View>
  );
}

function DaysNumber({
  activeDate,
  weekday,
  onPress,
  values,
  days,
  minDate,
  maxDate,
  primaryColor,
  secondaryColor,
}) {
  const items = range(1, days);
  const dec = range(0, weekday);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        width: ITEM_W * 7,
        paddingVertical: 10,
        marginHorizontal: 10,
      }}
    >
      {dec.map((d: number) => (
        <View
          key={d}
          style={{
            width: ITEM_W - 5,
            marginHorizontal: 2,
            marginVertical: 2,
            height: ITEM_H,
          }}
        ></View>
      ))}
      {items.map((d: number) => {
        const date = reset(activeDate).set("date", d);
        let selected = !!values.find((d: any) => compareDate(d, date));
        let disabled = false;
        if (minDate) {
          disabled = reset(minDate) > date;
        }
        if (maxDate && !disabled) {
          disabled = reset(maxDate) < date;
        }

        return (
          <TouchableOpacity
            key={d}
            onPress={() => {
              if (!disabled) {
                onPress(date);
              }
            }}
          >
            <View
              style={{
                width: ITEM_W - 5,
                marginHorizontal: 2,
                marginVertical: 2,
                height: ITEM_H,
                borderRadius: ITEM_H * 0.1,
                opacity: disabled ? 0.3 : 1,
                backgroundColor: selected ? primaryColor : secondaryColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#FFF",
                }}
              >
                {d}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function Buttons({ onCancel, onConfirm, primaryColor }) {
  return (
    <View
      style={{
        marginTop: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 5,
        paddingBottom: 5,
      }}
    >
      <Icon
        tvParallaxProperties={{}}
        name="close"
        size={30}
        onPress={onCancel}
        color="#FFF"
        style={{ opacity: 0.5 }}
        containerStyle={{
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          height: 60,
          backgroundColor: "#F00",
          borderRadius: 60,
        }}
      />
      <Icon
        tvParallaxProperties={{}}
        style={{ opacity: 0.5 }}
        name="check"
        size={30}
        color="#FFF"
        onPress={onConfirm}
        containerStyle={{
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          height: 60,
          backgroundColor: primaryColor,
          borderRadius: 60,
        }}
      />
    </View>
  );
}

function Header({
  activeDate,
  addDate,
  primaryColor,
}: {
  activeDate: moment.Moment;
  addDate: Function;
  primaryColor: string;
}) {
  return (
    <View style={{ marginBottom: 15 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
          justifyContent: "space-between",
        }}
      >
        <Icon
          tvParallaxProperties={{}}
          onPress={() => addDate(-1)}
          name="left"
          type="antdesign"
          color={primaryColor}
        />
        <Text
          style={{
            color: primaryColor,
            fontWeight: "bold",
            fontSize: 16,
            textTransform: "uppercase",
          }}
        >
          {activeDate.format("MMMM YYYY")}
        </Text>
        <Icon
          tvParallaxProperties={{}}
          onPress={() => addDate(1)}
          name="right"
          type="antdesign"
          color={primaryColor}
        />
      </View>
      <Separator primaryColor={primaryColor} />
    </View>
  );
}

function Separator({ primaryColor }) {
  return (
    <View
      style={{ width: "100%", height: 0.7, backgroundColor: primaryColor }}
    />
  );
}
