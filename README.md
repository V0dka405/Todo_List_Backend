# Todo API — RESTful API Server

> ระบบ RESTful API สำหรับแอปพลิเคชัน Todo List พัฒนาด้วย **AdonisJS 5** (TypeScript) ร่วมกับ **Lucid ORM** และ **PostgreSQL 16** ตามข้อกำหนดการส่งงานแบบทดสอบ

---

## จุดเด่นของระบบ (Key Features)

- **RESTful API เต็มรูปแบบ**: รองรับการสร้าง (Create), อ่านทั้งหมด/รายตัว (Read), แก้ไขชื่อ/สถานะ (Update), และลบ (Delete)
- **Database & Indexing**: ใช้ PostgreSQL 16 พร้อมระบบ Migrations ของ Lucid ORM และมีการทำ **Database Index บนคอลัมน์ `completed`** เพื่อการสืบค้นและกรองข้อมูลที่รวดเร็ว
- **Validation เข้มงวด**: ใช้ AdonisJS Built-in Validator ตัดช่องว่างหัวท้าย (`trim`), ป้องกันการส่งชื่อว่าง (`empty string`), และจำกัดความยาวสูงสุด 255 ตัวอักษร
- **Centralized Exception Handler**: จัดการ Error ทุกกรณีให้ตอบกลับเป็นโครงสร้าง JSON รูปแบบเดียวกันอย่างสม่ำเสมอ (`code`, `message`, `errors`)
- **Health Check Endpoint**: มีเส้นทาง `GET /health` ตรวจสอบสถานะความพร้อมของฐานข้อมูลและ Node Environment
- **Security & Best Practices**: ป้องกัน SQL Injection ด้วย Prepared Statements ของ Lucid ORM, แยก Config ผ่าน `.env` และไม่มีการ Hardcode ข้อมูลลับ

---

## Tech Stack

- **Framework**: [AdonisJS 5](https://adonisjs.com/) (`@adonisjs/core: ^5.9.0`)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **ORM**: [Lucid ORM](https://lucid.adonisjs.com/) (`@adonisjs/lucid: ^18.4.2`)
- **Database**: [PostgreSQL 16](https://www.postgresql.org/)
- **Testing**: [Postman](https://www.postman.com/) & [Newman CLI](https://www.npmjs.com/package/newman) (17 Requests, 73 Assertions ผ่าน 100%)
- **Container**: [Docker](https://www.docker.com/) & Docker Compose

---

## โครงสร้างโปรเจกต์ (Project Structure)

```text
todo-backend/
├── app/
│   ├── Controllers/Http/TodosController.ts   # ตรรกะ CRUD ของ Todo ทั้งหมด
│   ├── Exceptions/Handler.ts                 # ตัวดักจับและจัดรูป Error Response
│   ├── Models/Todo.ts                        # Lucid Model กำหนด Schema & Casts
│   └── Validators/                           # ตัวตรวจสอบความถูกต้องของข้อมูล
│       ├── CreateTodoValidator.ts
│       └── UpdateTodoValidator.ts
├── config/                                   # ตั้งค่าระบบ (app, database, cors, bodyparser)
├── database/
│   ├── migrations/1760000000000_todos.ts     # Schema ตาราง todos พร้อม Index
│   └── seeders/Todo.ts                       # ข้อมูลจำลองเริ่มต้นสำหรับทดสอบ
├── postman/
│   ├── Todo-API.postman_collection.json      # ชุดทดสอบ API ฉบับสมบูรณ์
│   └── Todo-API.local.postman_environment.json
├── Dockerfile                                # Multi-stage build สำหรับรันบน Production
├── docker-compose.yml                        # รัน PostgreSQL + API Server พร้อมกัน
├── .env.example                              # ตัวอย่างการตั้งค่า Environment Variables
├── server.ts                                 # จุดเริ่มต้นการรัน AdonisJS HTTP Server
└── README.md                                 # คู่มือนี้
```

---

## วิธีการเริ่มต้นใช้งาน (Getting Started)

เลือกวิธีการรันได้ 2 รูปแบบตามความสะดวก:

### วิธีที่ 1: รันด้วย Docker Compose (แนะนำ สะดวกที่สุด)

รันคำสั่งเดียวเพื่อเปิดทั้งฐานข้อมูล PostgreSQL และ API Server:

```bash
docker compose up -d --build
```

- **API URL**: [http://localhost:3333](http://localhost:3333)
- **Health Check**: [http://localhost:3333/health](http://localhost:3333/health)
- **PostgreSQL**: `localhost:5433` (Username: `postgres`, Password: `postgres`, DB: `todo_db`)

หากต้องการปิดระบบ:
```bash
docker compose down
```

---

### วิธีที่ 2: รันในเครื่อง (Local Development)

#### 1. ติดตั้ง Dependencies
```bash
npm install
```

#### 2. ตั้งค่า Environment Variables
คัดลอกไฟล์ `.env.example` เป็น `.env` และสร้าง Application Key:
```bash
cp .env.example .env
node ace generate:key
```
*(นำ Key ที่ได้ไปใส่ในค่า `APP_KEY` ในไฟล์ `.env`)*

#### 3. สั่งรัน Database Migration (สร้างตาราง)
```bash
node ace migration:run
```

*(ไม่บังคับ) ใส่ข้อมูลทดสอบเริ่มต้น:*
```bash
node ace db:seed
```

#### 4. เริ่มต้นเซิร์ฟเวอร์
```bash
npm run dev
```
เซิร์ฟเวอร์จะเริ่มทำงานที่ `http://localhost:3333`

---

## 📡 สรุป RESTful API Endpoints

| Method | Endpoint | หน้าที่การทำงาน | Status Code สำเร็จ |
| :---: | :--- | :--- | :---: |
| `GET` | `/health` | ตรวจสอบสถานะการทำงานของ API และ Database | `200 OK` |
| `GET` | `/api/todos` | ดึงรายการ Todos ทั้งหมด (รองรับ Query: `?completed=true/false`) | `200 OK` |
| `POST` | `/api/todos` | สร้าง Todo ใหม่ (รับ Body: `{"title": "ชื่องาน"}`) | `201 Created` |
| `GET` | `/api/todos/:id` | ดึงข้อมูล Todo รายตัวตาม ID | `200 OK` |
| `PUT` | `/api/todos/:id` | แก้ไขข้อมูล Todo (รับ Body: `{"title": "..."}`) | `200 OK` |
| `PATCH` | `/api/todos/:id` | ปรับสถานะเสร็จสิ้นหรือชื่อ (รับ: `{"completed": true}`) | `200 OK` |
| `DELETE` | `/api/todos/:id` | ลบรายการ Todo ออกจากระบบ | `204 No Content` |

### ตัวอย่าง Response Format

#### 1. ดึงรายการสำเร็จ (`200 OK`)
```json
[
  {
    "id": 1,
    "title": "เขียนโค้ดส่งงาน Todo List",
    "completed": false,
    "createdAt": "2026-10-17T10:00:00.000+07:00",
    "updatedAt": "2026-10-17T10:00:00.000+07:00"
  }
]
```

#### 2. กรณีข้อมูลไม่ถูกต้อง (`422 Unprocessable Entity`)
```json
{
  "code": "E_VALIDATION_FAILURE",
  "message": "Validation failure",
  "errors": [
    {
      "field": "title",
      "rule": "required",
      "message": "title is required to create a todo"
    }
  ]
}
```

#### 3. กรณีไม่พบข้อมูล (`404 Not Found`)
```json
{
  "code": "E_ROW_NOT_FOUND",
  "message": "Todo not found",
  "errors": []
}
```

---

## การทดสอบอัตโนมัติ (Automated Testing with Postman)

โปรเจกต์นี้มาพร้อมชุดทดสอบ Postman Collection ที่ตั้งค่า Assertions ครอบคลุมทุกกรณีทั้ง Success Cases, Edge Cases, และ Validation Errors อยู่ที่โฟลเดอร์:
`postman/Todo-API.postman_collection.json`

### สรุปผลการทดสอบ:
- **Total Requests**: 17 Requests
- **Total Assertions**: 73 Assertions
- **Pass Rate**: **100% (0 Failures)**
- **Average Latency**: ~40ms

### วิธีสั่งรันการทดสอบผ่าน Newman CLI:
```bash
npx newman run postman/Todo-API.postman_collection.json --env-var "baseUrl=http://127.0.0.1:3333"
```

---

## Environment Variables Reference

| ตัวแปร | ค่าตัวอย่าง | คำอธิบาย |
| :--- | :---: | :--- |
| `PORT` | `3333` | พอร์ตของ API Server |
| `HOST` | `0.0.0.0` | Host Address |
| `NODE_ENV` | `development` | โหมดการทำงาน (`development` / `production`) |
| `APP_KEY` | *(สุ่ม)* | Secret key สำหรับแอป (สร้างด้วย `node ace generate:key`) |
| `PG_HOST` | `127.0.0.1` | ที่อยู่ของ PostgreSQL Database |
| `PG_PORT` | `5432` | พอร์ตของ PostgreSQL (หรือ `5433` หากรันผ่าน Docker Compose) |
| `PG_USER` | `postgres` | Database Username |
| `PG_PASSWORD` | `postgres` | Database Password |
| `PG_DB_NAME` | `todo_db` | Database Name |
| `CORS_ORIGIN` | `http://localhost:5173` | Allowed Frontend Origins สำหรับ CORS |
