import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import { InterUser, GetUserByDcId, UserEmbed } from "../apiHandler/user";
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
        await GetUserByDcId(interaction.user.id)
            .then((res) => {
                interaction.reply({
                    embeds: [UserEmbed(res)],
                });
            })
            .catch((err) => {
                console.log(err);
                interaction.reply({
                    content: "An error occured while fetching user data",
                });
            });
    }
}
