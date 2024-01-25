"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
class Listener {
    constructor(channelInstance) {
        this.channel = channelInstance;
    }
    createExchange() {
        return __awaiter(this, void 0, void 0, function* () {
            this.channel.assertExchange(this.exchangeName, 'direct', { durable: true });
        });
    }
    consumeMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            const queueInstance = yield this.channel.assertQueue('', {
                exclusive: true,
            });
            this.channel.bindQueue(queueInstance.queue, this.exchangeName, this.routingKey);
            this.channel.consume(queueInstance.queue, (message) => __awaiter(this, void 0, void 0, function* () {
                if (message) {
                    const parsedMessage = this.parseMessage(message);
                    yield this.onMessage(parsedMessage);
                    this.channel.ack(message);
                }
            }));
        });
    }
    parseMessage(message) {
        return JSON.parse(message.content.toString());
    }
}
exports.Listener = Listener;
