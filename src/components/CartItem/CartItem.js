import React from 'react';
import './CartItem.css'
const CartItem = (props) => {
    console.log(props);
    const {name,quantity,img,key,price} = props.product;
    return (
        <div className="remove-items">
            <h4 className="product-name">{name}</h4>
            <img src={img} alt=""/>
            <h5 className="quantity">Quantity: {quantity}</h5>
            <p><small>{price}</small></p>
            <br/>
            <button className = "main-button"
            onClick={() => props.removeProduct(key)}
            >Remove item</button> 
        </div>
    );
};

export default CartItem;