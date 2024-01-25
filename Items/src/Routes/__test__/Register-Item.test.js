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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const mongoose_1 = __importDefault(require("mongoose"));
const setup_1 = require("../../test/setup");
const request = (0, supertest_1.default)(app_1.app);
const ITEM = {
    _id: new mongoose_1.default.Types.ObjectId(),
    itemCategory: 'Electronics',
    itemName: 'Laptop',
    itemDescription: 'Acer Aspire ',
    itemOwner: new mongoose_1.default.Types.ObjectId(),
    itemImages: ['abc'],
    itemStatus: 'lost',
    lostLocation: {
        type: 'Point',
        coordinates: [31.2357, 30.0444],
    },
    lostDate: new Date(),
};
describe('POST /api/v1/items/register', () => {
    it('Should return 201 on successful registration', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/api/v1/items/register')
            .set('Cookie', `jwt=${(0, setup_1.signin)()}`)
            .send(ITEM);
        expect(response.status).toBe(201);
    }));
    it('Should return 500 if any of the required fields are missing', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post('/api/v1/items/register')
            .send({})
            .set(`Cookie`, `jwt=${(0, setup_1.signin)()}`)
            .expect(500);
    }));
    it('Should return 401 if user is not logged in ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.post('/api/v1/items/register').send(ITEM).expect(401);
    }));
});
