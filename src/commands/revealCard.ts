import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import { Command, CustomClient } from "../classes";
import { Category } from "../enums";
import { GetCardById, GetRandomCard } from "../apiHandler/card"

export default class reveal extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "reveal",
            description: "Pulls a random card from the deck",
            category: Category.Ultility,
            defualtMemberPermission:
                PermissionsBitField.Flags.UseApplicationCommands,
            dmPremission: false,
            cooldown: 3,
            options: [],
        });
    }

    execute = async (interaction: ChatInputCommandInteraction) => {
        var cardNumber = Math.random() * 5;
        await GetRandomCard().then(card => {
            interaction.reply({
                content: `nice \n ${JSON.stringify(card?.title)}`,
                ephemeral: true,
            });
        });
    }
}