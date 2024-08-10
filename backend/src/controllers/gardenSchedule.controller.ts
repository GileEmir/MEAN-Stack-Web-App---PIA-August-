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
    const { date, time, totalArea, gardenType, poolArea, greenArea, furnitureArea, fountainArea, tables, chairs, description, options, layout, company, user, rated, workerId, status, refusalComment, refusedBy } = req.body;

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
      rated: rated || false, // Set the rated field to false by default if not provided
      workerId: workerId || null, // Set workerId to null by default if not provided
      status: status || 'pending', // Set status to 'pending' by default if not provided
      refusedBy: refusedBy || [], // Set refusedBy to empty array by default if not provided
      completionPhoto: '', // Add the completionPhoto field with an empty string as default
      completionDate: '' // Add the completionDate field with an empty string as default
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


  getSchedulesByCompany(req: Request<{ companyId: string; }, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): void {
    const companyId = req.params.companyId;
    // Find schedules by company ID, where workerId is null and status is not accepted
    GardenSchedule.find({ 'company._id': companyId, workerId: null, status: { $ne: 'accepted' } })
      .then(schedules => {
        if (schedules.length > 0) {
          res.status(200).json(schedules);
        } else {
          console.log(`No schedules found for company ID: ${companyId}`);
          res.status(404).json({ message: 'No schedules found for company' });
        }
      })
      .catch(error => {
        console.error(`Error finding schedules for company ID: ${companyId}`, error);
        if (!res.headersSent) {
          res.status(500).json({ message: 'Internal server error' });
        }
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

  declineAppointment = async (req: Request, res: Response): Promise<void> => {
    const { appointment, comment, username } = req.body;
    // Validate required fields
    if (!appointment || !comment) {
      console.warn('Required fields are missing in request body');
      res.status(400).json({ message: 'appointment and comment are required' });
      return;
    }
  
    try {
      // Construct the query object
      const query = {
        date: appointment.date,
        time: appointment.time,
        totalArea: appointment.totalArea,
        gardenType: appointment.gardenType,
        poolArea: appointment.poolArea,
        greenArea: appointment.greenArea,
        furnitureArea: appointment.furnitureArea,
        fountainArea: appointment.fountainArea,
        tables: appointment.tables,
        chairs: appointment.chairs,
        description: appointment.description,
        options: appointment.options,
        layout: appointment.layout,
        company: appointment.company,
        user: appointment.user,
        canceled: appointment.canceled,
        rated: appointment.rated,
        workerId: appointment.workerId,
        status: appointment.status
      };
  
      const foundSchedule = await GardenSchedule.findOne(query);
  
      if (!foundSchedule) {
        console.warn('Schedule not found with provided details');
        res.status(404).json({ message: 'Schedule not found' });
        return;
      }
  
      // Update the refusedBy array
      foundSchedule.refusedBy.push({ username, comment });
  
      const updatedSchedule = await foundSchedule.save();
  
      res.status(200).json({ message: 'Appointment declined successfully', data: updatedSchedule });
    } catch (error) {
      console.error('Error declining appointment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  acceptAppointment = async (req: Request, res: Response): Promise<void> => {
    const { appointment, username } = req.body;
    // Validate required fields
    if (!appointment || !username) {
      console.warn('Required fields are missing in request body');
      res.status(400).json({ message: 'appointment and username are required' });
      return;
    }
  
    try {
      // Construct the query object
      const query = {
        date: appointment.date,
        time: appointment.time,
        totalArea: appointment.totalArea,
        gardenType: appointment.gardenType,
        poolArea: appointment.poolArea,
        greenArea: appointment.greenArea,
        furnitureArea: appointment.furnitureArea,
        fountainArea: appointment.fountainArea,
        tables: appointment.tables,
        chairs: appointment.chairs,
        description: appointment.description,
        options: appointment.options,
        layout: appointment.layout,
        company: appointment.company,
        user: appointment.user,
        canceled: appointment.canceled,
        rated: appointment.rated,
        workerId: appointment.workerId,
        status: appointment.status
      };
  
      const foundSchedule = await GardenSchedule.findOne(query);
  
      if (!foundSchedule) {
        console.warn('Schedule not found with provided details');
        res.status(404).json({ message: 'Schedule not found' });
        return;
      }
  
      // Check if workerId is null and status isn't accepted
      if (foundSchedule.workerId === null && foundSchedule.status !== 'accepted') {
        // Update the workerId and status
        foundSchedule.workerId = username;
        foundSchedule.status = 'accepted';
  
        const updatedSchedule = await foundSchedule.save();
  
        res.status(200).json({ message: 'Appointment accepted successfully', data: updatedSchedule });
      } else {
        res.status(400).json({ message: 'Appointment cannot be accepted' });
      }
    } catch (error) {
      console.error('Error accepting appointment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  getSchedulesForWorker = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.body;

    // Validate required fields
    if (!username) {
      res.status(400).json({ message: 'username is required' });
      return;
    }

    try {
      // Find all schedules with the given workerId and status 'accepted'
      const schedules = await GardenSchedule.find({ workerId: username, status: 'accepted' });

      if (!schedules.length) {
        res.status(404).json({ message: 'No schedules found' });
        return;
      }

      res.status(200).json(schedules);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  finnishAppointment = async (req: Request, res: Response): Promise<void> => {
    const { appointment, completionDate } = req.body.data;

    // Validate required fields
    if (!appointment || !completionDate) {
      console.warn('Required fields are missing in request body');
      res.status(400).json({ message: 'appointment and completionDate are required' });
      return;
    }

    try {
      // Construct the query object
      const query = {
        date: appointment.date,
        time: appointment.time,
        totalArea: appointment.totalArea,
        gardenType: appointment.gardenType,
        poolArea: appointment.poolArea,
        greenArea: appointment.greenArea,
        furnitureArea: appointment.furnitureArea,
        fountainArea: appointment.fountainArea,
        tables: appointment.tables,
        chairs: appointment.chairs,
        description: appointment.description,
        options: appointment.options,
        layout: appointment.layout,
        company: appointment.company,
        user: appointment.user,
        canceled: appointment.canceled,
        rated: appointment.rated,
        workerId: appointment.workerId,
        status: appointment.status
      };

      const foundSchedule = await GardenSchedule.findOne(query);

      if (!foundSchedule) {
        console.warn('Schedule not found with provided details');
        res.status(404).json({ message: 'Schedule not found' });
        return;
      }

      // Update the completion date
      foundSchedule.completionDate = completionDate;

      const updatedSchedule = await foundSchedule.save();

      res.status(200).json({ message: 'Appointment finished successfully', data: updatedSchedule });
    } catch (error) {
      console.error('Error finishing appointment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

}