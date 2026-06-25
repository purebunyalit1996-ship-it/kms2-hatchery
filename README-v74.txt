KMS2 v74 Emergency Remove Substitute Badge Layer

แก้ด่วน:
- ลบ CSS/JS ป้ายเวรแทนที่ทำให้เกิดก้อนสีส้มซ้อนกันทั้งหน้า
- ลบ logic ที่จับคำว่าเวรแทนแล้วไปแตะกล่องแม่
- คืนหน้า Admin/Employee ให้กลับมาแสดงปกติ
- ไม่แตะ Apps Script
- ไม่แตะระบบคำขอหลายวัน
- ไม่แตะ Google Sheet

หมายเหตุ:
- v74 เป็น emergency UI recovery เพื่อหยุดปัญหาหน้าพังทันที
- เวรแทนยังควรแก้ที่ข้อมูล/logic หลังบ้านต่อ แต่ไม่ควรใช้วิธีเติม badge แบบจับ DOM กว้างอีก

URL:
login.html?v=74
index.html?v=74
employee.html?v=74
