KMS2 v60 Month Picker Stability Fix

แก้ไข:
1) ช่องเลือกเดือนที่แสดงเป็น -------- ---- แล้วกดเลือกไม่ได้
- ใส่ค่าเริ่มต้นเป็นเดือนปัจจุบันอัตโนมัติ
- เพิ่มปุ่ม 📅 สำรองข้างช่องเดือน
- ถ้า Native picker เด้ง/เลือกไม่ได้ ให้กดปุ่ม 📅 แล้วกรอก YYYY-MM ได้ทันที

2) ตรวจฝั่งผู้ดูแลและพนักงาน
- แก้ทั้ง index.html และ employee.html
- ช่องเดือนหลัก: monthPicker, summaryMonth, execMonth, myMonth, reportMonth, backupMonth
- คงระบบคำขอ v59: หลายวันเป็นคำขอเดียว, ไม่บันทึก RequestGroup/AllDates ในคำขอใหม่

URL:
login.html?v=60
index.html?v=60
employee.html?v=60

หลังอัป:
- รอ GitHub Pages 1–3 นาที
- Hard Refresh: Cmd + Shift + R
- ถ้าใช้ PWA ให้ลบไอคอนเก่าแล้ว Add ใหม่
