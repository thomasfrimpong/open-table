

import Header from './components/Header'
import SearchSidebar from './components/SearchSidebar'
import RestaurantCard from './components/RestaurantCard'
import { PRICE, PrismaClient, Review } from '@prisma/client'

interface SearchParams { city?:string,cuisine?:string,price?:PRICE ,reviews:Review[]}

const select={
  id:true,
  name:true,
  main_image:true,
  price:true,
  cuisine:true,
  location:true,
  slug:true,
  reviews:true
  
}

const prisma=new PrismaClient();

const fetchLocations=async ()=>{
  const locations=await prisma.location.findMany()
  return locations;
}
const fetchCuisines=async()=>{
const cuisines=await prisma.cuisine.findMany();
return cuisines;
}

const fetchRestaurantByCity= (searchParams: SearchParams)=>{
 
  const where:any ={};
  if(searchParams.city){
   const location={
      name:{
        equals:searchParams.city.toLowerCase()
      }
      
    }
    where.location=location
    
  } 

  if(searchParams.cuisine){
    const cuisine={
       name:{
         equals:searchParams.cuisine.toLowerCase()
       }
       
     }
     where.cuisine=cuisine;
     
   } 

   if(searchParams.price){
    const price={
       price:{
         equals:searchParams.price
       }
       
     }
     where.price=price;
     
   }

  return prisma.restaurant.findMany({
    where,select
  })
  
}


const SearchPage=async (searchParams: SearchParams) => {
 
  const restaurants=await fetchRestaurantByCity(searchParams)
  const location=await fetchLocations();
  const cuisine=await fetchCuisines();
    console.log(cuisine);
  return (
    
   
   <>
    <Header />
    
     <div className="flex py-4 m-auto w-2/3 justify-between items-start">
    
 <SearchSidebar locations={location} cuisines={cuisine} searchParams={searchParams} />
      
    
    
    
     
      <div className="w-5/6">
       {
      

restaurants.length? 
<>
{restaurants.map(restaurant=>(
<RestaurantCard restaurant={restaurant} key={restaurant.id}/> 
))}
</>
:
<p>Sorry we found no restaurants in this area.</p>  
       
       }
       
       
      </div>
    </div>
    </>
   
 
  )
}

export default SearchPage





