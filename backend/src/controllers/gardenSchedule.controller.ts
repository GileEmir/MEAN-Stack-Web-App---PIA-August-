import Company from '../models/company';
import express from 'express';
import GardenSchedule from '../models/gardenSchedule';
import UserM from '../models/user'; // Correctly import the UserM model
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export class GardenScheduleController {
  getAllSchedules(req: Request, res: Response): void {
    GardenSchedule.find()
    .then(schedules => {
        res.status(200).json(schedules);
      })
      .catch(error => {
        res.status(500).json({ message: 'Internal server error' });
      });
  }

  scheduleGarden = (req: Request, res: Response) => {
    const { date, time, totalArea, gardenType, poolArea, greenArea, furnitureArea, fountainArea, tables, chairs, description, options, layout, company, user, rated } = req.body;

    // Validate required fields
    if (!date || !time || !totalArea || !gardenType || !company || !user) {
      return res.status(400).json({ message: 'date, time, totalArea, gardenType, company, and user are required' });
    }
    
    const newSchedule = new GardenSchedule({
      date,
      time,
      totalArea,
      gardenType,
      poolArea,
      greenArea,
      furnitureArea,
      fountainArea,
      tables,
      chairs,
      description,
      options,
      layout, // Include the layout field
      company, // Include the company field
      user, // Include the user field
      canceled: false, // Set the canceled field to false by default
      rated: rated || false // Set the rated field to false by default if not provided
    });

    newSchedule.save()
      .then(savedSchedule => {
        res.status(201).json({ message: 'Garden scheduling successful', data: savedSchedule });
      })
      .catch(error => {
        res.status(500).json({ message: 'Internal server error' });
      });
  }

  getSchedulesByUser(req: Request, res: Response): void {
    const username = req.params.username;

    // Find the user by username
    UserM.findOne({ username: username })
    .then(user => {
      if (!user) {
          res.status(404).json({ message: 'User not found' });
          return null; // Return null to stop the promise chain
        }

        // Find schedules by user ID
        return GardenSchedule.find({ 'user.username': user.username });
      })
      .then(schedules => {
        if (schedules) {
          res.status(200).json(schedules);
        } else {
          res.status(404).json({ message: 'No schedules found for user' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Internal server error' });
      });
  }

  cancelSchedule = async (req: Request, res: Response): Promise<void> => {
    const schedule = req.body;
    const { date, time, totalArea, gardenType, company, user } = schedule;
    
    if (!date || !time || !totalArea || !gardenType || !company || !user) {
      console.warn('Required fields are missing in request body');
      res.status(400).json({ message: 'Required fields are missing' });
      return;
    }
  
    try {
      const foundSchedule = await GardenSchedule.findOne({ date, time, totalArea, gardenType, company, user });
  
      if (!foundSchedule) {
        console.warn('Schedule not found with provided fields');
        res.status(404).json({ message: 'Schedule not found' });
        return;
      }
      
      const { _id } = foundSchedule;
  
      const updatedSchedule = await GardenSchedule.findByIdAndUpdate(_id, { canceled: true }, { new: true });
      
      if (!updatedSchedule) {
        console.warn('Schedule not found for id:', _id);
        res.status(404).json({ message: 'Schedule not found' });
        return;
      }
      
      res.status(200).json({ message: 'Schedule canceled successfully', data: updatedSchedule });
    } catch (error) {
      console.error('Error canceling schedule:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  addCommentToCompany = async (req: Request, res: Response): Promise<void> => {
    const { companyId, user, comment, rating } = req.body;

    // Validate required fields
    if (!companyId || !user || !comment || rating == null) {
        res.status(400).json({ message: 'companyId, user, comment, and rating are required' });
        return;
      }
      
      try {
        // Find the company by ID
        const company = await Company.findById(companyId);
        
        if (!company) {
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
        company.comments.push(newComment);
        await company.save();

        // Respond with success message and updated company data
        res.status(200).json({ message: 'Comment added successfully', data: company });
    } catch (error) {
        console.error('Error adding comment to company:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  }
  updateRated = async (req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): Promise<void> => {
    const { id } = req.body;

    // Validate required fields
    if (!id) {
      res.status(400).json({ message: 'id is required' });
      return;
    }

    try {
      const updatedSchedule = await GardenSchedule.findByIdAndUpdate(id, { rated: true }, { new: true });

      if (!updatedSchedule) {
        res.status(404).json({ message: 'Schedule not found' });
        return;
      }

      res.status(200).json({ message: 'Rated updated successfully', data: updatedSchedule });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  getMaintenanceJobsByUser(req: Request<{ username: string; }, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): void {
    const username = req.params.username;

    UserM.findOne({ username: username })
      .then(user => {
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return Promise.reject('User not found'); // Reject the promise to stop the chain
        }

        return GardenSchedule.find({ 'user.username': user.username, description: 'Maintenance' });
      })
      .then(schedules => {
        if (schedules.length > 0) {
          res.status(200).json(schedules);
        } else {
          res.status(404).json({ message: 'No maintenance jobs found for user' });
        }
      })
      .catch(error => {
        if (error !== 'User not found') { // Avoid sending another response if user was not found
          res.status(500).json({ message: 'Internal server error' });
        }
      });
  }
}
