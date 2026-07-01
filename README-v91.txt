KMS2 v91 Direct Inline Save Button Fix

แก้จาก v90:
- ปุ่ม “บันทึกวันที่เลือก” ยังไม่เปิดฟอร์ม
- v91 แก้โดยตรงที่ปุ่ม:
  - ใส่ onclick ตรง ๆ ให้เรียก openForm()
  - ใส่ addEventListener แบบ capture
  - เพิ่มปุ่มสำรอง “✅ กรอกเวรจากวันที่เลือก” ใต้ปุ่มเดิม
- ถ้าปุ่มเดิมยังโดนโค้ดเก่าบล็อก ให้กดปุ่มสำรองได้ทันที
- ฟอร์มกรอกเปิดได้เอง และบันทึกผ่าน action=addDuty
- ใช้ได้ทั้งเพิ่มเวรและเวรแทน
- ไม่แตะ Apps Script

URL:
login.html?v=91
index.html?v=91
employee.html?v=91
