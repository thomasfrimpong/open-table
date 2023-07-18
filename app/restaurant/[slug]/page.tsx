
import Header from './components/Header'

import Title from './components/Title'
import Rating from './components/Rating'
import Description from './components/Description'
import Images from './components/Images'
import Reviews from './components/Reviews'
import ReservationCard from './components/ReservationCard'
import RestaurantNavbar from './components/RestaurantNavbar'
import { PrismaClient, Review } from '@prisma/client'
import { notFound } from 'next/navigation'

interface RestaurantType{
  id:number,
  name:string,
  images:string[],
  description:string,
  slug:string,
  reviews:Review[]
}

const prisma=new PrismaClient();

const fetchRestaurantBySlug=async (slug:string):Promise<RestaurantType>=>{
const restaurant=await prisma.restaurant.findUnique({
  where:{
    slug
  },
  
    select:{
      id:true,
      name:true,
      images:true,
      description:true,
      slug:true,
     reviews:true
    }
  
});
if(!restaurant){
  //throw new Error("Cannot find restaurant")
  notFound();
}
return restaurant;
}

const  RestaurantDetailsPage =async ({params}:{params:{slug:string}}) => {

 const restaurant=await fetchRestaurantBySlug(params.slug)
 //console.log(restaurant)
  return (
  
 <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
       
        <RestaurantNavbar slug={restaurant.slug} />
       
        <Title name={restaurant.name}/>
        <Rating reviews={restaurant.reviews} />
       
        <Description description={restaurant.description} />
       
        <Images images={restaurant.images} />
       
        <div>
          <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
            What 100 people are saying
          </h1>
          <div>
           
            <Reviews reviews={restaurant.reviews} />
        
          </div>
        </div>
       
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    
    </>
  

  )
}

export default RestaurantDetailsPage

