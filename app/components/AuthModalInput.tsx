import React from 'react'


interface Props{
    inputs:{
    firstName:string,
    lastName:string,
    email:string,
    phone:string,
    city:string,
    password:string 
    };
    handleChangeInput:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    isSign:boolean

}

const AuthModalInput = ({inputs,handleChangeInput,isSign}:Props) => {
  return (
    <div>
   {isSign? null:  <div className="my-3 flex justify-between text-sm">
        <input type="text" placeholder='First Name' value={inputs.firstName}
        name='firstName'
       onChange={handleChangeInput}
         className="border rounded p-2 py-3 w-[49%]" />
        <input type="text" placeholder='Last Name' value={inputs.lastName} 
          name='lastName'
          onChange={handleChangeInput}
        className="border rounded p-2 py-3 w-[49%]" />
      </div>}
      <div className="my-3 flex justify-between text-sm">
      <input type="text" placeholder='Email' value={inputs.email} 
        name='email'
        onChange={handleChangeInput}
      className="border rounded p-2 py-3 w-full" />
      </div>
      {isSign? null:   <div className="my-3 flex justify-between text-sm">
        <input type="text" placeholder='Phone' value={inputs.phone}
          name='phone'
          onChange={handleChangeInput}
         className="border rounded p-2 py-3 w-[49%]" />
        <input type="text" placeholder='City' value={inputs.city} 
          name='city'
          onChange={handleChangeInput}
        className="border rounded p-2 py-3 w-[49%]" />
      </div> }
      <div className="my-3 flex justify-between text-sm">
      <input type="password" placeholder='Password'
        name='password'
        onChange={handleChangeInput}
       value={inputs.password} className="border rounded p-2 py-3 w-full" />
      </div>
    </div>
  )
}

export default AuthModalInput
