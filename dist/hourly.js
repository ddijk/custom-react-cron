import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';

var CustomCron =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomCron, _Component);

  function CustomCron(props) {
    var _this;

    _classCallCheck(this, CustomCron);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomCron).call(this, props));
    _this.onHourChange = _this.onHourChange.bind(_assertThisInitialized(_this));
    _this.onAtHourChange = _this.onAtHourChange.bind(_assertThisInitialized(_this));
    _this.onAtMinuteChange = _this.onAtMinuteChange.bind(_assertThisInitialized(_this));
    _this.state = {
      'value': _this.props.value
    };

    if (_this.state.value[2].search('0/') === 0 || _this.state.value[2] === '*') {
      _this.state.every = true;
    }

    return _this;
  }

  _createClass(CustomCron, [{
    key: "onHourChange",
    value: function onHourChange(e) {
      if (this.state.every && (e.target.value > 0 && e.target.value < 24 || e.target.value == '')) {
        var val = ['0', '0', '*', '*', '*', '?', '*'];

        if (e.target.value == '') {
          val[2] = '';
        } else {
          val[2] = "0/".concat(e.target.value);
        }

        this.props.onChange(val);
      }
    }
  }, {
    key: "onAtHourChange",
    value: function onAtHourChange(e) {
      var val = ['0', this.state.value[1], '*', '*', '*', '?', '*'];
      val[2] = "".concat(e.target.value, "/1");
      this.props.onChange(val);
    }
  }, {
    key: "onAtMinuteChange",
    value: function onAtMinuteChange(e) {
      var val = ['0', '*', this.state.value[2], '*', '*', '?', '*'];
      val[1] = "".concat(e.target.value);
      this.props.onChange(val);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.state.value = this.props.value;
      return React.createElement("div", {
        className: "tab-content"
      }, React.createElement("div", {
        className: "tab-pane active"
      }, React.createElement("div", {
        className: "well well-small"
      }, React.createElement("input", {
        type: "radio",
        onChange: function onChange(e) {
          _this2.setState({
            every: true
          });

          _this2.props.onChange(['0', '0', '0/1', '*', '*', '?', '*']);
        },
        checked: this.state.every ? true : false
      }), React.createElement("span", null, "\xA0Every \xA0"), React.createElement("input", {
        disabled: this.state.every ? false : true,
        type: "Number",
        onChange: this.onHourChange,
        value: this.state.value[2].split('/')[1] ? this.state.value[2].split('/')[1] : ''
      }), React.createElement("span", null, "\xA0hour(s)\xA0")), React.createElement("div", {
        className: "well row well-small margin-right-0 margin-left-0"
      })));
    }
  }, {
    key: "getHours",
    value: function getHours() {
      var hours = [];
      var leap = parseInt(this.props.hours) || 1;

      for (var i = 0; i < 24; i = i + leap) {
        hours.push(React.createElement("option", {
          key: i,
          value: i < 10 ? "0".concat(i) : i
        }, i < 10 ? "0".concat(i) : i));
      }

      return hours;
    }
  }, {
    key: "getMinutes",
    value: function getMinutes() {
      var minutes = [];
      var leap = parseInt(this.props.minutes) || 1;

      for (var i = 0; i < 60; i = i + leap) {
        minutes.push(React.createElement("option", {
          key: i,
          value: i < 10 ? "0".concat(i) : i
        }, i < 10 ? "0".concat(i) : i));
      }

      return minutes;
    }
  }]);

  return CustomCron;
}(Component);

export { CustomCron as default };