import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Tenant } from "../models/tenant.model";
import { Building } from "../models/building.model";
import * as path from "path";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

export class TenantController {
    private tenantRepository = AppDataSource.getRepository(Tenant);
    private uploadDir = path.join(__dirname, "../../uploads/documents");

    private ensureUploadDir() {
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }

private async saveDocument(file: any): Promise<string> {
        this.ensureUploadDir();
        const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        const filePath = path.join(this.uploadDir, uniqueFilename);
        
        await fs.promises.writeFile(filePath, file.buffer);
        return uniqueFilename;
    }

    private buildingRepository = AppDataSource.getRepository(Building);

    async create(req: Request, res: Response) {
        try {
            const {
                title,
                fullName,
                phoneNumber,
                address,
                idCardNumber,
                tenantType,
                profileImage,
                reservationStartDate,
                reservationEndDate,
                roomId
            } = req.body;

            const building = await this.buildingRepository.findOne({ where: { id: parseInt(roomId) } });
            if (!building) {
                return res.status(404).json({ message: "Room not found" });
            }

            // Check if room is available or can be converted to contract
            const canAssign = building.status === 'available' || 
                            (tenantType === 'C' && building.status === 'occupied' && 
                             building.tenants && JSON.parse(building.tenants).tenantType === 'R');

            if (!canAssign) {
                return res.status(400).json({ message: "Room is not available" });
            }

            let documentPath: string | undefined;
            if ((req as any).file) {
                documentPath = await this.saveDocument((req as any).file);
            }

            const tenant = this.tenantRepository.create({
                title,
                fullName,
                phoneNumber,
                address,
                idCardNumber,
                tenantType,
                profileImage,
                documentPath,
                reservationStartDate: reservationStartDate ? new Date(reservationStartDate) : undefined,
                reservationEndDate: reservationEndDate ? new Date(reservationEndDate) : undefined
            });

            const savedTenant = await this.tenantRepository.save(tenant);

            // Update building status and tenant info
            building.status = 'occupied';
            building.tenants = JSON.stringify({
                id: savedTenant.id,
                title: savedTenant.title,
                fullName: savedTenant.fullName,
                tenantType: savedTenant.tenantType
            });
            await this.buildingRepository.save(building);

            res.status(201).json(tenant);
        } catch (error) {
            res.status(400).json({ message: "Error creating tenant", error });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const tenants = await this.tenantRepository.find();
            res.json(tenants);
        } catch (error) {
            res.status(500).json({ message: "Error fetching tenants", error });
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const tenant = await this.tenantRepository.findOne({ where: { id: parseInt(id) } });
            
            if (!tenant) {
                return res.status(404).json({ message: "Tenant not found" });
            }

            res.json(tenant);
        } catch (error) {
            res.status(500).json({ message: "Error fetching tenant", error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const tenant = await this.tenantRepository.findOne({ where: { id: parseInt(id) } });
            
            if (!tenant) {
                return res.status(404).json({ message: "Tenant not found" });
            }

            if ((req as any).file) {
                // Delete old document if exists
                if (tenant.documentPath) {
                    const oldPath = path.join(this.uploadDir, tenant.documentPath);
                    if (fs.existsSync(oldPath)) {
                        await fs.promises.unlink(oldPath);
                    }
                }
                tenant.documentPath = await this.saveDocument((req as any).file);
            }

            this.tenantRepository.merge(tenant, req.body);
            
            if (req.body.reservationStartDate) {
                tenant.reservationStartDate = new Date(req.body.reservationStartDate);
            }
            if (req.body.reservationEndDate) {
                tenant.reservationEndDate = new Date(req.body.reservationEndDate);
            }

            // If room is being changed
            if (req.body.roomId) {
                const newRoom = await this.buildingRepository.findOne({ 
                    where: { id: parseInt(req.body.roomId) }
                });
                
                if (!newRoom) {
                    return res.status(404).json({ message: "New room not found" });
                }

                // Check if new room is available or can be converted to contract
                const canAssign = newRoom.status === 'available' || 
                                (tenant.tenantType === 'C' && newRoom.status === 'occupied' && 
                                 newRoom.tenants && JSON.parse(newRoom.tenants).tenantType === 'R');

                if (!canAssign) {
                    return res.status(400).json({ message: "New room is not available" });
                }

                // Find and update old room if exists
                if (tenant.roomId) {
                    const oldRoom = await this.buildingRepository.findOne({
                        where: { id: tenant.roomId }
                    });
                    if (oldRoom) {
                        oldRoom.status = 'available';
                        oldRoom.tenants = undefined;
                        await this.buildingRepository.save(oldRoom);
                    }
                }

                // Update new room
                newRoom.status = 'occupied';
                newRoom.tenants = JSON.stringify({
                    id: tenant.id,
                    title: tenant.title,
                    fullName: tenant.fullName,
                    tenantType: tenant.tenantType
                });
                await this.buildingRepository.save(newRoom);
            }

            const updatedTenant = await this.tenantRepository.save(tenant);
            res.json(updatedTenant);
        } catch (error) {
            res.status(400).json({ message: "Error updating tenant", error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const tenant = await this.tenantRepository.findOne({ where: { id: parseInt(id) } });
            
            if (!tenant) {
                return res.status(404).json({ message: "Tenant not found" });
            }

            // Delete associated document if exists
            if (tenant.documentPath) {
                const filePath = path.join(this.uploadDir, tenant.documentPath);
                if (fs.existsSync(filePath)) {
                    await fs.promises.unlink(filePath);
                }
            }

            await this.tenantRepository.remove(tenant);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error deleting tenant", error });
        }
    }

    async convertToContract(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const tenant = await this.tenantRepository.findOne({ where: { id: parseInt(id) } });
            
            if (!tenant) {
                return res.status(404).json({ message: "Tenant not found" });
            }

            if ((req as any).file) {
                // Delete old document if exists
                if (tenant.documentPath) {
                    const oldPath = path.join(this.uploadDir, tenant.documentPath);
                    if (fs.existsSync(oldPath)) {
                        await fs.promises.unlink(oldPath);
                    }
                }
                tenant.documentPath = await this.saveDocument((req as any).file);
            }

            // Update tenant and room
            tenant.tenantType = 'C';
            
            const updatedTenant = await this.tenantRepository.save(tenant);

            // Update room status if exists
            if (tenant.roomId) {
                const room = await this.buildingRepository.findOne({
                    where: { id: tenant.roomId }
                });
                if (room) {
                    room.tenants = JSON.stringify({
                        id: updatedTenant.id,
                        title: updatedTenant.title,
                        fullName: updatedTenant.fullName,
                        tenantType: 'C'
                    });
                    await this.buildingRepository.save(room);
                }
            }
            res.json(updatedTenant);
        } catch (error) {
            res.status(400).json({ message: "Error converting tenant to contract", error });
        }
    }

    async getDocument(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const tenant = await this.tenantRepository.findOne({ where: { id: parseInt(id) } });
            
            if (!tenant || !tenant.documentPath) {
                return res.status(404).json({ message: "Document not found" });
            }

            const filePath = path.join(this.uploadDir, tenant.documentPath);
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: "Document file not found" });
            }

            res.download(filePath);
        } catch (error) {
            res.status(500).json({ message: "Error fetching document", error });
        }
    }
}
