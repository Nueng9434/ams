import { Request, Response } from "express";
import { AppDataSource } from "../config/database";

interface RoomData {
    room_number: string;
    building_name: string;
    tenants: string | null;
    status: 'available' | 'occupied' | 'maintenance';
}

interface BuildingData {
    building_name: string;
    start_room: string;
    end_room: string;
}

export const getAllBuildings = async (req: Request, res: Response) => {
    try {
        // Get all unique building names and get one room to represent each building
        const buildings = await AppDataSource.query<BuildingData[]>(`
            SELECT DISTINCT building_name,
                MIN(room_number) as start_room,
                MAX(room_number) as end_room
            FROM buildings
            GROUP BY building_name
            ORDER BY building_name
        `);

        // Get rooms for each building
        const buildingsWithRooms = await Promise.all(buildings.map(async (building) => {
            const rooms = await AppDataSource.query<RoomData[]>(
                `SELECT room_number, building_name, tenants, status
                FROM buildings 
                WHERE building_name = ?
                ORDER BY room_number`,
                [building.building_name]
            );

            return {
                id: building.building_name, // Using building_name as id since that's what we use to identify buildings
                name: building.building_name,
                startRoom: building.start_room,
                endRoom: building.end_room,
                rooms: rooms.map(room => ({
                    roomNumber: room.room_number,
                    buildingName: room.building_name,
                    isOccupied: !!room.tenants,
                    status: room.status
                })),
                tenantCount: rooms.filter(room => !!room.tenants).length
            };
        }));
        
        res.json(buildingsWithRooms);
    } catch (error: unknown) {
        console.error('Error in getAllBuildings:', error);
        res.status(500).json({ 
            message: "Error fetching buildings", 
            error: error instanceof Error ? error.message : 'Unknown error' 
        });
    }
};

export const getBuildingById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        // Get building details by name
        const building = await AppDataSource.query<BuildingData[]>(`
            SELECT DISTINCT building_name,
                MIN(room_number) as start_room,
                MAX(room_number) as end_room
            FROM buildings
            WHERE building_name = ?
            GROUP BY building_name
        `, [id]);

        if (!building || building.length === 0) {
            return res.status(404).json({ message: "Building not found" });
        }

        const rooms = await AppDataSource.query<RoomData[]>(
            `SELECT room_number, building_name, tenants, status
            FROM buildings 
            WHERE building_name = ?
            ORDER BY room_number`,
            [id]
        );

        res.json({
            id: building[0].building_name, // Using building_name as id
            name: building[0].building_name,
            startRoom: building[0].start_room,
            endRoom: building[0].end_room,
            rooms: rooms.map(room => ({
                roomNumber: room.room_number,
                buildingName: room.building_name,
                isOccupied: !!room.tenants,
                status: room.status
            })),
            tenantCount: rooms.filter(room => !!room.tenants).length
        });
    } catch (error: unknown) {
        console.error('Error in getBuildingById:', error);
        res.status(500).json({ 
            message: "Error fetching building details", 
            error: error instanceof Error ? error.message : 'Unknown error' 
        });
    }
};
