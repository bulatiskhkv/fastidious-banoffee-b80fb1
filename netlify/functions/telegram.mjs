// Telegram Bot API 10.4 HTML Widget + Netlify Functions.
// Configure BOT_TOKEN, WEBHOOK_SECRET in Netlify Environment Variables,
// scope Functions. MAP_URL is optional; defaults to origin of this site.
// This function responds to GET /.netlify/functions/telegram?health=1 for diagnostics.
const SHEET_ID='14sA0J06RdjW8OFSCoEF0vLXiRSWe81kq3m0Mv8wqClM';
const GID='142160930';
const HTML_WIDGET="<!doctype html><html lang=\"ru\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><style>\n*{box-sizing:border-box}body{margin:0;font:13px/1.4 system-ui,-apple-system,Arial,sans-serif;background:var(--tg-theme-bg-color,#fff);color:var(--tg-theme-text-color,#141414)}.w{padding:13px 12px 12px}.hd{display:flex;align-items:center;gap:9px;margin-bottom:11px}.logo{background:#02d15c;color:#071b0e;display:grid;place-items:center;border-radius:12px;width:39px;height:39px;font-weight:900;font-size:25px}.hmain{flex:1}.tiny{font-size:10px;color:var(--tg-theme-hint-color,#777);letter-spacing:.4px}.title{font-size:18px;font-weight:850;line-height:1.1}.count{font-size:11px;color:var(--tg-theme-hint-color,#777)}.filtertitle{font-size:10px;color:var(--tg-theme-hint-color,#777);margin:7px 0 5px}.chips{display:flex;gap:5px}.chip{flex:1;min-width:0;border:0;border-radius:9px;background:var(--tg-theme-secondary-bg-color,#f0f0f0);color:var(--tg-theme-text-color,#222);padding:8px 1px;font-size:11px;font-weight:700;cursor:pointer}.chip.active{background:var(--tg-theme-text-color,#111);color:var(--tg-theme-bg-color,#fff)}.list{margin-top:10px;border-top:1px solid var(--tg-theme-section-separator-color,#e7e7e7)}.shift{display:block;width:100%;text-align:left;background:transparent;color:inherit;border:0;border-bottom:1px solid var(--tg-theme-section-separator-color,#ededed);padding:9px 2px 10px;cursor:pointer}.first{display:flex;align-items:center;gap:6px}.brand{font-size:11px;color:var(--tg-theme-hint-color,#777);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}.price{font-size:16px;font-weight:850;white-space:nowrap}.job{font-size:13px;font-weight:750;margin:1px 0 2px;line-height:1.3}.details{font-size:11px;color:var(--tg-theme-hint-color,#777);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.go{font-size:12px;color:var(--tg-theme-link-color,#1885c5)}.pager{display:flex;justify-content:space-between;align-items:center;margin:9px 0 12px;gap:4px}.page{color:var(--tg-theme-hint-color,#777);font-size:11px}.nav{background:var(--tg-theme-secondary-bg-color,#f0f0f0);color:var(--tg-theme-text-color,#111);border:0;border-radius:9px;padding:6px 13px;font-weight:750}.nav:disabled{opacity:.3}.primary{display:block;width:100%;border:0;border-radius:13px;background:#02d15c;color:#07180c;font:800 14px system-ui,-apple-system,sans-serif;padding:14px 8px;cursor:pointer}.note{font-size:10px;color:var(--tg-theme-hint-color,#777);text-align:center;margin-top:7px}.empty{padding:20px 5px;color:var(--tg-theme-hint-color,#777);text-align:center}.busy{opacity:.65}\n</style></head><body><div class=\"w\" id=\"app\"><div class=\"hd\"><div class=\"logo\">↗</div><div class=\"hmain\"><div class=\"tiny\">КАРТА ПОДРАБОТОК · МОСКВА</div><div class=\"title\">Найти смену</div></div><div class=\"count\" id=\"count\">—</div></div><div class=\"filtertitle\">Когда</div><div class=\"chips\" id=\"days\"><button class=\"chip active\" data-day=\"all\">Все</button><button class=\"chip\" data-day=\"today\">Сегодня</button><button class=\"chip\" data-day=\"tomorrow\">Завтра</button></div><div class=\"filtertitle\">Оплата за смену</div><div class=\"chips\" id=\"pays\"><button class=\"chip active\" data-pay=\"0\">Любая</button><button class=\"chip\" data-pay=\"3000\">от 3 000 ₽</button><button class=\"chip\" data-pay=\"5000\">от 5 000 ₽</button></div><div id=\"list\" class=\"list\"><div class=\"empty\">Загружаем смены…</div></div><div class=\"pager\"><button class=\"nav\" id=\"prev\">←</button><span class=\"page\" id=\"page\">1 / 1</span><button class=\"nav\" id=\"next\">→</button></div><button class=\"primary\" id=\"map\">Смотреть на карте ↗</button><div class=\"note\" id=\"status\">Смены из Google Sheets</div></div><script>\n(function(){'use strict';var W=window.TelegramWidget,app=document.getElementById('app'),list=document.getElementById('list'),count=document.getElementById('count'),status=document.getElementById('status'),pageLabel=document.getElementById('page'),current={f:'all',m:0,p:0,n:0,i:[]},busy=false;function esc(s){return String(s==null?'':s).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]})}function fmt(n){return Number(n||0).toLocaleString('ru-RU')+' ₽'}function draw(){document.querySelectorAll('[data-day]').forEach(function(b){b.classList.toggle('active',b.dataset.day===current.f)});document.querySelectorAll('[data-pay]').forEach(function(b){b.classList.toggle('active',Number(b.dataset.pay)===Number(current.m))});count.textContent=current.n+' смен';var total=Math.max(1,Math.ceil(current.n/3)),p=Number(current.p)||0;pageLabel.textContent=(p+1)+' / '+total;document.getElementById('prev').disabled=p===0;document.getElementById('next').disabled=p+1>=total;list.innerHTML='';if(!current.i.length){list.innerHTML='<div class=\"empty\">По этим фильтрам смен нет</div>';return}current.i.forEach(function(s){var b=document.createElement('button');b.className='shift';b.innerHTML='<div class=\"first\"><span class=\"brand\">'+esc(s.b)+'</span><span class=\"price\">'+fmt(s.p)+'</span></div><div class=\"job\">'+esc(s.t)+'</div><div class=\"details\">'+esc(s.d)+' · '+esc(s.h)+'</div><div class=\"details\">'+esc(s.r)+'</div>';b.addEventListener('click',function(){if(/^https:\\/\\//.test(s.u||'')){if(W)W.openLink(s.u);else window.open(s.u,'_blank')}});list.appendChild(b)})}function apply(raw){try{var d=JSON.parse(raw);if(!d||!Array.isArray(d.i))throw 0;current=d;draw();status.textContent=d.error||'Нажмите на смену, чтобы открыть объявление'}catch(e){status.textContent='Не удалось загрузить смены'}}function ask(f,m,p){if(busy)return;if(!W){current.f=f;current.m=m;current.p=p;draw();return}busy=true;app.classList.add('busy');W.request(f+'|'+m+'|'+p).then(function(res){busy=false;app.classList.remove('busy');if(res.result)apply(res.result);else status.textContent='Нет ответа'},function(err){busy=false;app.classList.remove('busy');status.textContent='Не удалось обновить: '+(err.code||'ошибка')})}document.querySelectorAll('[data-day]').forEach(function(b){b.addEventListener('click',function(){ask(b.dataset.day,current.m,0)})});document.querySelectorAll('[data-pay]').forEach(function(b){b.addEventListener('click',function(){ask(current.f,+b.dataset.pay,0)})});document.getElementById('prev').addEventListener('click',function(){ask(current.f,current.m,Math.max(0,current.p-1))});document.getElementById('next').addEventListener('click',function(){ask(current.f,current.m,current.p+1)});document.getElementById('map').addEventListener('click',function(){var url='https://t.me/avitogigBot?startapp';if(W)W.openTelegramLink(url);else window.open(url,'_blank')});if(W){if(W.chatData)apply(W.chatData);else draw();W.onEvent('chatDataChanged',function(){if(W.chatData)apply(W.chatData)});W.ready();if(!W.chatData)ask('all',0,0)}else{status.textContent='Демонстрация интерфейса · в Telegram будут реальные смены';apply(JSON.stringify({f:'all',m:0,p:0,n:3,i:[{b:'Магнит',p:3200,t:'Помощь в торговом зале',d:'14.11',h:'09:00–18:00',r:'Москва, улица Примерная, 1',u:''},{b:'Дикси',p:2840,t:'Сборка заказов',d:'14.11',h:'10:00–19:00',r:'Москва, улица Примерная, 2',u:''},{b:'Бристоль',p:3500,t:'Выкладка товара',d:'15.11',h:'11:00–20:00',r:'Москва, улица Примерная, 3',u:''}]}))}})();\n</script></body></html>\n";
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
function payload(data,day='all',minPay=0,page=0){
 const today=moscowToday(),tomorrow=moscowToday(1);
 const matches=data.filter(s=>s.city.toLowerCase()==='москва'
   && (day==='today'?s.date===today:day==='tomorrow'?s.date===tomorrow:true)
   && Number.isFinite(s.p)&&s.p>=minPay);
 matches.sort((a,b)=>b.date.localeCompare(a.date)||(b.p||0)-(a.p||0));
 const pageSize=3;
 const maxPage=Math.max(0,Math.ceil(matches.length/pageSize)-1);
 page=Math.max(0,Math.min(maxPage,Math.floor(page)));
 const chosen=matches.slice(page*pageSize,(page+1)*pageSize);
 let items=chosen.map(s=>({b:s.b.slice(0,22),t:s.t.slice(0,54),r:s.r.slice(0,78),
  p:Math.round(s.p),u:/^https:\/\//.test(s.u)?s.u:'',d:s.date.slice(8,10)+'.'+s.date.slice(5,7),h:s.h}));
 let result={f:day,m:minPay,p:page,n:matches.length,i:items};
 while(items.length && new TextEncoder().encode(JSON.stringify(result)).length>1024)items.pop();
 if(new TextEncoder().encode(JSON.stringify(result)).length>1024)result={f:day,m:minPay,p:page,n:matches.length,i:[]};
 return JSON.stringify(result);
}
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
      const parts=String(q.data||'').split('|');
      const day=['all','today','tomorrow'].includes(parts[0])?parts[0]:'all';
      const minPay=[0,3000,5000].includes(Number(parts[1]))?Number(parts[1]):0;
      const page=/^\d{1,3}$/.test(parts[2]||'')?Number(parts[2]):0;
      let answer;
      try {answer=payload(await rows(),day,minPay,page)} catch(e) {
        console.error('Google Sheets:',e);
        answer=JSON.stringify({f:day,m:minPay,p:page,n:0,i:[],error:'Источник смен недоступен'});
      }
      await tg(env,'answerWidgetQuery',{widget_query_id:q.id,data:answer});
    } else if (update.message?.chat?.type==='private' && /^\/(start|map|widget)(?:\s|$)/.test(update.message.text||'')) {
      const chatId=update.message.chat.id;
      let state;
      try {state=payload(await rows(),'all',0,0)} catch(e) {
        console.error('Google Sheets:',e);
        state=JSON.stringify({f:'all',m:0,p:0,n:0,i:[],error:'Источник смен недоступен'});
      }
      const mapUrl = (env.MAP_URL||u.origin).trim();
      await tg(env,'sendWidget', {
        chat_id:chatId, html:HTML_WIDGET, chat_data:state,
        caption:'Смены · Москва', allow_queries:true,
        reply_markup:{inline_keyboard:[[
          {text:'Открыть полную карту',web_app:{url:mapUrl}}
        ]]},
      });
    }
  } catch(e) {console.error('Telegram:',e);}
  return json({ok:true});
}
