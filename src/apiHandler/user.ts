import { EmbedBuilder } from "discord.js";
import { GetCardById } from "./card";

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

export interface InterUserCard {
    user_id: number;
    card_id: number;
    own_amount: number;
}

export const GetUserByDcId = async (
    dcId: string,
): Promise<InterGetUser | null> => {
    const req = new Request("http://localhost:5000/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await fetch(req)
        .then((res) => res.json())
        .then((res) =>
            res.status === 200 && res.data && res.data.length != 0
                ? (res.data.find(
                      (user: any) => user.discord_id === dcId,
                  ) as InterGetUser)
                : null,
        )
        .catch((err) => {
            console.error(err);
            return null;
        });
};

export const PostUser = async (user: InterPostUser): Promise<Error | null> => {
    const req = new Request("http://localhost:5000/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    return await fetch(req)
        .then((res) => res.json())
        .then((res) => {
            if (res.status == 200) return null;
            else if (res.status == 424) return new Error(res.message);
            else throw new Error(res.message);
        })
        .catch((err) => {
            console.error(err);
            return new Error("Request failed");
        });
};
