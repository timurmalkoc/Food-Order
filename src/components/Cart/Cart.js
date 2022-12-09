import { useContext, useState } from 'react';

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id =>{
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount:1});
  };

  const cartItems = cartCtx.items.map(
    (item) => 
    <CartItem 
      key={item.id} 
      name={item.name} 
      amount={item.amount} 
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
      />
  );

  const modalActions = 
    <div className={classes.actions}>
      <button onClick={props.onHideCart} className={classes['button--alt']}>Close</button>
      {hasItem && <button className={classes.button} onClick={()=> setIsCheckout(true)}>Order</button>}
    </div>

  return (
    <Modal onClose={props.onHideCart}>
        <ul className={classes['cart-items']}>
            {cartItems}
        </ul>
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onCancel={props.onHideCart}/>}
        {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
