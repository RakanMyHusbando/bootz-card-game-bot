import {
    ChatInputCommandInteraction,
    Events,
    InteractionReplyOptions,
} from "discord.js";
import { Command, CustomClient, Event } from "../../classes";
import errors from "../../errors.json";

interface InterErrors {
    name: string;
    error: InteractionReplyOptions;
}

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
                    ) as InterErrors;
                    interaction.reply(err.error);
                }
            });
        }, 5000);
    }
}
