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
const index_1 = __importDefault(require("../src/index")); // Import your Express app instance
describe('User API Endpoints', () => {
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/api/users')
            .send({
            username: 'testUser',
            email: 'test@example.com',
        });
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty('message', 'User created successfully');
    }));
    it('should retrieve a user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, supertest_1.default)(index_1.default)
            .post('/api/users')
            .send({
            username: 'testUser',
            email: 'test@example.com',
        });
        const res = yield (0, supertest_1.default)(index_1.default).get(`/api/users/${user.body._id}`);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('username', 'testUser');
    }));
});
