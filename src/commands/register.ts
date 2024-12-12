import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import { Command, CustomClient } from "../classes";
import { Category } from "../enums";
import { InterPostUser } from "../apiHandler/interfaces";
import { PostUser} from "../apiHandler/user"

export default class register extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "register",
            description: "register user to card-game",
            category: Category.Ultility,
            defualtMemberPermission:
                PermissionsBitField.Flags.UseApplicationCommands,
            dmPremission: false,
            cooldown: 2,
            options: [],
        });
    }
    async execute(interaction: ChatInputCommandInteraction) {
        const user: InterPostUser = {
            name: interaction.user.displayName,
            discord_id: interaction.user.id,
        };
        await PostUser(user).then((res) =>
            interaction.reply({ content: res, ephemeral: true }),
        );
    }
}
