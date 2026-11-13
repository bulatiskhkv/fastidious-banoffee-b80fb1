// Telegram Bot API 10.4 HTML Widget + Netlify Functions.
// Configure BOT_TOKEN, WEBHOOK_SECRET in Netlify Environment Variables,
// scope Functions. MAP_URL is optional; defaults to origin of this site.
// This function responds to GET /.netlify/functions/telegram?health=1 for diagnostics.
const SHEET_ID='14sA0J06RdjW8OFSCoEF0vLXiRSWe81kq3m0Mv8wqClM';
const GID='142160930';
const HTML_WIDGET="<!doctype html><html lang=\"ru\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><style>\n*{box-sizing:border-box}body{margin:0;font:14px/1.35 system-ui,Arial,sans-serif;color:var(--tg-theme-text-color,#161616);background:var(--tg-theme-bg-color,#fff)}.w{padding:12px 12px 10px}.head{display:flex;align-items:center;gap:9px;margin-bottom:12px}.logo{height:37px;width:37px;display:flex;align-items:center;justify-content:center;border-radius:12px;background:#02d15c;color:#09190d;font-size:23px;font-weight:900}.headtext{flex:1;min-width:0}.sub{font-size:10px;color:var(--tg-theme-hint-color,#858585);letter-spacing:.5px}.title{font-size:18px;font-weight:800;line-height:1.1;margin-top:3px}button{border:0;font:inherit;cursor:pointer}.refresh{width:34px;height:34px;background:var(--tg-theme-secondary-bg-color,#f0f0f0);color:var(--tg-theme-text-color,#111);border-radius:10px;font-size:19px}.chips{display:flex;gap:6px;margin-bottom:10px}.chip{flex:1;padding:9px 2px;border-radius:11px;background:var(--tg-theme-secondary-bg-color,#f1f1f1);color:var(--tg-theme-text-color,#111);font-size:12px;font-weight:600}.chip.on{background:var(--tg-theme-text-color,#171717);color:var(--tg-theme-bg-color,#fff)}.scene{position:relative;height:196px;border-radius:15px;background:#eaf0e9;overflow:hidden}.roads{position:absolute;inset:0;width:100%;height:100%}.pin{position:absolute;transform:translate(-50%,-50%);border:2px solid #fff;background:#278de2;color:white;font-size:11px;font-weight:800;border-radius:999px;min-width:30px;height:30px;padding:0 6px;box-shadow:0 2px 7px #0003}.pin.on{background:#101010;border:3px solid #02d15c;min-width:37px;height:37px}.tag{position:absolute;left:8px;bottom:8px;background:#ffffffde;border-radius:7px;padding:4px 7px;color:#63716b;font-size:10px}.detail{padding:11px 0 8px;min-height:122px}.price{font-size:23px;font-weight:850;white-space:nowrap}.meta{display:flex;justify-content:space-between;align-items:center;gap:5px}.brand{color:var(--tg-theme-hint-color,#777);font-size:12px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.work{font-size:14px;font-weight:750;margin-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.address{font-size:11px;color:var(--tg-theme-hint-color,#888);margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.date{font-size:11px;margin-top:4px}.action{display:flex;gap:7px;margin-top:10px}.primary{background:#02d15c;color:#071b0d;flex:1;border-radius:10px;padding:11px 9px;font-weight:800;font-size:12px}.secondary{background:var(--tg-theme-secondary-bg-color,#f1f1f1);color:var(--tg-theme-text-color,#111);border-radius:10px;padding:11px 12px;font-size:12px;font-weight:700}.status{font-size:11px;color:var(--tg-theme-hint-color,#888);padding:3px 1px 1px}.empty{font-size:14px;color:var(--tg-theme-hint-color,#777);padding:24px 5px 10px;text-align:center}.isbusy{opacity:.65}@media(max-width:300px){.scene{height:160px}.price{font-size:20px}.w{padding:8px}}\n</style><div class=\"w\"><div class=\"head\"><div class=\"logo\">↗</div><div class=\"headtext\"><div class=\"sub\">АВИТО ПОДРАБОТКА</div><div class=\"title\">Смены рядом</div></div><button class=\"refresh\" id=\"refresh\">↻</button></div><div class=\"chips\"><button class=\"chip on\" data-day=\"all\">Все</button><button class=\"chip\" data-day=\"today\">Сегодня</button><button class=\"chip\" data-day=\"tomorrow\">Завтра</button></div><div class=\"scene\"><svg class=\"roads\" viewBox=\"0 0 340 196\" preserveAspectRatio=\"none\"><path d=\"M-10 27L355 76M-15 160L359 114M60 -10L96 209M217 -10L198 210M311 -10L283 211M0 188L351 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"13\"/><path d=\"M-10 27L355 76M-15 160L359 114M60 -10L96 209M217 -10L198 210M311 -10L283 211M0 188L351 24\" fill=\"none\" stroke=\"#d8e0d8\" stroke-width=\"1\"/><path d=\"M-10 105Q76 77 140 129T355 129\" fill=\"none\" stroke=\"#b3dceb\" stroke-width=\"17\"/><path d=\"M-10 105Q76 77 140 129T355 129\" fill=\"none\" stroke=\"#dff2fa\" stroke-width=\"8\"/></svg><div id=\"pins\"></div><div class=\"tag\">Схема расположения · Москва</div></div><div class=\"detail\" id=\"detail\"><div class=\"empty\">Загружаем актуальные смены…</div></div><div class=\"action\"><button id=\"open\" class=\"primary\">Посмотреть смену ↗</button><button id=\"full\" class=\"secondary\">Вся карта ↗</button></div><div class=\"status\" id=\"status\">Данные из Google Sheets</div></div><script>\n(function(){'use strict';var W=window.TelegramWidget,items=[],chosen=0,currentDay='all',root=document.querySelector('.w'),pins=document.getElementById('pins'),detail=document.getElementById('detail'),status=document.getElementById('status'),buttons=document.querySelectorAll('[data-day]');var MAP='https://YOUR-MAP.pages.dev';function esc(s){return String(s==null?'':s).replace(/[&<>\"']/g,function(x){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',\"'\":'&#39;'}[x]})}function text(s){return String(s||'').slice(0,160)}function fmt(s){return Number(s||0).toLocaleString('ru-RU')+' ₽'}function setDay(v){currentDay=v;buttons.forEach(function(b){b.classList.toggle('on',b.dataset.day===v)})}function render(){pins.innerHTML='';var count=items.length;if(count){var lats=items.map(function(s){return Number(s.a)||0}),lons=items.map(function(s){return Number(s.o)||0}),lo=Math.min.apply(null,lons),hi=Math.max.apply(null,lons),la=Math.min.apply(null,lats),ha=Math.max.apply(null,lats);items.forEach(function(s,i){var x=(20+60*(Number(s.o)-lo)/Math.max(.01,hi-lo)),y=(20+60*(ha-Number(s.a))/Math.max(.01,ha-la));var b=document.createElement('button');b.className='pin'+(i===chosen?' on':'');b.style.left=x+'%';b.style.top=y+'%';b.textContent=String(i+1);b.addEventListener('click',function(){chosen=i;render()});pins.appendChild(b)})}var s=items[chosen];if(!s){detail.innerHTML='<div class=\"empty\">Нет смен для выбранного периода</div>'}else{detail.innerHTML='<div class=\"meta\"><span class=\"brand\">'+esc(text(s.b))+'</span><strong class=\"price\">'+fmt(s.p)+'</strong></div><div class=\"work\">'+esc(text(s.t))+'</div><div class=\"date\">'+esc(text(s.d))+' · '+esc(text(s.h))+'</div><div class=\"address\">'+esc(text(s.r))+'</div>'}document.getElementById('open').disabled=!s||!s.u;status.textContent=count?'Показано '+count+' точек · всего смен: '+(total||count):'Смены не найдены';document.querySelector('.tag').textContent='Схема точек · Москва'}var total=0;function apply(raw){try{var d=JSON.parse(raw);if(!d||!Array.isArray(d.i))throw 0;items=d.i;total=Number(d.n)||0;chosen=0;if(d.f)setDay(d.f);render();if(d.error)status.textContent=d.error}catch(e){status.textContent='Не удалось прочитать данные'}}function ask(day){if(!W){setDay(day);status.textContent='Демо: данные доступны в Telegram';return}root.classList.add('isbusy');W.request('d:'+day).then(function(res){root.classList.remove('isbusy');if(res.result)apply(res.result);else status.textContent='Нет ответа от бота'},function(e){root.classList.remove('isbusy');status.textContent='Ошибка: '+(e.code||'нет связи')})}buttons.forEach(function(b){b.addEventListener('click',function(){ask(b.dataset.day)})});document.getElementById('refresh').addEventListener('click',function(){ask(currentDay)});document.getElementById('open').addEventListener('click',function(){var s=items[chosen];if(s&&/^https:\\/\\//.test(s.u)){if(W)W.openLink(s.u);else window.open(s.u,'_blank')}});document.getElementById('full').addEventListener('click',function(){if(W)W.openLink(MAP);else window.open(MAP,'_blank')});if(W){if(W.chatData)apply(W.chatData);else{render();}W.onEvent('chatDataChanged',function(){if(W.chatData)apply(W.chatData)});W.ready();if(!W.chatData)ask('all')}else{status.textContent='ДЕМО · реальные смены появятся в Telegram';apply(JSON.stringify({f:'all',n:3,i:[{b:'Магнит',p:3200,t:'Помощь в торговом зале',d:'Пример даты',h:'09:00–18:00',r:'Москва, демонстрационный адрес',a:55.74,o:37.56,u:''},{b:'Дикси',p:2800,t:'Сборка заказов',d:'Пример даты',h:'10:00–19:00',r:'Москва, демонстрационный адрес',a:55.78,o:37.69,u:''},{b:'Бристоль',p:3500,t:'Выкладка товара',d:'Пример даты',h:'11:00–20:00',r:'Москва, демонстрационный адрес',a:55.67,o:37.62,u:''}]}))}})();\n</script></html>";
const headers={'content-type':'application/json; charset=utf-8'};
function json(body,status=200){return new Response(JSON.stringify(body),{status,headers});}
async function tg(env,method,params){
  const r=await fetch('https://api.telegram.org/bot'+env.BOT_TOKEN+'/'+method,{method:'POST',headers,body:JSON.stringify(params)});
  const j=await r.json();
  if(!j.ok)throw new Error('Telegram '+method+': '+(j.description||r.status));
  return j.result;
}
function cell(c){if(!c)return '';const x=(c.f!==undefined&&String(c.f).trim())?c.f:c.v;return x==null?'':String(x).trim();}
function number(c){if(!c)return NaN;const raw=c.v??c.f;if(typeof raw==='number')return raw;const s=String(raw??'').replace(/[\s\u00a0\u202f]/g,'').replace(/[^0-9,.-]/g,'').replace(',','.');return s?Number(s):NaN;}
function dstr(c){const s=cell(c);let m=s.match(/Date\((\d{4}),(\d{1,2}),(\d{1,2})/);if(m)return m[1]+'-'+String(+m[2]+1).padStart(2,'0')+'-'+m[3].padStart(2,'0');m=s.match(/^(\d{2})\.(\d{2})\.(\d{4})/);if(m)return m[3]+'-'+m[2]+'-'+m[1];return s.slice(0,10);}
function hh(c){const s=cell(c),m=s.match(/Date\([^)]*,(\d{1,2}),(\d{1,2})/);return m?m[1].padStart(2,'0')+':'+m[2].padStart(2,'0'):s.slice(0,5);}
let cachedRows = null, cachedAt = 0;
async function rows(){
  if(cachedRows && Date.now() - cachedAt < 45000) return cachedRows;
  const url='https://docs.google.com/spreadsheets/d/'+SHEET_ID+'/gviz/tq?gid='+GID+'&headers=0&tqx=out%3Ajson';
  const resp=await fetch(url,{headers:{'user-agent':'Mozilla/5.0'}});
  if(!resp.ok)throw new Error('Sheets HTTP '+resp.status);
  const src=await resp.text();const st=src.indexOf('setResponse(');if(st<0)throw new Error('Google Sheets: no public response; check sharing');
  const from=st+'setResponse('.length,end=src.lastIndexOf(')');
  const j=JSON.parse(src.slice(from,end));
  if(j.status!=='ok')throw new Error('Google Sheets '+(j.errors?.[0]?.detailed_message||'error'));
  const output=[];
  for(const row of (j.table?.rows||[])){
    const c=row?.c||[],city=cell(c[0]),address=cell(c[2]);
    if(!city||!address||city.toLowerCase()==='город')continue;
    const a=number(c[12]),o=number(c[13]),date=dstr(c[5]);
    if(!Number.isFinite(a)||!Number.isFinite(o)||!date||Math.abs(a)>90||Math.abs(o)>180)continue;
    output.push({city,b:cell(c[1]),t:cell(c[4]),r:address,p:number(c[9]),u:cell(c[3]),date,h:hh(c[6])+'–'+hh(c[7]),a,o});
  }
  cachedRows = output; cachedAt = Date.now();
  return output;
}
function moscowToday(delta=0){const pts=new Intl.DateTimeFormat('en-US',{timeZone:'Europe/Moscow',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const get=t=>pts.find(p=>p.type===t)?.value||'';const utc=new Date(Date.UTC(+get('year'),+get('month')-1,+get('day')+delta));return utc.toISOString().slice(0,10);}
function payload(data,day){
 const today=moscowToday();const tomorrow=moscowToday(1);
 const matches=data.filter(s=>s.city.toLowerCase()==='москва'&&(day==='today'?s.date===today:day==='tomorrow'?s.date===tomorrow:true));
 matches.sort((a,b)=>b.date.localeCompare(a.date)||(b.p||0)-(a.p||0));
 // One marker per address in preview; show 4-5 in a 1024-byte Telegram answer.
 const seen=new Set(),out=[];
 for(const s of matches){const k=s.a.toFixed(5)+','+s.o.toFixed(5);if(seen.has(k))continue;seen.add(k);
 const date=s.date.slice(8,10)+'.'+s.date.slice(5,7);
 out.push({b:s.b.slice(0,25),t:s.t.slice(0,55),r:s.r.slice(0,80),p:Number.isFinite(s.p)?Math.round(s.p):0,u:/^https:\/\//.test(s.u)?s.u:'',d:date,h:s.h,a:+s.a.toFixed(5),o:+s.o.toFixed(5)});
 if(out.length===5)break;}
 let result={f:day,n:matches.length,i:out};
 while(out.length&&new TextEncoder().encode(JSON.stringify(result)).length>1024)out.pop();
 // If even one entry is too long, shrink strings without inventing values.
 if(new TextEncoder().encode(JSON.stringify(result)).length>1024)result={f:day,n:matches.length,i:[]};
 return JSON.stringify(result);
}
function setHtml(mapUrl){return HTML_WIDGET.replace('https://YOUR-MAP.pages.dev', mapUrl.trim());}

export default async function handler(request) {
  const env = {
    BOT_TOKEN: Netlify.env.get('BOT_TOKEN'),
    WEBHOOK_SECRET: Netlify.env.get('WEBHOOK_SECRET'),
    MAP_URL: Netlify.env.get('MAP_URL'),
  };
  const u = new URL(request.url);
  if(request.method === 'GET' && u.searchParams.get('health') === '1') {
    return json({ok:true, service:'Avito Gig Telegram Widget', bot_configured:!!env.BOT_TOKEN, secret_configured:!!env.WEBHOOK_SECRET});
  }
  if(request.method !== 'POST') return json({error:'POST only'},405);
  if(!env.BOT_TOKEN || !env.WEBHOOK_SECRET) return json({error:'BOT_TOKEN / WEBHOOK_SECRET missing'},503);
  if(request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== env.WEBHOOK_SECRET) return json({error:'forbidden'},403);
  let update; try {update=await request.json()} catch{return json({error:'invalid json'},400)}
  try {
    const q=update.widget_query;
    if(q && q.chat?.type === 'private') {
      const day=['d:all','d:today','d:tomorrow'].includes(q.data)?q.data.slice(2):'all';
      let answer;
      try {answer=payload(await rows(),day)} catch(e) {
        console.error('Google Sheets:',e);
        answer=JSON.stringify({f:day,n:0,i:[],error:'Источник смен недоступен'});
      }
      await tg(env,'answerWidgetQuery',{widget_query_id:q.id,data:answer});
    } else if (update.message?.chat?.type==='private' && /^\/(start|map|widget)(?:\s|$)/.test(update.message.text||'')) {
      const chatId=update.message.chat.id;
      let state;
      try {state=payload(await rows(),'all')} catch(e) {
        console.error('Google Sheets:',e);
        state=JSON.stringify({f:'all',n:0,i:[],error:'Источник смен недоступен'});
      }
      const mapUrl = (env.MAP_URL||u.origin).trim();
      await tg(env,'sendWidget', {
        chat_id:chatId, html:setHtml(mapUrl), chat_data:state,
        caption:'Карта смен · Москва', allow_queries:true,
      });
    }
  } catch(e) {console.error('Telegram:',e);}
  return json({ok:true});
}
