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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = void 0;
const mongodb_memory_server_1 = require("mongodb-memory-server");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
let mongoMemory;
const signin = () => {
    const payload = {
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        email: 'rohan@gmail.com',
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY);
    return token;
};
exports.signin = signin;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    process.env.JWT_KEY = 'test';
    mongoMemory = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = mongoMemory.getUri();
    yield mongoose_1.default.connect(uri);
    console.log('Connected to MongoMemoryServer');
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    const collections = yield mongoose_1.default.connection.db.collections();
    for (let collection of collections) {
        yield collection.deleteMany({});
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoMemory.stop();
    yield mongoose_1.default.connection.close();
}));
