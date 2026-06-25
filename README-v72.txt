KMS2 v74 Full Stack Request Core Fix

ไฟล์ในชุดนี้:
- index.html
- employee.html
- login.html
- manifest.json
- manifest-employee.json
- service-worker.js
- Code.gs  ← สำคัญ ต้องนำไปวางใน Google Apps Script

แก้ที่ต้นเหตุ:
1) Employee ส่งคำขอ 1–365 วันได้จริง
2) Google Sheet บันทึกคำขอหลายวันเป็น 1 แถว
3) Admin เห็นคำขอเดียวพร้อมช่วงวันที่ครบ
4) อนุมัติครั้งเดียว แล้ว Apps Script บันทึกสถานะทุกวันในช่วงที่ขอ
5) เวรแทนใช้ addDutyRange ฝั่ง Apps Script เพื่อกันเวรซ้ำ

ขั้นตอนติดตั้ง:
1. อัปโหลดไฟล์เว็บทั้งหมดขึ้น GitHub
2. เปิด Google Apps Script ของ KMS2
3. คัดลอก Code.gs ใน zip นี้ ไปวางทับ Code.gs เดิม
4. Deploy > New deployment > Web app
5. เลือก Execute as: Me และ Who has access: Anyone
6. ใช้ URL เดิมได้ถ้า redeploy เป็น deployment เดิม หรือถ้าได้ URL ใหม่ให้เปลี่ยน API_URL ใน index.html และ employee.html
7. เปิดทดสอบ:
   login.html?v=74
   index.html?v=74
   employee.html?v=74

หมายเหตุ:
- แถวทดสอบเก่าที่เคยบันทึกผิดใน Google Sheet ต้องลบเองก่อนทดสอบใหม่
- ถ้าคุณ Deploy Apps Script แล้วได้ URL ใหม่ ให้บอก URL ใหม่มา ผมจะใส่ให้ในไฟล์เว็บชุดถัดไป
