import {
    AutocompleteInteraction,
    ChatInputCommandInteraction,
    Collection,
    Events,
} from "discord.js";
import { Command, CustomClient, SubCommand } from "./classes";
import { Category } from "./enums";

export interface InterConfig {
    token: string;
    appId: string;
    guildId: string;
    clientId: string;
}

export interface InterCustomClient {
    config: InterConfig;
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;
    cooldowns: Collection<string, Collection<string, number>>;

    init(): void;
    loadHandlers(): void;
}

export interface InterEvent {
    client: InterCustomClient;
    name: Events;
    description: string;
    once: boolean;

    execute(...args: any[]): void;
}

export interface InterEventOptions {
    name: Events;
    description: string;
    once: boolean;
}

export interface InterHandler {
    loadEvents(): void;
    loadCommands(): void;
}

export interface InterCommand {
    client: CustomClient;
    name: string;
    description: string;
    category: Category;
    options: object;
    defualtMemberPermission: bigint;
    dmPremission: boolean;
    cooldown: number;

    execute(interaction: ChatInputCommandInteraction): void;
    autoCompletion(interaction: AutocompleteInteraction): void;
}

export interface InterOptions {
    name: string;
    description: string;
    category: Category;
    options: object;
    defualtMemberPermission: bigint;
    dmPremission: boolean;
    cooldown: number;
}

export interface InterSubCommand {
    client: CustomClient;
    name: string;

    execute(interaction: ChatInputCommandInteraction): void;
}

export interface InterSubCommandOpdtions {
    name: string;
}
