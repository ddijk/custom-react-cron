import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
moment().format('nl');

var CustomCron =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomCron, _Component);

  function CustomCron(props) {
    var _this;

    _classCallCheck(this, CustomCron);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomCron).call(this, props));

    var startDate = _this.getStartDate(props);

    _this.state = {
      startDate: startDate
    };
    _this.onDayChange = _this.onDayChange.bind(_assertThisInitialized(_this));
    _this.onAtHourChange = _this.onAtHourChange.bind(_assertThisInitialized(_this));
    _this.onAtMinuteChange = _this.onAtMinuteChange.bind(_assertThisInitialized(_this));
    _this.getHours = _this.getHours.bind(_assertThisInitialized(_this));
    _this.getMinutes = _this.getMinutes.bind(_assertThisInitialized(_this));
    _this.state = {
      'value': _this.props.value
    };
    return _this;
  }

  _createClass(CustomCron, [{
    key: "getStartDate",
    value: function getStartDate(props) {
      // load cron pattern:
      // if (props.value && props.value.length) {
      //     return new Date(`${props.value[4]}/${props.value[3]}/${props.value[6]}`)
      // }
      return new Date().toLocaleDateString();
    }
  }, {
    key: "onDayChange",
    value: function onDayChange(date) {
      var val = _toConsumableArray(this.state.value);

      val[3] = String(Number(date.format("DD")));
      val[4] = String(Number(date.format("MM")));
      this.setState({
        value: val,
        startDate: date.format("DD/MM/YYYY")
      });
      this.props.onChange(val);
    }
  }, {
    key: "onAtHourChange",
    value: function onAtHourChange(e) {
      var val = this.state.value;
      val[2] = "".concat(e.target.value);
      this.props.onChange(val);
    }
  }, {
    key: "onAtMinuteChange",
    value: function onAtMinuteChange(e) {
      var val = this.state.value;
      val[1] = "".concat(e.target.value);
      this.props.onChange(val);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "tab-pane"
      }, React.createElement("div", {
        className: "well well-small"
      }, "\xA0 In: \xA0", React.createElement(DatePicker, {
        selected: moment(),
        value: this.state.startDate,
        onChange: this.onDayChange,
        minDate: moment()
      })), "\xA0 At: \xA0", React.createElement("select", {
        id: "DailyHours",
        className: "hours",
        onChange: this.onAtHourChange,
        value: this.state.value[2]
      }, this.getHours()), "\xA0 : \xA0", React.createElement("select", {
        id: "DailyMinutes",
        className: "minutes",
        onChange: this.onAtMinuteChange,
        value: this.state.value[1]
      }, this.getMinutes()));
    }
  }, {
    key: "getHours",
    value: function getHours() {
      var hours = [];
      var leap = parseInt(this.props.hours) || 1;
      var startHour = this.isToday() ? this.getNextHour() : 0;

      for (var i = startHour; i < 24; i = i + leap) {
        hours.push(React.createElement("option", {
          key: i,
          id: i,
          value: i < 10 ? "0".concat(i) : i
        }, i < 10 ? "0".concat(i) : i));
      }

      return hours;
    }
  }, {
    key: "isToday",
    value: function isToday() {
      if (!!!this.state.startDate) {
        console.log('Invalid start date ', this.state.startDate);
        return false;
      }

      var today = moment().format('DD/MM/YYYY');
      return today === this.state.startDate;
    }
  }, {
    key: "getNextHour",
    value: function getNextHour() {
      var hourNow = Number(moment().format('hh'));
      return hourNow < 23 ? hourNow + 1 : 23;
    }
  }, {
    key: "getMinutes",
    value: function getMinutes() {
      var minutes = [];
      var leap = parseInt(this.props.minutes) || 1;

      for (var i = 0; i < 60; i = i + leap) {
        minutes.push(React.createElement("option", {
          key: i,
          id: i,
          value: i < 10 ? "0".concat(i) : i
        }, i < 10 ? "0".concat(i) : i));
      }

      return minutes;
    }
  }]);

  return CustomCron;
}(Component);

export { CustomCron as default };