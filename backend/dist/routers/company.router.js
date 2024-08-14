"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const company_controller_1 = require("../controllers/company.controller");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const companyRouter = express_1.default.Router();
// Ensure the uploads directory exists
const uploadDir = path_1.default.resolve(__dirname, '..', '..', 'uploads');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir);
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
companyRouter.route("/add").post(upload.single('logo'), // Add multer middleware
(req, res) => new company_controller_1.CompanyController().addCompany(req, res));
companyRouter.route("/:id").put(upload.single('logo'), // Add multer middleware
(req, res) => new company_controller_1.CompanyController().updateCompany(req, res));
companyRouter.route("/:id").delete((req, res) => new company_controller_1.CompanyController().deleteCompany(req, res));
companyRouter.route("/").get((req, res) => new company_controller_1.CompanyController().getAllCompanies(req, res));
companyRouter.route("/search").get((req, res) => new company_controller_1.CompanyController().searchCompanies(req, res));
companyRouter.route("/:id").get((req, res) => new company_controller_1.CompanyController().getCompanyById(req, res));
companyRouter.route("/:id/comments").post((req, res) => new company_controller_1.CompanyController().addCommentToCompany(req, res));
companyRouter.route("/register").post((req, res) => new company_controller_1.CompanyController().registerCompany(req, res));
exports.default = companyRouter;
