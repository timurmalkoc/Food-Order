import classes from './Input.module.css';

const Input = props => {

    return <div className={classes.input}>
        <label htmlFor={props.input.id} >{props.label}</label>
        <input {...props.input}/>
        {/* key - pair configurable outsite of the component */}
    </div>
};

export default Input;