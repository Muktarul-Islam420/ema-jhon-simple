import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useContext } from 'react';
import { UserContext } from '../../App';
const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
  const onSubmit = data => {
      console.log('form submitted',data);
    }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
 
    <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
  
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Enter your Name"/>
      {errors.name && <span className="error">Name is required</span>}

      <input name="email"  defaultValue={loggedInUser.email}  ref={register({ required: true })}placeholder="Enter your email"/> 
      {errors.email && <span className="error">Email is required</span>}

      <input name="phone" ref={register({ required: true })} placeholder="Enter your mobile number"/>
      {errors.phone && <span className="error">Mobile number is required</span>}
      
      <input name="address" ref={register({ required: true })} placeholder="Enter your address"/>
      {errors.address && <span className="error">Address is required</span>}


      <input type="submit" />
    </form>
  );
};

export default Shipment;