import { EmbedBuilder } from "discord.js";

export interface InterUser {
    id: number | number | undefined;
    name: string;
    discord_id: string;
    cards: InterUserCard[] | undefined;
}

export interface InterUserCard {
    user_id: number;
    card_id: number;
    own_amount: number;
}

export const GetUserByDcId = async (dcId: string): Promise<InterUser> => {
    const reqAllUser = new Request("http://localhost:5000/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await fetch(reqAllUser)
        .then((res) => res.json())
        .then((res) => res.data)
        .then((res) => res.find((user: any) => user.discord_id === dcId))
        .then((res) => res as InterUser);
};

export const UserEmbed = (user: InterUser): EmbedBuilder => {
    const embed = new EmbedBuilder()
        .setTitle(user.name)
        .setDescription("User inventory")
        .setColor("#0099ff")
        .setFields(
            {
                name: "Card",
                value: "\u200B",
                inline: true,
            },
            {
                name: "\u200B",
                value: "\u200B",
                inline: true,
            },
            {
                name: "Owned",
                value: "\u200B",
                inline: true,
            },
        );

    user.cards?.forEach((card: InterUserCard) => {
        embed.addFields(
            {
                name: "\u200B",
                value: card.card_id.toString(),
                inline: true,
            },
            {
                name: "\u200B",
                value: "\u200B",
                inline: true,
            },
            {
                name: "\u200B",
                value: card.own_amount.toString(),
                inline: true,
            },
        );
    });

    return embed;
};
