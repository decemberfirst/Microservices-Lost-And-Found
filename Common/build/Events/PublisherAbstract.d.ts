import { Channel } from 'amqplib';
import { Subjects } from './SubjectsEnum';
interface Event {
    subject: Subjects;
    data: any;
}
export declare abstract class Publisher<T extends Event> {
    private channel;
    abstract exchangeName: string;
    abstract routingKey: string;
    abstract subject: T['subject'];
    constructor(channelInstance: Channel);
    createExchange(): void;
    publishMessage(message: any): Promise<void>;
}
export {};
