# Apartment Management System (AMS) Backend

ระบบจัดการที่พักอาศัย (Apartment Management System) API เขียนด้วย Node.js, Express, TypeScript และ TypeORM

## โครงสร้างโปรเจค

```
backend/
├── src/
│   ├── app.ts                # Express application setup
│   ├── index.ts              # Entry point ของแอพพลิเคชัน
│   ├── config/               # การตั้งค่าต่างๆ
│   ├── controllers/          # จัดการ business logic
│   ├── models/
│   │   └── entities/         # TypeORM entities
│   ├── routes/               # Express routes
│   ├── services/             # Service layer
│   ├── utils/                # Helper functions
│   └── middlewares/          # Middleware functions
```

## การติดตั้ง

```bash
# ติดตั้ง dependencies
npm install

# ชั้งค่า environment variables
# แก้ไขไฟล์ .env ตามความเหมาะสม

# สร้างฐานข้อมูล
# รันคำสั่ง SQL จากไฟล์ alltable.tex

# เริ่มต้นเซิร์ฟเวอร์ในโหมดพัฒนา
npm run dev
```

## คำสั่งใช้งาน

```bash
# เริ่มต้นเซิร์ฟเวอร์ในโหมดพัฒนา
npm run dev

# สร้าง build สำหรับนำไปใช้งานจริง
npm run build

# เริ่มต้นเซิร์ฟเวอร์จาก build
npm start
```

## การเชื่อมต่อฐานข้อมูล

ระบบใช้ MySQL เป็นฐานข้อมูล การเชื่อมต่อถูกกำหนดค่าในไฟล์ `src/config/database.ts` และใช้ค่าจากไฟล์ `.env`:

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=1235
DB_DATABASE=ams

# Authentication
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRES_IN=1d
```

## API Endpoints

### Authentication

```
POST /api/auth/register - ลงทะเบียนผู้ใช้ใหม่
POST /api/auth/login - เข้าสู่ระบบ
GET /api/auth/me - ดูข้อมูลผู้ใช้ปัจจุบัน (ต้องล็อกอินก่อน)
```

### ตัวอย่างการใช้งาน

#### การลงทะเบียนผู้ใช้ใหม่

```
POST /api/auth/register
Content-Type: application/json

{
  "username": "manager1",
  "password": "managerpass",
  "role": "manager"
}
```

#### การเข้าสู่ระบบ

```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

ผลลัพธ์:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "role": "admin",
      "isActive": true
    },
    "token": "eyJhbGc..."
  }
}
```

#### การเข้าถึงข้อมูลผู้ใช้ปัจจุบัน

```
GET /api/auth/me
Authorization: Bearer eyJhbGc...
```

## การตั้งค่าฐานข้อมูล

นอกจากไฟล์ SQL ใน alltable.tex เพิ่มตาราง users โดยใช้ไฟล์ `users-table.sql`:

```sql
-- สร้างตาราง users สำหรับการยืนยันตัวตน
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'staff', 'tenant') NOT NULL DEFAULT 'staff',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    employee_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE SET NULL
);
```
