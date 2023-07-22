"use client"
import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, cartTotal, clearCart, decreaseCart, removeFromCart } from '@/features/cart/cartSlice';
import Link from "next/link";
import Image from 'next/image';

function Cartscreen() {
    const cart = useSelector((state)=>state.cart)
    const dispatch = useDispatch()
    const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartItemsFromLocalStorage = localStorage.getItem("cartItems");
    if (cartItemsFromLocalStorage !== null) {
      setCartItems(JSON.parse(cartItemsFromLocalStorage));
    }
  }, []);



    useEffect(()=>{
      dispatch(cartTotal())
    },[cart, dispatch])
    
    function handleRemoveFromCart(cartItem){
    dispatch(removeFromCart(cartItem))
  }

  function handleDecreaseCart(cartItem){
    dispatch(decreaseCart(cartItem))
  }
  function handleIncreaseCart(cartItem){
    dispatch(addToCart(cartItem))
    
  }
  function handleClearCart(){
  dispatch(clearCart())}
  return (
    <>
    <div className='container-fluid'>
      {cart.cartItems.length===0?(<div>
        <h1>Cart is empty.</h1>
      </div>):(<>
        <table className="table mt-4" >
  <thead>
    <tr>
      <th scope="col">Products</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">Total </th>
    </tr>
  </thead>
      {cart.cartItems?.map(cartItem=>(<tbody key={cartItem.id}>
      
  
    <tr>
      <th scope="row"><h3>{cartItem.title}</h3>
      <button className='btn btn-sm btn-danger mt-2 mb-1 mr-1' onClick={()=>handleRemoveFromCart(cartItem)}>Remove</button>
      <Image height="150" width="150" src={cartItem.image} alt={cartItem.title}  priority/>
     </th>
      <td> Rs. {cartItem.price} </td>
      <td>
        <button className='btn btn-sm btn-primary' onClick={()=>handleDecreaseCart(cartItem)}>-</button>{cartItem.cartQuantity}<button className="btn btn-sm btn-primary" onClick={()=>handleIncreaseCart(cartItem)}>+</button></td>
      <td>Rs. {cartItem.price*cartItem.cartQuantity}</td>
    </tr>
  

      </tbody>
        
      )) }
      </table>
      </>

      )}
      <div className='row mt-4'>
      <div className='col-md-6'> <button className='btn btn-primary' onClick={()=>handleClearCart()} >Clear Cart</button></div>
      <div className='col-md-6'><Link href="/"> <button className='btn btn-success'>Shop now</button></Link></div>
       </div>
      </div>
    </>
  )
}

export default Cartscreen
