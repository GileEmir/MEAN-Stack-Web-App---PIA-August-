import express from 'express';
import Company from '../models/company';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import multer from 'multer';

const upload = multer();

export class CompanyController {
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
        const { name, address, phone_number, email, website, description, averageRating, owner } = req.body;
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
    }

    updateCompany = (req: express.Request, res: express.Response) => {
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
}