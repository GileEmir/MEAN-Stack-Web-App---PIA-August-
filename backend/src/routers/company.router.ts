import { CompanyController } from '../controllers/company.controller';
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const companyRouter = express.Router();

// Ensure the uploads directory exists
const uploadDir = path.resolve(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

companyRouter.route("/add").post(
  upload.single('logo'), // Add multer middleware
  (req, res) => new CompanyController().addCompany(req, res)
);

companyRouter.route("/:id").put(
  upload.single('logo'), // Add multer middleware
  (req, res) => new CompanyController().updateCompany(req, res)
);

companyRouter.route("/:id").delete(
  (req, res) => new CompanyController().deleteCompany(req, res)
);

companyRouter.route("/").get(
  (req, res) => new CompanyController().getAllCompanies(req, res)
);

companyRouter.route("/search").get(
  (req, res) => new CompanyController().searchCompanies(req, res)
);

companyRouter.route("/:id").get(
  (req, res) => new CompanyController().getCompanyById(req, res)
);

companyRouter.route("/:id/comments").post(
  (req, res) => new CompanyController().addCommentToCompany(req, res)
);

export default companyRouter;