import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import { Command, CustomClient } from "../classes";
import { Category } from "../enums";
import { InterPostUser, PostUser } from "../apiHandler/user";

export default class register extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "register",
            description: "register user to card-game",
            category: Category.Ultility,
            defualtMemberPermission:
                PermissionsBitField.Flags.UseApplicationCommands,
            dmPremission: false,
            cooldown: 10,
            options: [],
        });
    }
    async execute(interaction: ChatInputCommandInteraction) {
        const user: InterPostUser = {
            name: interaction.user.displayName,
            discord_id: interaction.user.id,
        };
        const content: string = await PostUser(user)
            .then(() => "Successfully added new user")
            .catch((err: Error) => err.message);
        interaction.reply({
            content: content,
            ephemeral: true,
        });
    }
}
