KMS2 v91 Direct Form Open Fix

แก้จาก v91:
- v91 เลือกวันได้แล้ว แต่กด “บันทึกวันที่เลือก” แล้วไม่เปิดฟอร์มกรอก
- v91 แก้เฉพาะจุดนี้โดยตรง
- ผูกปุ่ม “บันทึกวันที่เลือก” แบบ hard wire ทั้ง addEventListener และ onclick
- ถ้า modal เดิมไม่เปิด v91 จะเปิด modal สำรองของตัวเอง
- อ่านวันที่จาก:
  - state ของ v91
  - cell ที่มี class kms2-v91-selected
  - ข้อความเลือกวันที่บนหน้า
- บันทึกจริงผ่าน action=addDuty
- ใช้ได้ทั้งเพิ่มเวรและเวรแทนจากปฏิทิน
- ไม่แตะ Apps Script

URL:
login.html?v=91
index.html?v=91
employee.html?v=91
