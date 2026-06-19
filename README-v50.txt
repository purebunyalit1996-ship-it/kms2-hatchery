KMS2 Employee Free Date + Cache Fix v53

แก้ไข:
- Employee > คำขอ เลือกวันที่ได้อิสระ ไม่ล็อกวันที่เริ่ม/สิ้นสุด
- รองรับวันที่รูปแบบ dd/mm/yyyy, yyyy-mm-dd, พ.ศ. และวันที่เพิ่มเติมหลายวัน
- ลบ/แทนข้อความบล็อก "วันที่สิ้นสุดต้องไม่ก่อนวันที่เริ่ม"
- อัปเดต manifest.json และ manifest-employee.json เป็น v53
- อัปเดต login redirect เป็น v53
- service-worker.js ล้าง cache เก่า และใช้ no-store

ไฟล์ที่ต้องอัปโหลดทับ:
index.html
employee.html
login.html
manifest.json
manifest-employee.json
service-worker.js
README-v53.txt

URL:
login.html?v=53
index.html?v=53
employee.html?v=53

หลังอัปโหลด:
1) รอ GitHub Pages 1-3 นาที
2) Hard Refresh: Cmd+Shift+R
3) ถ้าเคย Add to Home Screen ให้ลบไอคอนเก่า แล้วเพิ่มใหม่
