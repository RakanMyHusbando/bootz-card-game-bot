import { Events } from "discord.js";
import { CustomClient, Event } from "../classes";

export default class Ready extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.ClientReady,
            description: 'Ready event',
            once: true
        })
    }

    execute = () => console.log(`${this.client.user?.tag} is ready!`)
}