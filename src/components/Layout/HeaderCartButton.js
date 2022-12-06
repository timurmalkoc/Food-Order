import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = props => {
    const [btnHighlighted, setBtnHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);

    const {items} = cartCtx;
    const numberOfCartItems = items.reduce((curNum, item) => {
        return curNum + item.amount;
    }, 0);

    // add button effect
    const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0){
            return;
        }       
        setBtnHighlighted(true);

        const timer = setTimeout(() => {
            setBtnHighlighted(false);
        }, 300)
        // 300 ms is the length of the animation

        // since the item is not demounted not necessary but good practice to clear it
        return () => {
            clearTimeout(timer);
        }
    }, [items])

return <button className={btnClasses} onClick={props.onClick}>
    <span className={classes.icon}><CartIcon /></span>
    <span>Your Cart</span>
    <span className={classes.badge}>{numberOfCartItems}</span>

</button>
};

export default HeaderCartButton;