KMS2 Professional Workspace Edition v44

เป้าหมาย:
- เปิดใช้งานจริงได้ทันที โดยใช้ฐานระบบ v43 เดิม
- ปรับ UX/UI เป็น Workspace Navigation ทั้งฝั่งผู้ดูแลและพนักงาน
- ลดหน้าเลื่อนยาว ให้กดเมนูแล้วเปิดเฉพาะฟังก์ชันนั้น
- คง Google Sheets, Login, Admin/Supervisor, Employee, ระบบเวร, คำขอ, ปฏิทิน, เวรแทน และ Pagination เดิมไว้ครบ

สิ่งที่เปลี่ยน:
- Admin Workspace: หน้าหลัก / จัดเวร / คำขอ / รายงาน / พนักงาน / ตั้งค่า
- Employee Workspace: วันนี้ / ดูเวร / คำขอ / สถานะ / ปฏิทิน / ตั้งค่า
- ปุ่มและ Card นุ่มขึ้น สม่ำเสมอขึ้น
- Calendar เวรแทนใช้ Badge สั้น ๆ ในช่องวัน และดูรายละเอียดเต็มหลังแตะวันที่
- Service Worker อัปเป็น v44

ไฟล์ที่ต้องอัปโหลดแทนของเดิม:
index.html
employee.html
login.html
manifest.json
manifest-employee.json
service-worker.js

URL หลังอัปโหลด:
Admin: index.html?v=44
Employee: employee.html?v=44
Login: login.html

หมายเหตุ:
หลังอัปโหลดขึ้น GitHub ให้กด Shift + Command + R หรือเปิด URL v44 โดยตรง
