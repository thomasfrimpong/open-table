import Link from 'next/link'
import React from 'react'
import LoginModal from './LoginModal'

const Navbar = () => {
  return (
    
     <nav className="bg-white p-2 flex justify-between">
     <Link href="/" className="font-bold text-gray-700 text-2xl"> OpenTable </Link>
     <div>
       <div className="flex">
         
         <LoginModal isSign={true} />
         {/* <button className="border p-1 px-4 rounded">Sign up</button> */}
         <LoginModal isSign={false} />
       </div>
     </div>
   </nav>
 
  )
}

export default Navbar
