import { Router, Response } from "express";
import { getAllBuildings, getBuildingById, getAllRooms } from "../controllers/building.controller";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";

const router = Router();

// Apply auth middleware
router.use((req, res, next) => {
    authMiddleware(req as AuthRequest, res, next);
});

// Get all buildings
router.get("/", (req: AuthRequest, res: Response) => {
    getAllBuildings(req, res).catch(err => {
        console.error('Error getting buildings:', err);
        res.status(500).json({ message: "Internal server error" });
    });
});

// Get all rooms with details
router.get("/rooms", (req: AuthRequest, res: Response) => {
    getAllRooms(req, res).catch(err => {
        console.error('Error getting rooms:', err);
        res.status(500).json({ message: "Internal server error" });
    });
});

// Get specific building details
router.get("/:id", (req: AuthRequest, res: Response) => {
    getBuildingById(req, res).catch(err => {
        console.error('Error getting building details:', err);
        res.status(500).json({ message: "Internal server error" });
    });
});

export default router;
