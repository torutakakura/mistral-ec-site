export type productType = {
    id: number;
    name: string;
    apeal: string;
    image: string;
    price: number;
    description: string;
    color_id: number | null;
    flower_id: number | null;
    using_id: number | null;
    is_recommended: boolean | null;
    for_restaurant: boolean | null;
    for_present: boolean | null;
}

export type CartItem = productType & { quantity: number };