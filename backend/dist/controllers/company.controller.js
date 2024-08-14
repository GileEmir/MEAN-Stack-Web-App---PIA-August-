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
exports.CompanyController = void 0;
const company_1 = __importDefault(require("../models/company"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
class CompanyController {
    constructor() {
        this.registerCompany = (req, res) => {
            upload.none()(req, res, (err) => {
                if (err) {
                    console.error('Error processing form data:', err);
                    return res.status(400).json({ message: 'Error processing form data' });
                }
                let name = req.body.name;
                let address = req.body.address;
                let phone_number = req.body.phone_number;
                let email = req.body.email;
                let website = req.body.website;
                let description = req.body.description;
                let averageRating = req.body.averageRating;
                let contactPerson = req.body.contactPerson;
                let services = req.body.services;
                let pricing = req.body.pricing;
                let comments = req.body.comments;
                let location = req.body.location;
                let annualLeaveStart = req.body.annualLeaveStart;
                let annualLeaveEnd = req.body.annualLeaveEnd;
                console.log('Received values:');
                console.log('name:', name);
                console.log('address:', address);
                console.log('phone_number:', phone_number);
                console.log('email:', email);
                console.log('website:', website);
                console.log('description:', description);
                console.log('averageRating:', averageRating);
                console.log('contactPerson:', contactPerson);
                console.log('services:', services);
                console.log('pricing:', pricing);
                console.log('comments:', comments);
                console.log('location:', location);
                console.log('annualLeaveStart:', annualLeaveStart);
                console.log('annualLeaveEnd:', annualLeaveEnd);
                // Validate and parse location
                let parsedLocation;
                try {
                    parsedLocation = JSON.parse(location);
                    if (!parsedLocation.type || !parsedLocation.coordinates || parsedLocation.coordinates.length !== 2) {
                        return res.status(400).json({ message: 'Invalid location format' });
                    }
                }
                catch (error) {
                    console.error('Invalid location format:', error);
                    return res.status(400).json({ message: 'Invalid location format' });
                }
                // Parse JSON fields
                let parsedServices;
                let parsedComments;
                try {
                    parsedServices = JSON.parse(services);
                    parsedComments = JSON.parse(comments);
                }
                catch (error) {
                    console.error('Invalid JSON format for services or comments:', error);
                    return res.status(400).json({ message: 'Invalid JSON format for services or comments' });
                }
                const company = {
                    name: name,
                    address: address,
                    phone_number: phone_number,
                    email: email,
                    website: website,
                    description: description,
                    averageRating: averageRating,
                    contactPerson: contactPerson,
                    services: parsedServices,
                    pricing: pricing,
                    comments: parsedComments,
                    location: parsedLocation,
                    annualLeaveStart: annualLeaveStart,
                    annualLeaveEnd: annualLeaveEnd
                };
                new company_1.default(company).save().then(savedCompany => {
                    res.status(201).json({ message: "ok", company: savedCompany });
                }).catch(err => {
                    console.error('Error saving company:', err);
                    res.status(500).json({ message: 'Internal Server Error' });
                });
            });
        };
        this.addCompany = (req, res) => {
            const { name, address, phone_number, email, website, description, averageRating, owner, services, pricing, comments, location } = req.body;
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
                owner,
                services,
                pricing,
                comments,
                location
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
            const { id, name, address, phone_number, email, website, description, averageRating, owner, services, pricing, comments, location } = req.body;
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
                owner,
                services,
                pricing,
                comments,
                location
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
        this.addCommentToCompany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Entered addCommentToCompany method with params:', req.params, 'and body:', req.body);
            const { id } = req.params;
            const { user, comment, rating } = req.body;
            // Validate required fields
            if (!user || !comment || rating == null) {
                console.log('Validation failed: user, comment, and rating are required');
                res.status(400).json({ message: 'user, comment, and rating are required' });
                return;
            }
            try {
                // Find the company by ID
                console.log('Finding company with ID:', id);
                const company = yield company_1.default.findById(id);
                if (!company) {
                    console.log('Company not found with ID:', id);
                    res.status(404).json({ message: 'Company not found' });
                    return;
                }
                // Create a new comment object
                const newComment = {
                    user,
                    comment,
                    rating,
                    date: new Date()
                };
                // Add the new comment to the company's comments array
                console.log('Adding new comment to company:', newComment);
                company.comments.push(newComment);
                yield company.save();
                // Respond with success message and updated company data
                console.log('Comment added successfully');
                res.status(200).json({ message: 'Comment added successfully', data: company });
            }
            catch (error) {
                console.error('Error adding comment to company:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
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
