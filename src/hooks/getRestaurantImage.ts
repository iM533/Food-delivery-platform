import {supabase} from "../api/supabase.ts";

export default function getRestaurantImage(slug: string): string{

    const {data} = supabase.storage.from('delivery-platform-images').getPublicUrl('restaurants/' + slug + '.png');

    return data.publicUrl;
}