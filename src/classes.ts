import {
    CacheType,
    Client,
    Events,
    ChatInputCommandInteraction,
    AutocompleteInteraction,
    Collection,
} from "discord.js";

import path from "path";
import { glob } from "glob";
import dotenv from "dotenv";

import {
    InterConfig,
    InterCustomClient,
    InterEvent,
    InterEventOptions,
    InterHandler,
    InterCommand,
    InterOptions,
    InterSubCommand,
    InterSubCommandOpdtions,
} from "./interfaces";
import { Category } from "./enums";

dotenv.config();

export class CustomClient extends Client implements InterCustomClient {
    constructor() {
        super({ intents: [] });

        this.config = {
            token: process.env.TOKEN as string,
            appId: process.env.APP_ID as string,
            guildId: process.env.GUILD_ID as string,
        };
        this.handler = new Handler(this);
        this.commands = new Collection();
        this.subCommands = new Collection();
        this.cooldowns = new Collection();
    }

    handler: InterHandler;
    config: InterConfig;
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;
    cooldowns: Collection<string, Collection<string, number>>;

    init(): void {
        this.loadHandlers();
        this.login(this.config.token)
            .then(() => console.log(`logging in ...`))
            .catch((err) => console.error(err));
    }

    loadHandlers(): void {
        this.handler.loadEvents();
        this.handler.loadCommands();
    }
}

export class Event implements InterEvent {
    constructor(client: CustomClient, options: InterEventOptions) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.once = options.once;
    }

    client: CustomClient;
    name: Events;
    description: string;
    once: boolean;

    execute(...args: any[]): void {
        throw new Error("Method not implemented.");
    }
}

export class Handler implements InterHandler {
    constructor(client: CustomClient) {
        this.client = client;
    }

    client: CustomClient;

    async loadEvents(): Promise<void> {
        const files = (await glob(`build/events/**/*.js`)).map((filePath) =>
            path.resolve(filePath),
        );

        files.map(async (file: string) => {
            const event: Event = new (await import(file)).default(this.client);

            if (!event.name)
                return (
                    delete require.cache[require.resolve(file)] &&
                    console.error(`Event ${file} is missing a name`)
                );

            const execute = (...args: any[]) => event.execute(...args);

            if (event.once)
                // @ts-ignore
                this.client.once(event.name, execute);
            else
                // @ts-ignore
                this.client.on(event.name, execute);

            return delete require.cache[require.resolve(file)];
        });
    }

    async loadCommands(): Promise<void> {
        const files = (await glob(`build/commands/**/*.js`)).map((filePath) =>
            path.resolve(filePath),
        );

        files.map(async (file: string) => {
            const command: Command | SubCommand = new (
                await import(file)
            ).default(this.client);

            if (!command.name)
                return (
                    delete require.cache[require.resolve(file)] &&
                    console.error(`Command ${file} is missing a name`)
                );

            if (file.split("/").pop()?.split(".")[2])
                return this.client.subCommands.set(command.name, command);

            this.client.commands.set(command.name, command as Command);

            return delete require.cache[require.resolve(file)];
        });
    }
}

export class Command implements InterCommand {
    constructor(client: CustomClient, options: InterOptions) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.category = options.category;
        this.options = options.options;
        this.defualtMemberPermission = options.defualtMemberPermission;
        this.dmPremission = options.dmPremission;
        this.cooldown = options.cooldown;
    }

    client: CustomClient;
    name: string;
    description: string;
    category: Category;
    options: object;
    defualtMemberPermission: bigint;
    dmPremission: boolean;
    cooldown: number;

    execute(interaction: ChatInputCommandInteraction<CacheType>): void {}

    autoCompletion(interaction: AutocompleteInteraction<CacheType>): void {}
}

export class SubCommand implements InterSubCommand {
    constructor(client: CustomClient, options: InterSubCommandOpdtions) {
        this.client = client;
        this.name = options.name;
    }

    client: CustomClient;
    name: string;

    execute(interaction: ChatInputCommandInteraction<CacheType>): void {}
}
