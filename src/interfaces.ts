import { Events } from 'discord.js'

export interface InterConfig {
    token: string
    appId: string
}

export interface InterCustomClient {
    config: InterConfig
    init(): void
}

export interface InterEvent {
    client: InterCustomClient
    name: Events
    description: string
    once: boolean
    execute(...args: any[]): void
}

export interface InterEventOptions {
    name: Events
    description: string
    once: boolean
}

export interface InterHandler {
    loadEvents(): void
}