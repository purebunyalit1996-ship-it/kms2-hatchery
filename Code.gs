
/************************************************************
 * KMS2 Apps Script v72 — Full Stack Request Core Fix
 * ใช้กับ Google Sheets: พนักงาน, คำขอ, กระเวร, ตารางเวร, บันทึกสถานะ
 * วิธีใช้: วางทับ Code.gs เดิม แล้ว Deploy > New deployment > Web app
 ************************************************************/
const KMS2_SHEETS = {
  staff: 'พนักงาน',
  requests: 'คำขอ',
  shifts: 'กระเวร',
  duties: 'ตารางเวร',
  logs: 'บันทึกสถานะ'
};
const KMS2_HEADERS = {
  requests: ['วันที่ส่งคำขอ','พนักงาน','วันที่เกี่ยวข้อง','ประเภทคำขอ','รายละเอียด','สถานะ'],
  duties: ['วันที่','พนักงาน','กะเวร','ตู้','หมายเหตุ'],
  logs: ['วันที่','เวลา','พนักงาน','กะเวร','ตู้','สถานะ','หมายเหตุ']
};
function doGet(e){ return handleKMS2_(e); }
function doPost(e){ return handleKMS2_(e); }
function handleKMS2_(e){
  const p = (e && e.parameter) || {};
  const action = p.action || 'getData';
  try{
    setupKMS2Sheets_();
    let out;
    if(action === 'getData') out = getData_();
    else if(action === 'addRequestRange') out = addRequestRange_(p);
    else if(action === 'addRequest') out = addRequestCompat_(p);
    else if(action === 'approveRequestRange' || action === 'approveRequest') out = setRequestStatus_(p.row, 'อนุมัติ', true);
    else if(action === 'rejectRequestRange' || action === 'rejectRequest') out = setRequestStatus_(p.row, 'ปฏิเสธ', true);
    else if(action === 'addDutyRange') out = addDutyRange_(p);
    else if(action === 'addDuty') out = addDutyCompat_(p);
    else if(action === 'updateDuty') out = updateRow_(KMS2_SHEETS.duties, p.row, [cleanDate_(p.date), p.staff||'', p.shift||'', p.machine||'', p.note||'']);
    else if(action === 'deleteDuty') out = deleteRow_(KMS2_SHEETS.duties, p.row);
    else if(action === 'addLog') out = addLog_(p);
    else if(action === 'updateLog') out = updateRow_(KMS2_SHEETS.logs, p.row, [cleanDate_(p.date), p.time||'', p.staff||'', p.shift||'', p.machine||'', p.status||'', p.note||'']);
    else if(action === 'deleteLog') out = deleteRow_(KMS2_SHEETS.logs, p.row);
    else out = {ok:false, error:'Unknown action: '+action};
    return output_(out, p.callback);
  }catch(err){
    return output_({ok:false, error:String(err && err.stack || err)}, p.callback);
  }
}
function output_(obj, cb){
  const text = JSON.stringify(obj);
  if(cb) return ContentService.createTextOutput(cb + '(' + text + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.JSON);
}
function ss_(){ return SpreadsheetApp.getActive(); }
function sheet_(name){ return ss_().getSheetByName(name) || ss_().insertSheet(name); }
function setupKMS2Sheets_(){
  Object.keys(KMS2_HEADERS).forEach(k=>{
    const sh = sheet_(KMS2_SHEETS[k]);
    const headers = KMS2_HEADERS[k];
    if(sh.getLastRow() < 1) sh.appendRow(headers);
    else {
      const row = sh.getRange(1,1,1,Math.max(headers.length, sh.getLastColumn())).getValues()[0];
      headers.forEach((h,i)=>{ if(!row[i]) sh.getRange(1,i+1).setValue(h); });
    }
  });
}
function rows_(name){
  const sh = sheet_(name); const values = sh.getDataRange().getDisplayValues();
  if(values.length < 2) return [];
  const h = values[0];
  return values.slice(1).map((r,i)=>{ const o={_row:i+2}; h.forEach((x,j)=>o[x]=r[j]||''); return o; });
}
function getData_(){
  return {
    ok:true,
    staff: rows_(KMS2_SHEETS.staff),
    requests: rows_(KMS2_SHEETS.requests),
    shifts: rows_(KMS2_SHEETS.shifts),
    duties: rows_(KMS2_SHEETS.duties),
    logs: rows_(KMS2_SHEETS.logs)
  };
}
function pad2_(n){ return String(n).padStart(2,'0'); }
function ymd_(d){ return d.getFullYear()+'-'+pad2_(d.getMonth()+1)+'-'+pad2_(d.getDate()); }
function fixYear_(y){ y=Number(y); if(y<100)y+=2000; if(y>=2600)y-=633; else if(y>2400)y-=543; return y; }
function cleanDate_(raw, baseMonth){
  let s = String(raw||'').trim(); if(!s) return '';
  s = s.replace(/[.]/g,'/').replace(/\s+/g,'');
  let m = s.match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/); if(m) return fixYear_(m[1])+'-'+pad2_(m[2])+'-'+pad2_(m[3]);
  m = s.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{2,4})$/); if(m) return fixYear_(m[3])+'-'+pad2_(m[2])+'-'+pad2_(m[1]);
  m = s.match(/^(\d{1,2})[-\/](\d{1,2})$/); if(m){ const b=(baseMonth||ymd_(new Date())).slice(0,7); return b.slice(0,4)+'-'+pad2_(m[2])+'-'+pad2_(m[1]); }
  m = s.match(/^(\d{1,2})$/); if(m){ const b=(baseMonth||ymd_(new Date())).slice(0,7); return b+'-'+pad2_(m[1]); }
  return '';
}
function dateList_(start, end){
  start = cleanDate_(start); end = cleanDate_(end, (start||ymd_(new Date())).slice(0,7)) || start;
  if(!start) return [];
  let a = start.split('-').map(Number), b = end.split('-').map(Number);
  let s = new Date(a[0],a[1]-1,a[2]), e = new Date(b[0],b[1]-1,b[2]);
  if(e < s){ const t=s; s=e; e=t; }
  const out=[];
  for(let d=new Date(s); d<=e; d.setDate(d.getDate()+1)) out.push(ymd_(d));
  if(out.length > 365) throw new Error('เลือกได้ไม่เกิน 365 วันต่อรายการ');
  return out;
}
function parseExtraDates_(text, baseMonth){
  const out=[]; const add=d=>{ if(d && out.indexOf(d)<0) out.push(d); };
  String(text||'').split(/[\n,，\s]+/).map(x=>x.trim()).filter(Boolean).forEach(x=>add(cleanDate_(x, baseMonth)));
  return out;
}
function rangeText_(dates){ if(!dates.length) return ''; return dates.length===1 ? dates[0] : dates[0]+' ถึง '+dates[dates.length-1]; }
function addRequestRange_(p){
  const staff = p.staff || '';
  const type = p.type || 'ขอลา';
  if(!staff) throw new Error('missing staff');
  let dates = dateList_(p.startDate || p.date, p.endDate || p.date || p.startDate);
  parseExtraDates_(p.extraDates, (dates[0]||ymd_(new Date())).slice(0,7)).forEach(d=>{ if(dates.indexOf(d)<0) dates.push(d); });
  dates.sort();
  const days = dates.length;
  const related = rangeText_(dates);
  const cleanDetail = String(p.detail||'').replace(/\s*\|\s*RequestGroup:[^|]+/g,'').replace(/\s*\|\s*AllDates:[^|]+/g,'').trim();
  const detail = [cleanDetail, days>1 ? 'คำขอ '+days+' วัน: '+related : 'คำขอ 1 วัน: '+related].filter(Boolean).join(' | ');
  sheet_(KMS2_SHEETS.requests).appendRow([ymd_(new Date()), staff, related, type, detail, 'รออนุมัติ']);
  return {ok:true, days, related};
}
function addRequestCompat_(p){
  if(String(p.date||'').indexOf('ถึง') >= 0){
    const parts = String(p.date).split('ถึง').map(x=>x.trim());
    p.startDate = parts[0]; p.endDate = parts[1] || parts[0];
    return addRequestRange_(p);
  }
  p.startDate = p.date || p.startDate; p.endDate = p.endDate || p.date || p.startDate;
  return addRequestRange_(p);
}
function setRequestStatus_(row, status, writeLogs){
  row = Number(row); if(!row || row < 2) throw new Error('invalid row');
  const sh = sheet_(KMS2_SHEETS.requests);
  sh.getRange(row,6).setValue(status);
  if(writeLogs && status === 'อนุมัติ'){
    const r = sh.getRange(row,1,1,6).getDisplayValues()[0];
    const staff = r[1], related = r[2], type = r[3], detail = r[4];
    const dates = parseRelatedDates_(related);
    dates.forEach(d=>appendLogUnique_(d, staff, '', '', status, type+' | '+detail));
  }
  return {ok:true, row, status};
}
function parseRelatedDates_(text){
  const s = String(text||'');
  if(s.indexOf('ถึง') >= 0){ const p=s.split('ถึง').map(x=>x.trim()); return dateList_(p[0],p[1]); }
  const d=cleanDate_(s); return d?[d]:[];
}
function appendLogUnique_(date, staff, shift, machine, status, note){
  const sh = sheet_(KMS2_SHEETS.logs);
  const existing = rows_(KMS2_SHEETS.logs).some(r=>r['วันที่']===date && r['พนักงาน']===staff && r['สถานะ']===status && String(r['หมายเหตุ']||'').indexOf(note)>=0);
  if(!existing) sh.appendRow([date, Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'HH:mm'), staff, shift, machine, status, note]);
}
function parseSubDateSet_(text, baseMonth){
  const set = {}; parseExtraDates_(text, baseMonth).forEach(d=>set[d]=true); return set;
}
function addDutyRange_(p){
  const dates = dateList_(p.startDate || p.date, p.endDate || p.date || p.startDate);
  const subSet = parseSubDateSet_(p.subDates, (dates[0]||ymd_(new Date())).slice(0,7));
  const mainStaff = p.staff || '';
  const subStaff = p.subStaff || '';
  const shift = p.shift || '';
  const machine = p.machine || '';
  const baseNote = p.note || '';
  let mainCount=0, subCount=0;
  dates.forEach(date=>{
    let staff = mainStaff;
    let note = baseNote;
    if(subSet[date] && subStaff){
      staff = subStaff;
      note = [baseNote, '[เวรแทน] เวรหลัก: '+mainStaff+' | เวรแทน: '+subStaff+' | เหตุผล: '+(p.subReason||'เวรแทน')].filter(Boolean).join('\n');
      subCount++;
    }else mainCount++;
    upsertDuty_(date, staff, shift, machine, note, mainStaff, !!subSet[date]);
  });
  // เวรแทนนอกช่วงเวรหลักก็เพิ่มได้อิสระ
  Object.keys(subSet).filter(d=>dates.indexOf(d)<0).forEach(date=>{
    const note = [baseNote, '[เวรแทน] เวรหลัก: '+mainStaff+' | เวรแทน: '+subStaff+' | เหตุผล: '+(p.subReason||'เวรแทน')].filter(Boolean).join('\n');
    upsertDuty_(date, subStaff, shift, machine, note, mainStaff, true); subCount++;
  });
  return {ok:true, mainCount, subCount};
}
function addDutyCompat_(p){ return addDutyRange_({startDate:p.date, endDate:p.date, staff:p.staff, shift:p.shift, machine:p.machine, note:p.note}); }
function upsertDuty_(date, staff, shift, machine, note, mainStaff, isSub){
  const sh = sheet_(KMS2_SHEETS.duties);
  const data = rows_(KMS2_SHEETS.duties);
  // ลบ/อัปเดต slot เดียวกันเพื่อกันเวรซ้ำ โดย key = วันที่ + กะ + ตู้
  const found = data.find(r => r['วันที่']===date && r['กะเวร']===shift && r['ตู้']===machine);
  if(found){ sh.getRange(found._row,1,1,5).setValues([[date, staff, shift, machine, note]]); }
  else sh.appendRow([date, staff, shift, machine, note]);
}
function addLog_(p){ sheet_(KMS2_SHEETS.logs).appendRow([cleanDate_(p.date), p.time||'', p.staff||'', p.shift||'', p.machine||'', p.status||'', p.note||'']); return {ok:true}; }
function updateRow_(sheetName, row, values){ row=Number(row); if(!row||row<2) throw new Error('invalid row'); sheet_(sheetName).getRange(row,1,1,values.length).setValues([values]); return {ok:true,row}; }
function deleteRow_(sheetName, row){ row=Number(row); if(!row||row<2) throw new Error('invalid row'); sheet_(sheetName).deleteRow(row); return {ok:true,row}; }
