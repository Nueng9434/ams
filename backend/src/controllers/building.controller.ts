import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Building } from "../models/building.model";

export const getAllBuildings = async (req: Request, res: Response) => {
    try {
        const buildingRepository = AppDataSource.getRepository(Building);
        const buildings = await buildingRepository.find();
        
        // Calculate tenant count for each building
        const buildingsWithCounts = buildings.map(building => ({
            ...building,
            tenantCount: 0, // TODO: Implement actual tenant count calculation
        }));

        res.json(buildingsWithCounts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching buildings", error });
    }
};

export const getBuildingById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const buildingRepository = AppDataSource.getRepository(Building);
        const building = await buildingRepository.findOne({ where: { id } });

        if (!building) {
            return res.status(404).json({ message: "Building not found" });
        }

        // Generate room numbers sequence
        const startRoom = parseInt(building.startRoom);
        const endRoom = parseInt(building.endRoom);
        const rooms = [];

        for (let floor = Math.floor(startRoom/100); floor >= Math.floor(endRoom/100); floor--) {
            const floorRooms = [];
            const startUnit = floor === Math.floor(startRoom/100) ? startRoom % 100 : 25;
            const endUnit = floor === Math.floor(endRoom/100) ? endRoom % 100 : 1;
            
            for (let unit = startUnit; unit >= endUnit; unit--) {
                floorRooms.push({
                    roomNumber: `${floor}${unit.toString().padStart(2, '0')}`,
                    isOccupied: false, // TODO: Implement actual occupancy check
                });
            }
            rooms.push(floorRooms);
        }

        res.json({
            ...building,
            rooms,
            tenantCount: 0, // TODO: Implement actual tenant count
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching building details", error });
    }
};
