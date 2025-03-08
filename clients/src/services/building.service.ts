import api from './api';

export interface Building {
    id: string;
    name: string;
    startRoom: string;
    endRoom: string;
    tenantCount?: number;
    rooms?: Array<Array<{
        roomNumber: string;
        isOccupied: boolean;
    }>>;
}

export class BuildingService {
    static async getAllBuildings(): Promise<Building[]> {
        const response = await api.get('/buildings');
        return response.data;
    }

    static async getBuildingById(id: string): Promise<Building> {
        const response = await api.get(`/buildings/${id}`);
        return response.data;
    }
}
