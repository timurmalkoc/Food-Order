import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {

    return <div className={classes.input}>
        <label htmlFor={props.input.id} >{props.label}</label>
        <input ref={ref} {...props.input}/>
        {/* key - pair pretty configurable from outsite of the component */}
    </div>
});

export default Input;