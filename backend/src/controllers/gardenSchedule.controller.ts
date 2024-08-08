import express from 'express';
import GardenSchedule from '../models/gardenSchedule';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export class GardenScheduleController {
  getAllSchedules(req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): void {
    GardenSchedule.find()
      .then(schedules => {
        res.status(200).json(schedules);
      })
      .catch(error => {
        console.error('Error fetching garden schedules', error);
        res.status(500).json({ message: 'Internal server error' });
      });
  }

  scheduleGarden = (req: Request, res: Response) => {
    console.log('Received request body:', req.body);

    const { date, time, totalArea, gardenType, poolArea, greenArea, furnitureArea, fountainArea, tables, chairs, description, options, layout } = req.body;

    // Validate required fields
    if (!date || !time || !totalArea || !gardenType) {
      console.error('Validation error: Missing required fields');
      return res.status(400).json({ message: 'date, time, totalArea, and gardenType are required' });
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
      layout // Include the layout field
    });

    newSchedule.save()
      .then(savedSchedule => {
        console.log('Garden schedule saved successfully:', savedSchedule);
        res.status(201).json({ message: 'Garden scheduling successful', data: savedSchedule });
      })
      .catch(error => {
        console.error('Error saving garden schedule:', error);
        res.status(500).json({ message: 'Internal server error' });
      });
  }
}