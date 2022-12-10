import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isNotEmpty = (value) => value.trim() !== '';
const isFiveCharaters = (value) => value.trim().length === 5;

const Checkout = props =>{
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (e) => {
        e.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        // Form Validation ------

        const enteredNameValid = isNotEmpty(enteredName);
        const enteredStreetValid = isNotEmpty(enteredStreet);
        const enteredCityValid = isNotEmpty(enteredCity);
        const enteredPostalValid = isFiveCharaters(enteredPostal);
        console.log(enteredPostal);

        setFormInputValidity({
            name: enteredNameValid,
            street: enteredStreetValid,
            postal: enteredPostalValid,
            city: enteredCityValid
        });

        const formIsValid = enteredCityValid && enteredNameValid && enteredPostalValid && enteredStreetValid;

        if (!formIsValid){
            return;
        }

        // submitting data ----

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal
        })
        
    };

    return <form className={classes.form} onSubmit={confirmHandler}>
        <div className={`${classes.control} ${formInputValidity.name ? '' : classes.invalid}`}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name'  ref={nameInputRef}/>
            {!formInputValidity.name && <p>Please enter a valid name!</p>}
        </div>
        <div className={`${classes.control} ${formInputValidity.street ? '' : classes.invalid}`}>
            <label htmlFor=''>Street</label>
            <input type='text' id='street' ref={streetInputRef}/>
            {!formInputValidity.street && <p>Please enter a valid street!</p>}
        </div>
        <div className={`${classes.control} ${formInputValidity.postal ? '' : classes.invalid}`}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' ref={postalInputRef}/>
            {!formInputValidity.postal && <p>Please enter a valid postal code!</p>}
        </div>
        <div className={`${classes.control} ${formInputValidity.city ? '' : classes.invalid}`}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef}/>
            {!formInputValidity.city && <p>Please enter a valid city!</p>}
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button type='button' onClick={props.onBack}>Back</button>
            <button className={classes.submit}>Confirm</button>
        </div>
    </form>
}

export default Checkout;