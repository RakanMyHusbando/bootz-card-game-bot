export interface InterApiRespons {
    status: number;
    data: any[] | null;
    message: string;
}

/* ------------------------- Card ------------------------- */

export interface InterCard {
    id: number;
    title: string;
    description: string;
    type: string;
    rarity: number;
    attack: number;
    defense: number;
    health: number;
}

/* ------------------------- User ------------------------- */

export interface InterGetUser {
    id: number;
    name: string;
    discord_id: string;
    unknown_card_amount: number;
    cards: InterUserCard[];
}

export interface InterPostUser {
    name: string;
    discord_id: string;
}

/* ------------------------- User-Card ------------------------- */

export interface InterUserCard {
    user_id: number;
    card_id: number;
    own_amount: number;
}
