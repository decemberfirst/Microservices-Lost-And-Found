import amqp from 'amqplib';
declare class Amqp {
    private _channel;
    get client(): amqp.Channel;
    connect(): Promise<void>;
}
export declare const amqpInstance: Amqp;
export {};
