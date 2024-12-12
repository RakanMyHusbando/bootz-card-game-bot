import {
    ChatInputCommandInteraction,
    Events,
    InteractionReplyOptions,
} from "discord.js";
import { CustomClient, Event } from "../../classes";
import errors from "../../errors.json";

export default class ErrorHandler extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.InteractionCreate,
            description: "slash command error handler",
            once: false,
        });
    }

    async execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.isCommand()) return;
        setTimeout(async () => {
            await interaction.fetchReply().then((res) => {
                if (!res) {
                    const err = errors.find(
                        (elem) => elem.name == interaction.commandName,
                    );
                    interaction.reply({
                        content: err?.error.content,
                        ephemeral: err?.error.ephermal,
                    });
                }
            });
        }, 3000);
    }
}
