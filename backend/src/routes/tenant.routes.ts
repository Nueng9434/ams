import { Router, Response, NextFunction } from "express";
import multer from "multer";
import { TenantController } from "../controllers/tenant.controller";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    fileFilter: (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        if (file.fieldname === 'document') {
            // Allow only .doc files
            if (file.mimetype === 'application/msword' || 
                file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                cb(null, true);
            } else {
                cb(new Error('Only .doc and .docx files are allowed!'));
            }
        } else {
            cb(null, true);
        }
    }
});

const controller = new TenantController();

// Apply auth middleware
router.use((req, res, next) => {
    authMiddleware(req as AuthRequest, res, next);
});

// Get all tenants
router.get("/", (req: AuthRequest, res: Response) => {
    controller.getAll(req, res).catch(err => {
        console.error('Error getting tenants:', err);
        res.status(500).json({ message: "Internal server error" });
    });
});

// Get single tenant
router.get("/:id", (req: AuthRequest, res: Response) => {
    controller.getOne(req, res).catch(err => {
        console.error('Error getting tenant:', err);
        res.status(500).json({ message: "Internal server error" });
    });
});

// Create new tenant
router.post("/", 
    upload.single('document'),
    (req: AuthRequest, res: Response) => {
        controller.create(req, res).catch(err => {
            console.error('Error creating tenant:', err);
            res.status(500).json({ message: "Internal server error" });
        });
    }
);

// Update tenant
router.put("/:id",
    upload.single('document'),
    (req: AuthRequest, res: Response) => {
        controller.update(req, res).catch(err => {
            console.error('Error updating tenant:', err);
            res.status(500).json({ message: "Internal server error" });
        });
    }
);

// Delete tenant
router.delete("/:id", (req: AuthRequest, res: Response) => {
    controller.delete(req, res).catch(err => {
        console.error('Error deleting tenant:', err);
        res.status(500).json({ message: "Internal server error" });
    });
});

// Download tenant's document
router.get("/:id/document", (req: AuthRequest, res: Response) => {
    controller.getDocument(req, res).catch(err => {
        console.error('Error downloading document:', err);
        res.status(500).json({ message: "Internal server error" });
    });
});

// Convert tenant to contract
router.post("/:id/convert-to-contract", 
    upload.single('document'),
    (req: AuthRequest, res: Response) => {
        controller.convertToContract(req, res).catch(err => {
            console.error('Error converting to contract:', err);
            res.status(500).json({ message: "Internal server error" });
        });
    }
);

export default router;
