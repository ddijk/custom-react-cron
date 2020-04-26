import React, { Component } from 'react';


export default class CustomCron extends Component {
    
    onChange(e) {
        if((e.target.value > 0 && e.target.value < 60) || e.target.value === '') {
            let val = ['0','*','*','*','*','?','*']
            
            if(e.target.value == '') {
                val[1] = '';
            } else {
                val[1] = `0/${e.target.value}`;
            }
            this.props.onChange(val)
        } 
    }
    render() {
        const val = this.props.value? this.props.value[1].split('/')[1]: 1;
        return (<div className="well">   
               Every <input type="Number" onChange={this.onChange.bind(this)} value={val} min={1} max={60}/> minute(s)'
        </div>)
    }
}
