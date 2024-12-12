import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import { Command, CustomClient } from "../classes";
import { Category } from "../enums";
import { GetRandomCard } from "../apiHandler/userCard"
import { GetUserByDcId } from "../apiHandler/user";

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

    execute = (interaction: ChatInputCommandInteraction) => {
        var cardNumber = Math.random() * 5;
        GetUserByDcId(interaction.user.id).then(data=>{
            GetRandomCard(data?.id!).then(data => {
                interaction.reply({
                    content: `nice \n ${data?.title}`,
                    ephemeral: true,
                });
            });
        });
    }
}