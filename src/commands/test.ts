import { ChatInputCommandInteraction, PermissionsBitField } from 'discord.js';
import { Command,CustomClient } from '../classes';
import { Category } from '../enums';
import { InterOptions } from '../interfaces';

export default class Test extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'test',
            description: 'Test command',
            category: Category.Ultility,
            defualtMemberPermission: PermissionsBitField.Flags.UseApplicationCommands,
            dmPremission: false,
            cooldown: 3,
            options: []
        })
    }

    execute = (interaction: ChatInputCommandInteraction) => interaction.reply({ content: 'Test command executed!', ephemeral: true })
}