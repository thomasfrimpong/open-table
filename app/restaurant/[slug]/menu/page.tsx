

import RestaurantNavbar from '../components/RestaurantNavbar'


import Menu from '../components/Menu'
import { PrismaClient } from '@prisma/client'
//import Navbar from '@/app/components/navbar'

const prisma=new PrismaClient();

const fetchItemsMenu = async (slug:string)=> {



const restaurant =await prisma.restaurant.findUnique({
where:{
  slug
},
select:{
  items:true
}
})

if(!restaurant){
  throw new Error()
  }
  return restaurant.items

}

const RestaurantMenuPage =async ({params}:{params:{slug:string}}) => {
  const menu=await fetchItemsMenu(params.slug)
  console.log(menu)
  return (
  <>
   
      <div className="bg-white w-[100%] rounded p-3 shadow">
        
       <RestaurantNavbar slug={params.slug} />
       
       <Menu menu={menu} />
       
      </div>
    
    
    </>
  )
}

export default RestaurantMenuPage
