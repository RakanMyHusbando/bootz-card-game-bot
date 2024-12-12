import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import {GetUserByDcId } from "../apiHandler/user";
import { InterGetUser } from "../apiHandler/interfaces"
import { UserEmbed } from "../utils";
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
        const user = (await GetUserByDcId(interaction.user.id)) as InterGetUser;
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
            const userEmbed = await UserEmbed(user);
            if (userEmbed) {
                return interaction.reply({
                    embeds: [userEmbed],
                    ephemeral: true,
                });
            } else {
                return interaction.reply({
                    content: "Cant build user embed",
                    ephemeral: true,
                });
            }
        }
    }
}
