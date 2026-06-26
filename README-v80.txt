KMS2 v80 Calendar Substitute Direct Save Fix

แก้จาก v79:
- ปัญหา: เลือกกะใน popup แล้ว แต่กดบันทึกขึ้น “กรุณาเลือกกะเวร”
- สาเหตุ: v79 ยังเรียก saveDuty() เดิม ทำให้ validation ไปตรวจช่องกะของฟอร์มหลักด้านหลัง
- v80 แก้ให้เวรแทนจากปฏิทินบันทึกตรงผ่าน API addDuty
- ใช้กะจาก popup จริง
- บันทึก staff เป็น “คนแทน”
- ใส่ note [เวรแทน] พร้อมคนเดิม / คนแทน / กะ / เหตุผล
- หลังบันทึกจะปิด popup, ออกจากโหมดเลือก, refresh data/calendar

URL:
login.html?v=80
index.html?v=80
employee.html?v=80
