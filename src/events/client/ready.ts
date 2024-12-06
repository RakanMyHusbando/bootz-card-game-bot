import { Collection, Events, REST, Routes } from "discord.js";
import { Command, CustomClient, Event } from "../../classes";

export default class Ready extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.ClientReady,
            description: 'Ready event',
            once: true
        })
    }

    async execute() {
        console.log(`${this.client.user?.tag} is ready!`)

        const commands: object[] = this.GetJson(this.client.commands)

        const rest = new REST()
        if (this.client.token) {
            rest.setToken(this.client.token);
        } else {
            console.error('Client token is null');
        }

        const setCommands: any = await rest.put(
            Routes.applicationGuildCommands(this.client.config.clientId, this.client.config.guildId),
            { body: commands },
        )

        console.log(`Successfully registered ${setCommands.length} application commands.`);
    }

    private GetJson(commands: Collection<string, Command>): object[] {
        const data: object[] = []
        commands.forEach((command) => {
            data.push({
                name: command.name,
                description: command.description,
                options: command.options,
                default_member_permission: command.defualtMemberPermission.toString(),
                dm_premission: command.dmPremission,
                cooldown: command.cooldown
            })
        })
        return data
    }
}