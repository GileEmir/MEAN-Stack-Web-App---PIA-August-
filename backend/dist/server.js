"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const mongoose_1 = __importDefault(require("mongoose"));
const book_router_1 = __importDefault(require("./routers/book.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect("mongodb://127.0.0.1/vasaMastaVasaBasta");
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log("DB ok");
});
const router = express_1.default.Router();
router.use('/users', user_router_1.default);
router.use('/books', book_router_1.default);
app.use("/", router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
