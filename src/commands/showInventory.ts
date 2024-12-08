import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import { InterUser, GetUserByDcId } from "../apiHandler/user";
import { GetCardById } from "../apiHandler/card";
import { Command, CustomClient } from "../classes";
import { Category } from "../enums";

export default class ShowInventory extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "showinventory",
            description: "Show inventory command",
            category: Category.CardGame,
            defualtMemberPermission:
                PermissionsBitField.Flags.UseApplicationCommands,
            dmPremission: false,
            cooldown: 3,
            options: [],
        });
    }

    async execute(interaction: ChatInputCommandInteraction) {
        console.log(interaction.user.id);
        const user = (await GetUserByDcId(
            interaction.user.id.toString(),
        )) as InterUser;
        if (!user) {
            return interaction.reply({
                content: "User not found",
                ephemeral: true,
            });
        } else if (user.cards.length === 0) {
            return interaction.reply({
                content: "User has no cards",
                ephemeral: true,
            });
        } else {
            console.log(user.cards);
            for (const card of user.cards) {
                const cardData = await GetCardById(card.card_id);
                console.log(cardData);
            }
            return interaction.reply({
                content: "User has cards",
                ephemeral: true,
            });
        }
    }
}
