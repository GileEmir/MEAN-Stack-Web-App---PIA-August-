"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const company_1 = __importDefault(require("../models/company"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
class CompanyController {
    constructor() {
        this.addCompany = (req, res) => {
            const { name, address, phone_number, email, website, description, averageRating, owner } = req.body;
            let logoPath = req.file ? `/uploads/${req.file.filename}` : '';
            const company = new company_1.default({
                name,
                address,
                phone_number,
                email,
                website,
                logo: logoPath,
                description,
                averageRating,
                owner
            });
            company.save()
                .then(savedCompany => {
                res.status(201).json(savedCompany);
            })
                .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
        this.updateCompany = (req, res) => {
            const { id, name, address, phone_number, email, website, description, averageRating, owner } = req.body;
            let logoPath = req.file ? `/uploads/${req.file.filename}` : '';
            const updateData = {
                name,
                address,
                phone_number,
                email,
                website,
                logo: logoPath,
                description,
                averageRating,
                owner
            };
            company_1.default.findByIdAndUpdate(id, updateData, { new: true })
                .then(updatedCompany => {
                if (!updatedCompany) {
                    return res.status(404).json({ message: 'Company not found' });
                }
                res.status(200).json(updatedCompany);
            })
                .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
        this.deleteCompany = (req, res) => {
            const { id } = req.body;
            company_1.default.findByIdAndDelete(id)
                .then(deletedCompany => {
                if (!deletedCompany) {
                    return res.status(404).json({ message: 'Company not found' });
                }
                res.status(200).json({ message: 'Company deleted successfully' });
            })
                .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
        this.getAllCompanies = (req, res) => {
            company_1.default.find()
                .then(companies => {
                res.status(200).json(companies);
            })
                .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
        this.searchCompanies = (req, res) => {
            const query = req.query.q;
            company_1.default.find({ name: new RegExp(query, 'i') })
                .then(companies => {
                res.status(200).json(companies);
            })
                .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
    }
    getCompanyById(req, res) {
        const { id } = req.params;
        company_1.default.findById(id)
            .then(company => {
            if (!company) {
                return res.status(404).json({ message: 'Company not found' });
            }
            res.status(200).json(company);
        })
            .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }
}
exports.CompanyController = CompanyController;
