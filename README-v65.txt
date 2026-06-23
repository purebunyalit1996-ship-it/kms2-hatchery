KMS2 v65 Interaction Recovery Fix

แก้ด่วน:
- แก้อาการกด dropdown/select/date/month แล้วเด้งทั้งหมด
- ลบโค้ด setInterval ที่แก้ DOM ซ้ำออกจากระบบ date/month
- ไม่ wrap input ซ้ำ
- ไม่บังคับเปิด picker
- คืน select รายชื่อพนักงาน/กะเวร/ฟังก์ชันอื่นให้กดใช้งานได้
- คง UI Factory Control Center ไว้
- ใช้ native date/month picker ของเบราว์เซอร์ พร้อมปรับสีเข้าธีมมืด

URL:
login.html?v=65
index.html?v=65
employee.html?v=65
