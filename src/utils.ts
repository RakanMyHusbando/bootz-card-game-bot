import { InterGetUser } from "./apiHandler/interfaces";
import { EmbedBuilder } from "discord.js";
import { GetCardById } from "./apiHandler/card";

export const UserEmbed = async (
    user: InterGetUser,
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
