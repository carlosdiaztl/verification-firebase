import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { actionAuthenticationSync, actionUserCreateAsync } from '../redux/actions/userActions';

const CreateAccount = () => {
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const {uid}=useParams()
  const {
    register,
    handleSubmit,
   
  } = useForm()
  const onSubmit=(data)=>{
console.log(data);
dispatch(actionUserCreateAsync(data))
dispatch(actionAuthenticationSync())
navigate("/home")



  }
  return (
    <div>CreateAccount 
    <form onSubmit={handleSubmit(onSubmit)}> 
    <input type="text" placeholder='name' {...register('name')} /> 
    <input type="email" placeholder='email' {...register('email')} /> 
    <input type="password" placeholder='password' {...register('password')} /> 
    <button type='submit'> Crear cuenta </button>
    </form>
    <span> {uid} </span>
    </div>
  )
}

export default CreateAccount