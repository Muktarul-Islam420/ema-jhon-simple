import React, { useState } from 'react';
import { useEffect } from 'react';
import {getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import CartItem from '../CartItem/CartItem';
import Cart from '../Cart/Cart';
import funnyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';
const Review = () => {
    const[cart,setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);
    const history = useHistory()
    const handleProceedCheckOut = () => {
       history.push('/shipment');
    }

    const removeProduct = (productKey) => {
        // console.log('clicked me',productKey)
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
 
 
    useEffect(() => {
            //Cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map( key => {
           const product = fakeData.find(pd => pd.key === key);
           product.quantity = savedCart[key];
           return product;
        })
       setCart(cartProducts);
    }, []);

    let OrderFeedback;
    if(orderPlaced){
        OrderFeedback  = <img src={funnyImage} alt=""/>
    }
   
    return (
        <div className="shop-container">
            <div className="product-container">
            {
                cart.map(pd => <CartItem product={pd}
                removeProduct ={removeProduct}
                key={pd.key}
                ></CartItem>)
            }
            {
                OrderFeedback
            }
            </div>
            
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className = "main-button"
                    onClick={handleProceedCheckOut}
                    >Proceed CheckOut</button>
                </Cart>
            </div>
           
        </div>
    );
};

export default Review;