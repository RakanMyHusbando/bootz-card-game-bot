import { EmbedBuilder } from "discord.js";
import { GetCardById } from "./card";

export interface InterUser {
    id: number;
    name: string;
    discord_id: string;
    unknown_card_amount: number;
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
    try {
        const unknownCardField = {
            name: "Unknown Card",
            value: user.unknown_card_amount.toString(),
            inline: false,
        };
        const nameField = { name: "Name", value: "", inline: true };
        const typeField = { name: "Type", value: "", inline: true };
        const amountField = { name: "Amount", value: "", inline: true };

        for (const card of user.cards) {
            await GetCardById(card.card_id).then((res) => {
                if (res?.title != undefined && res?.type != undefined) {
                    nameField.value += res.title + "\n";
                    typeField.value += res.type + "\n";
                    amountField.value += card.own_amount.toString() + "\n";
                }
            });
        }

        return new EmbedBuilder()
            .setTitle("User Inventory")
            .setColor("#FF00FF")
            .addFields(unknownCardField, nameField, typeField, amountField);
    } catch (err) {
        console.error(err);
        return null;
    }
};
