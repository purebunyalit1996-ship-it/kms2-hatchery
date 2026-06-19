KMS2 v46 Employee Multi-day Request Fix

แก้ไขฝั่ง Employee ฟังก์ชันคำขอ:
- ส่งคำขอหลายวันได้ในครั้งเดียว
- ใช้วันที่เริ่ม + วันที่สิ้นสุด
- เพิ่มวันที่เพิ่มเติมได้หลายวัน
- ไม่ต้องกรอกทีละวัน
- ใช้ได้กับขอลาและขอเปลี่ยนเวร

ไฟล์ที่ต้องอัปโหลดแทนของเดิม:
index.html
employee.html
login.html
manifest.json
manifest-employee.json
service-worker.js

URL หลังอัปโหลด:
index.html?v=46
employee.html?v=46
login.html?v=46
