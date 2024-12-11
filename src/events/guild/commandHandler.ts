import {
    ChatInputCommandInteraction,
    Collection,
    Embed,
    EmbedBuilder,
    Events,
    time,
} from "discord.js";
import { Command, CustomClient, Event } from "../../classes";

export default class CommandHandler extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.InteractionCreate,
            description: "Command handler event",
            once: false,
        });
    }

    execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.isCommand()) return;

        const command: Command = this.client.commands.get(
            interaction.commandName,
        )!;

        if (!command) {
            this.client.commands.delete(interaction.commandName);
            return interaction.reply({
                content: "Command not found",
                ephemeral: true,
            });
        }

        const { cooldowns } = this.client;
        if (!cooldowns.has(command.name))
            cooldowns.set(command.name, new Collection());

        const now = Date.now();
        const timestamps = cooldowns.get(command.name)!;
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (
            timestamps.has(interaction.user.id) &&
            now < (timestamps.get(interaction.user.id) || 0) + cooldownAmount
        )
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Red")
                        .setDescription(
                            `Please wait ${(
                                ((timestamps.get(interaction.user.id) || 0) +
                                    cooldownAmount -
                                    now) /
                                1000
                            ).toFixed(
                                1,
                            )} more seconds before reusing the "${command.name}" command.`,
                        ),
                ],
                ephemeral: true,
            });

        timestamps.set(interaction.user.id, now);
        setTimeout(
            () => timestamps.delete(interaction.user.id),
            cooldownAmount,
        );

        try {
            const subCommandGroup =
                interaction.options.getSubcommandGroup(false);
            const subCommand = `${interaction.commandName}${subCommandGroup ? `.${subCommandGroup}` : ""}.${interaction.options.getSubcommand(false) || ""}`;

            return (
                this.client.subCommands.get(subCommand)?.execute(interaction) ||
                command.execute(interaction)
            );
        } catch (err) {
            console.error(err);
            interaction.reply({
                content: "There was an error while executing this command!",
                ephemeral: true,
            });
        }
    }
}
