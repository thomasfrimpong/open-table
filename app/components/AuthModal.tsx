'use client'
import {useState} from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import AuthModalInput from './AuthModalInput';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4,
};

export default function AuthModal({isSign}:{isSign:boolean}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
   setInputs({
    ...inputs,
    [e.target.name]:e.target.value
   })
  }
  const renderContent=(signInContent:string,signUpContent:string)=>{
    return isSign ? signInContent:signUpContent;
  }

  const [inputs,setInputs]=useState({
  firstName:"",
  lastName:"",
  email:"",
  phone:"",
  city:"",
  password:""  
  })

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <button  onClick={handleOpen}
           className= {`${renderContent("bg-blue-400 text-white","")} border p-1 px-4 rounded mr-3`}
         >
             {renderContent("Sign in","Sign up")}
         </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       
        <Box sx={style}>
          <div className="p-2 h-[500px]">
          <div className="uppercase font-bold text-center pb-2 border-b mb-2">
            <p className="text sm">
              {renderContent("Sign In","Create User")}
            </p>
          </div>
          <div className="m-auto">
            <h2 className="text-2xl font-light text-center">
            {renderContent("Log Into Your Account","Create Your Open Table Account")}
            </h2>
            <AuthModalInput inputs={inputs}  handleChangeInput={handleChangeInput } isSign={isSign}/>
            <button className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400'>
            {renderContent("Sign In","Create Account")}
            </button>
          
          </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}