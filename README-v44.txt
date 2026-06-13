KMS2 Professional Workspace Production v44

ไฟล์ชุดนี้เป็นเวอร์ชันพร้อมใช้งานจริง โดยใช้ฟังก์ชันเดิมจาก v43 และปรับ UI/UX เป็น Workspace Navigation

ไฟล์ที่ต้องอัปโหลดแทนของเดิม:
- index.html
- employee.html
- login.html
- manifest.json
- manifest-employee.json
- service-worker.js

URL หลังอัปโหลด:
- Admin/Supervisor: index.html?v=44
- Employee: employee.html?v=44
- Login: login.html

สิ่งที่ปรับ:
- Admin Workspace: หน้าหลัก / จัดเวร / คำขอ / รายงาน / พนักงาน / ตั้งค่า
- Employee Workspace: วันนี้ / ดูเวร / คำขอ / สถานะ / ปฏิทิน / ตั้งค่า
- คง Google Sheets และฟังก์ชันเดิมไว้
- เวรแทนในปฏิทินแสดงเป็น Badge สั้น
- ปุ่มและ Card ดูนุ่มขึ้น
- ลดหน้าเลื่อนยาว

หมายเหตุ: หลังอัป GitHub ให้เปิดด้วย ?v=44 และกด Shift + Command + R
