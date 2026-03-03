import './App.css'
import type {Tables} from "./types/database.types.ts";
import Restaurant from './components/Restaurant.tsx'
import {useSuspenseQuery} from "@tanstack/react-query";
import {supabase} from "./api/supabase.ts";

type Restaurant = Tables<'restaurants'>;
type Data = {
    data: Restaurant[]
}


function App() {

    const {data: restaurants}:Data = useSuspenseQuery({
        queryKey: ['restaurants'],
        queryFn: async () => {
            const {data} = await supabase.from('restaurants').select()
            return data
        }
    })


    function getRestaurantImages(slug: string): string{
        if(typeof slug == null){
            throw new Error('No image')
        }
        const {data} = supabase.storage.from('delivery-platform-images').getPublicUrl('restaurants/' + slug + '.png');

        return data.publicUrl;
    }

  return (
    <>
        <div className="content">
            <h1>Show all restaurants</h1>

            <div className="restaurant-row">
                {restaurants.map(e =><Restaurant
                    key={e.id}
                    img={() => getRestaurantImages(e.slug)}
                    title={e.name!}
                    deliveryPrice={e.delivery_price!}
                    deliveryTime={e.delivery_time!}
                    id={e.id}
                    slug={e.slug}
                />)}
            </div>
        </div>




    </>
  )
}

export default App
