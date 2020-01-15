import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

moment().format('nl');   
export default class CustomCron extends Component {
    constructor(props) {
        super(props);
        const startDate = this.getStartDate(props);
        this.state = { startDate };
        this.onDayChange = this.onDayChange.bind(this);
        this.onAtHourChange = this.onAtHourChange.bind(this);
        this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
        this.getHours = this.getHours.bind(this);
        this.getMinutes = this.getMinutes.bind(this);
    }
    getStartDate(props) {
        // load cron pattern:
        // if (props.value && props.value.length) {
        //     return new Date(`${props.value[4]}/${props.value[3]}/${props.value[6]}`)
        // }
        return new Date().toLocaleDateString();
    }
    componentWillMount() {
        this.setState({'value' : this.props.value});
    }
    onDayChange(date) {
        
        let val = [...this.state.value];
        val[3] = String(Number(date.format("DD")));
        val[4] = String(Number(date.format("MM")));

        this.setState({
            value: val,
            startDate: date.format("DD/MM/YYYY")
        });
        this.props.onChange(val)
    }
    onAtHourChange(e) {
        let val = this.state.value;
        val[2] = `${e.target.value}`;
        this.props.onChange(val)
    }
    onAtMinuteChange(e) {
        let val = this.state.value;
        val[1] = `${e.target.value}`;
        this.props.onChange(val)
    }
    render() {
        return (<div className="tab-pane" >
                    <div className="well well-small">
                        &nbsp; In: &nbsp;
                        <DatePicker selected={moment()} value={this.state.startDate}
                                       onChange={this.onDayChange} minDate={moment()} />
                    </div>
                    
                    &nbsp; At: &nbsp;
                    <select id="DailyHours" className="hours" onChange={this.onAtHourChange} value={this.state.value[2]}>
                        {this.getHours()}                    
                    </select>
                    &nbsp; : &nbsp;
                    <select id="DailyMinutes" className="minutes"  onChange={this.onAtMinuteChange} value={this.state.value[1]}>
                        {this.getMinutes()}
                    </select>
                </div>)
    }
    getHours() {
        let hours = [];
        let leap = parseInt(this.props.hours) || 1;
        let startHour = this.isToday() ? this.getNextHour() : 0;
        for(let i = startHour ; i<24 ; i = i + leap) {
            hours.push(<option key={i} id={i} value={i < 10 ? `0${i}` : i}>{i < 10 ? `0${i}` : i}</option>)
        }
        return hours;
    }
    isToday() {

        if ( !!!this.state.startDate) {

            console.log('Invalid start date ', this.state.startDate);
            return false;
        }
        const today = moment().format('DD/MM/YYYY');

        return today === this.state.startDate;
    }
    getNextHour() {
        const hourNow = Number(moment().format('hh'));
        return (hourNow < 23) ? hourNow + 1 : 23;
    }
    getMinutes() {
        let minutes = [];
        let leap = parseInt(this.props.minutes) || 1;
        for(let i = 0 ; i<60 ; i = i + leap) {
            minutes.push(<option key={i} id={i} value={i < 10 ? `0${i}` : i}>{i < 10 ? `0${i}` : i}</option>)
        }
        return minutes;
    }
}