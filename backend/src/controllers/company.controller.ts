import express from 'express';
import Company from '../models/company';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import multer from 'multer';

const upload = multer();

export class CompanyController {

    registerCompany = (req: express.Request, res: express.Response) => {
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
            } catch (error) {
                console.error('Invalid location format:', error);
                return res.status(400).json({ message: 'Invalid location format' });
            }
    
            // Parse JSON fields
            let parsedServices;
            let parsedComments;
            try {
                parsedServices = JSON.parse(services);
                parsedComments = JSON.parse(comments);
            } catch (error) {
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
    
            new Company(company).save().then(savedCompany => {
                res.status(201).json({ message: "ok", company: savedCompany });
            }).catch(err => {
                console.error('Error saving company:', err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        });
    }


    getCompanyById(req: Request<{ id: string; }, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): void {
        const { id } = req.params;

        Company.findById(id)
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

    addCompany = (req: express.Request, res: express.Response) => {
        const { name, address, phone_number, email, website, description, averageRating, owner, services, pricing, comments, location } = req.body;
        let logoPath = req.file ? `/uploads/${req.file.filename}` : '';

        const company = new Company({
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
    }

    updateCompany = (req: express.Request, res: express.Response) => {
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

        Company.findByIdAndUpdate(id, updateData, { new: true })
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
    }

    deleteCompany = (req: express.Request, res: express.Response) => {
        const { id } = req.body;

        Company.findByIdAndDelete(id)
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
    }

    getAllCompanies = (req: express.Request, res: express.Response) => {
        Company.find()
            .then(companies => {
                res.status(200).json(companies);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
    }

    searchCompanies = (req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): void => {
        const query = req.query.q as string;

        Company.find({ name: new RegExp(query, 'i') })
            .then(companies => {
                res.status(200).json(companies);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
    }

    addCommentToCompany = async (req: Request<{ id: string; }, any, { user: string; comment: string; rating: number; }, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): Promise<void> => {
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
            const company = await Company.findById(id);
    
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
            await company.save();
    
            // Respond with success message and updated company data
            console.log('Comment added successfully');
            res.status(200).json({ message: 'Comment added successfully', data: company });
        } catch (error) {
            console.error('Error adding comment to company:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}