import { EmbedBuilder } from "discord.js";
import { GetCardById } from "./card";

export interface InterUser {
    id: number;
    name: string;
    discord_id: string;
    cards: InterUserCard[];
}

export interface InterUserCard {
    user_id: number;
    card_id: number;
    own_amount: number;
}

export const GetUserByDcId = async (
    dcId: string,
): Promise<InterUser | null> => {
    const reqAllUser = new Request("http://localhost:5000/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await fetch(reqAllUser)
        .then((res) => res.json())

        .then((res) =>
            res.status === 200 && res.data && res.data.length != 0
                ? (res.data.find(
                      (user: any) => user.discord_id === dcId,
                  ) as InterUser)
                : null,
        )
        .catch((err) => {
            console.error(err);
            return null;
        });
};

export const UserEmbed = async (
    user: InterUser,
): Promise<EmbedBuilder | null> => {
    const userEmbed = new EmbedBuilder()
        .setTitle("User Inventory")
        .setColor("#FF0000")
        .addFields(
            { name: "Card", value: "\u200B", inline: true },
            { name: "Type", value: "\u200B", inline: true },
            { name: "Amount", value: "\u200B", inline: true },
        );
    try {
        for (const card of user.cards) {
            await GetCardById(card.card_id).then((res) => {
                if (res?.title != undefined && res?.type != undefined)
                    userEmbed.setFields(
                        {
                            name: "\u200B",
                            value: res.title,
                            inline: true,
                        },
                        {
                            name: "\u200B",
                            value: res.type,
                            inline: true,
                        },
                        {
                            name: "\u200B",
                            value: card.own_amount.toString(),
                            inline: true,
                        },
                    );
            });
        }
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        return userEmbed;
    }
};
