import { Channel } from 'amqplib';
import { Subjects } from './SubjectsEnum';
interface Event {
    subject: Subjects;
    data: any;
}
export declare abstract class Listener<T extends Event> {
    private channel;
    abstract exchangeName: string;
    abstract onMessage(message: any): Promise<void>;
    abstract routingKey: string;
    abstract subject: T['subject'];
    constructor(channelInstance: Channel);
    createExchange(): Promise<void>;
    consumeMessage(): Promise<void>;
    private parseMessage;
}
export {};
