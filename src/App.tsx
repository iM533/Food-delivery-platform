import './App.css'
import {useEffect, useState} from "react";
import {createClient} from "@supabase/supabase-js";
import type {Database, Tables} from "./types/database.types.ts";
import Restaurant from './components/Restaurant.tsx'
import Navbar from "./components/Navbar.tsx";

type Restaurant = Tables<'restaurants'>;
const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)

function App() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    useEffect(() => {
        void getRestaurants()
    }, []);

    async function getRestaurants(){
        const {data, error} = await supabase.from('restaurants').select()
        if(error){
            return
        }
        setRestaurants(data)
    }

    function getRestaurantImages(slug: string): string{
        if(typeof slug == null){
            throw new Error('No image')
        }
        const {data} = supabase.storage.from('delivery-platform-images').getPublicUrl('restaurants/' + slug + '.png');

        console.log(data.publicUrl)
        return data.publicUrl;
    }

  return (
    <>
        <Navbar></Navbar>
        <div className="content">
            <h1>Show all restaurants</h1>

            <div className="restaurant-row">
                {restaurants.map(e =><Restaurant
                    key={e.id}
                    img={() => getRestaurantImages(e.slug)}
                    title={e.name!}
                    deliveryPrice={e.delivery_price!}
                    deliveryTime={e.delivery_time!}
                />)}
            </div>
        </div>




    </>
  )
}

export default App
