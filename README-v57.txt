KMS2 Factory Control Center UI v59

เป้าหมาย:
- ปรับเฉพาะ Visual/UI Layer ให้เป็นแนว Factory Control Center
- เก็บ Workflow, ID, onclick, JavaScript Logic, Google Apps Script และ Google Sheets เดิมไว้
- ไม่เปลี่ยนโครงสร้างข้อมูล

ไฟล์ที่ต้องอัปโหลดทับ:
- index.html
- employee.html
- login.html
- manifest.json
- manifest-employee.json
- service-worker.js

URL ทดสอบ:
- login.html?v=59
- index.html?v=59
- employee.html?v=59

หลังอัปโหลด:
1) รอ GitHub Pages 1-3 นาที
2) Hard Refresh: Cmd + Shift + R
3) ถ้าเคย Add to Home Screen ให้ลบไอคอนเก่า แล้ว Add ใหม่

หมายเหตุ:
- รอบนี้เป็น UI Refactor แบบ CSS-first
- ถ้าหน้าไหนมีจุดอ่านยาก ให้แก้ CSS เพิ่มได้โดยไม่กระทบ Logic
