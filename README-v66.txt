KMS2 v66 Recovery Stable

เป้าหมาย:
- กู้ระบบให้กลับมากดใช้งานได้ก่อน
- แก้อาการกล่องขยับ/กระพริบเอง
- แก้ dropdown/select เด้งปิด
- แก้รายชื่อพนักงาน/กะเวร/ช่องวันเดือนปีใช้งานไม่ได้

สิ่งที่ทำ:
- ลบ script ซ้อนที่แก้ DOM ซ้ำ
- ลบ setInterval ที่เกี่ยวกับ date/month/clean display
- ลบ input wrapping/prompt picker ที่ทำให้ dropdown พัง
- ลบ animation ที่ทำให้กล่องขยับ
- คง UI Factory Control Center ไว้
- ใช้ native date/month picker ของ browser แบบปลอดภัย

URL:
login.html?v=66
index.html?v=66
employee.html?v=66

หลังอัป:
- รอ GitHub Pages 1–3 นาที
- Hard Refresh: Cmd + Shift + R
- ถ้าใช้ PWA ให้ลบไอคอนเก่าแล้ว Add ใหม่
