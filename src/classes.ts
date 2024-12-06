import { Client, Events } from "discord.js";
import { InterConfig, InterCustomClient, InterEvent, InterEventOptions, InterHandler } from "./interfaces";
import path from "path";
import { glob } from "glob";

import dotenv from "dotenv";
dotenv.config()

export class CustomClient extends Client implements InterCustomClient {
    constructor() {
        super({ intents: [] })

        this.config = {
            token: process.env.TOKEN as string,
            appId: process.env.APP_ID as string,
        }
        this.handler = new Handler(this)
    }

    handler: InterHandler 
    config: InterConfig

    init(): void {
        this.loadHandlers()
        this.login(this.config.token)
            .then(() => console.log(`logging in ...`))
            .catch((err) => console.error(err))
    }    

    loadHandlers(): void {
        this.handler.loadEvents()
    }
}

export class Event implements InterEvent {
    constructor(client: CustomClient, options: InterEventOptions) {
        this.client = client
        this.name = options.name
        this.description = options.description
        this.once = options.once
    }

    client: CustomClient
    name: Events
    description: string
    once: boolean

    execute(...args: any[]): void {
        throw new Error("Method not implemented.");
    }
}

export class Handler implements InterHandler {
    constructor(client: CustomClient) {
        this.client = client
    }

    client: CustomClient

    async loadEvents(): Promise<void> {
        const files = (await glob(`build/events/**/*.js`)).map(filePath => path.resolve(filePath)) 

        files.map(async (file:string) => {
            const event: Event = new (await import(file)).default(this.client)

            if(!event.name) 
                return delete require.cache[require.resolve(file)] && console.error(`Event ${file} is missing a name`)

            const execute = (...args: any[]) => event.execute(...args)

            
            if (event.once) 
                // @ts-ignore
                this.client.once(event.name, execute)
            
            else 
                // @ts-ignore
                this.client.on(event.name, execute)

            return delete require.cache[require.resolve(file)]
        })
    }
}