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
      completionDate: '' ,// Add the completionDate field with an empty string as default
      dateOfCompletionPhotoUpload : '',
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

  getMaintenancesByCompany(req: Request<{ companyId: string; }, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): void {
    const companyId = req.params.companyId;
    // Find schedules by company ID, where workerId is null and status is not accepted
    GardenSchedule.find({ 'company._id': companyId, workerId: null, status: { $ne: 'accepted' }, description: 'Maintenance'  })
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

    getJobsDistributionByCompany = async (req: Request<{ companyId: string; }, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): Promise<void> => {
      const { companyId } = req.params;

      // Validate required fields
      if (!companyId) {
          res.status(400).json({ message: 'companyId is required' });
          return;
      }

      try {
          // Find schedules by company ID
          const schedules = await GardenSchedule.find({ 'company._id': companyId });

          if (!schedules.length) {
              res.status(404).json({ message: 'No schedules found for company' });
              return;
          }

          // Aggregate jobs by workerId (username)
          const jobsByWorker = schedules.reduce((acc: { [key: string]: number }, schedule) => {
              const workerId = schedule.workerId || 'unassigned';
              if (!acc[workerId]) {
                  acc[workerId] = 0;
              }
              acc[workerId] += 1;
              return acc;
          }, {} as { [key: string]: number });

          // Convert the aggregated data to the desired format
          const result = Object.keys(jobsByWorker).map(workerId => ({
              workerId,
              jobsCount: jobsByWorker[workerId]
          }));

          res.status(200).json(result);
      } catch (error) {
          res.status(500).json({ message: 'Internal server error' });
      }
  };

  getAverageJobsPerDay = async (req: Request<{ companyId: string; }, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): Promise<void> => {
    const { companyId } = req.params;
  
    // Validate required fields
    if (!companyId) {
      console.error('companyId is required');
      res.status(400).json({ message: 'companyId is required' });
      return;
    }
  
    try {
      // Find schedules by company ID
      const schedules = await GardenSchedule.find({ 'company._id': companyId });
  
      if (!schedules.length) {
        console.log('No schedules found for company');
        res.status(404).json({ message: 'No schedules found for company' });
        return;
      }
  
      // Define all days of the week
      const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
      // Initialize jobsByDay with all days set to 0
      const jobsByDay = daysOfWeek.reduce((acc: { [key: string]: number }, day) => {
        acc[day] = 0;
        return acc;
      }, {} as { [key: string]: number });
  
      // Aggregate jobs by day of the week
      schedules.forEach(schedule => {
        const date = new Date(schedule.date);
        const dayOfWeek = date.toLocaleString('default', { weekday: 'short' });
        jobsByDay[dayOfWeek] += 1;
      });
  
      // Convert the aggregated data to the desired format
      const result = daysOfWeek.map(day => ({
        date: day,
        jobsCount: jobsByDay[day]
      }));
  
      console.log('Jobs by day:', result);
      res.status(200).json(result);
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

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
      // Find the schedule by _id
      const foundSchedule = await GardenSchedule.findById(appointment._id);
  
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
      // Find the schedule by _id
      const foundSchedule = await GardenSchedule.findById(appointment._id);
  
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

  acceptMaintenance = async (req: Request, res: Response): Promise<void> => {
    const { appointment, username, maintenanceDate, maintenanceTime } = req.body;
    // Validate required fields
    if (!appointment || !username || !maintenanceDate || !maintenanceTime) {
      console.warn('Required fields are missing in request body');
      res.status(400).json({ message: 'appointment, username, maintenanceDate, and maintenanceTime are required' });
      return;
    }

    try {
      // Find the schedule by _id
      const foundSchedule = await GardenSchedule.findById(appointment._id);

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

        // Validate and combine maintenanceDate and maintenanceTime to create estimatedCompletionDate
        const date = new Date(maintenanceDate);
        const time = maintenanceTime.split(':');
        if (time.length !== 2) {
          console.error('Invalid maintenanceTime format');
          res.status(400).json({ message: 'Invalid maintenanceTime format' });
          return;
        }
        date.setUTCHours(parseInt(time[0]), parseInt(time[1]));

        if (isNaN(date.getTime())) {
          console.error('Invalid date or time value');
          res.status(400).json({ message: 'Invalid date or time value' });
          return;
        }

        foundSchedule.estimatedCompletionDate = date.toISOString();

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

  getMaintenancesForWorker = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.body;

    // Validate required fields
    if (!username) {
      res.status(400).json({ message: 'username is required' });
      return;
    }

    try {
      // Find all schedules with the given workerId and status 'accepted'
      const schedules = await GardenSchedule.find({ workerId: username, status: 'accepted' ,description: 'Maintenance'});

      if (!schedules.length) {
        res.status(404).json({ message: 'No schedules found' });
        return;
      }

      res.status(200).json(schedules);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  getJobsPerMonthForUser = async (req: Request, res: Response): Promise<void> => {
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

        // Aggregate jobs by month
        const jobsPerMonth = schedules.reduce((acc: { [key: string]: number }, schedule) => {
            const month = new Date(schedule.date).toLocaleString('default', { month: 'short' });
            if (!acc[month]) {
                acc[month] = 0;
            }
            acc[month] += 1;
            return acc;
        }, {} as { [key: string]: number });

        // Convert the aggregated data to the desired format
        const result = Object.keys(jobsPerMonth).map(month => ({
            date: month,
            jobsCount: jobsPerMonth[month]
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
  
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
      const foundSchedule = await GardenSchedule.findById(appointment._id);

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

  uploadCompletionPhoto = async (req: Request, res: Response): Promise<void> => {
    // Parse the appointment data from the form data
    const appointment = req.body?.appointment ? JSON.parse(req.body.appointment) : null;

    let completionPhotoPath = req.file ? `/uploads/finishedJobs/${req.file.filename}` : '';

    // Validate required fields
    if (!appointment) {
      console.warn('Required fields are missing in request body');
      res.status(400).json({ message: 'appointment is required' });
      return;
    }

    try {
      // Construct the query object
      const foundSchedule = await GardenSchedule.findById(appointment._id);

      if (!foundSchedule) {
        console.warn('Schedule not found with provided details');
        res.status(404).json({ message: 'Schedule not found' });
        return;
      }

      // Update the completion photo
      foundSchedule.completionPhoto = completionPhotoPath;
      foundSchedule.dateOfCompletionPhotoUpload = new Date().toISOString();

      const updatedSchedule = await foundSchedule.save();

      res.status(200).json({ message: 'Finishing photo uploaded successfully', data: updatedSchedule });
    } catch (error) {
      console.error('Error uploading finishing photo:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}