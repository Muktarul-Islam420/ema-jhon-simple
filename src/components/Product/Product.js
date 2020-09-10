import React from 'react';
import css from './Product.css'
import { Link } from 'react-router-dom';
const Product = (props) => {
    //console.log(props.product);
    const {img,name,seller,price,stock,key} = props.product;
    return (
        <div className ="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div></div>
            <h3> 
                <h4 className = "product-name"><Link to={"/product/"+key}>{name}</Link> </h4>
                <br/>
                <p><small>by:{seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock -Order soon</small></p>
                {props.showAddToCart && <button className = "main-button"
                 onClick={() => props.handleAddProduct(props.product)}
                > 🛒 add to cart </button>}
            </h3>
           
        </div>
    );
};

export default Product;