import React, { useContext, useState } from 'react';

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id =>{
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount:1});
  };

  const submitOrderHandler = async userData =>{
    setIsSubmitting(true);
    const response = await fetch('https://food-order-df58c-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        ordered: cartCtx.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
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
      {cartCtx.items.length>0 && <button onClick={()=>cartCtx.clearCart()} className={classes['button--alt']}>Clear</button> }
      <button onClick={props.onHideCart} className={classes['button--alt']}>Close</button> 
      {hasItem && <button className={classes.button} onClick={()=> setIsCheckout(true)}>Order</button>}
    </div>

  const modalContent = 
    <React.Fragment>
      <ul className={classes['cart-items']}>
        {!isCheckout && cartItems}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onBack={()=> {setIsCheckout(false)}} onConfirm={submitOrderHandler} onCancel={props.onHideCart}/>}
      {!isCheckout && modalActions}
    </React.Fragment>

  const submittingOrderedData = <p>Sending order data...</p>
  const didSubmitOrder = 
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes.button}>Close</button>
      </div>
    </React.Fragment>

  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && submittingOrderedData}
      {!isSubmitting && didSubmit && didSubmitOrder}
    </Modal>
  );
};

export default Cart;
