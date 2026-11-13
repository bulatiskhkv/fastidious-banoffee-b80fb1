// Telegram Bot API 10.4 HTML Widget + Netlify Functions.
// Configure BOT_TOKEN, WEBHOOK_SECRET in Netlify Environment Variables,
// scope Functions. MAP_URL is optional; defaults to origin of this site.
// This function responds to GET /.netlify/functions/telegram?health=1 for diagnostics.
const SHEET_ID='14sA0J06RdjW8OFSCoEF0vLXiRSWe81kq3m0Mv8wqClM';
const GID='142160930';
const HTML_WIDGET="<!doctype html><html lang=\"ru\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><style>\n*{box-sizing:border-box}body{margin:0;background:var(--tg-theme-bg-color,#fff);color:var(--tg-theme-text-color,#111);font:14px/1.35 system-ui,-apple-system,Arial,sans-serif}.w{padding:13px 12px 9px}.top{display:flex;align-items:center;justify-content:space-between;gap:8px}.ttl{font-size:18px;font-weight:850}.muted{font-size:11px;color:var(--tg-theme-hint-color,#888)}button{cursor:pointer;font-family:inherit}.place{display:block;border:0;border-radius:12px;background:var(--tg-theme-secondary-bg-color,#f2f2f2);color:var(--tg-theme-text-color,#111);font-size:13px;font-weight:740;padding:10px 12px;text-align:left;width:100%;margin:9px 0}.filterhead{font-size:10px;color:var(--tg-theme-hint-color,#888);margin:7px 0 5px}.filters{display:flex;gap:5px}.chip{background:var(--tg-theme-secondary-bg-color,#f0f0f0);color:var(--tg-theme-text-color,#111);border:0;border-radius:10px;padding:8px 3px;flex:1;min-width:0;font-size:11px;font-weight:700}.chip.on{background:var(--tg-theme-text-color,#111);color:var(--tg-theme-bg-color,#fff)}.results{margin-top:10px}.item{display:block;text-align:left;width:100%;color:inherit;background:transparent;border:0;border-bottom:1px solid var(--tg-theme-section-separator-color,#eaeaea);padding:10px 0 11px}.job{font-weight:850;font-size:16px;line-height:1.2;margin-bottom:5px}.line{display:flex;align-items:baseline;gap:6px;white-space:nowrap;margin:0 0 8px}.dt{font-size:11px;overflow:hidden;text-overflow:ellipsis}.dots{border-bottom:1px dotted var(--tg-theme-hint-color,#bbb);flex:1;min-width:8px}.money{font-weight:850;font-size:14px;color:#009f4b}.br{font-size:13px;margin-bottom:2px}.adr{font-size:11px;color:var(--tg-theme-hint-color,#777);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.navrow{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:10px}.page{font-size:11px;color:var(--tg-theme-hint-color,#888)}.nav{border:0;border-radius:9px;background:var(--tg-theme-secondary-bg-color,#f0f0f0);color:var(--tg-theme-text-color,#111);font-weight:750;padding:7px 14px}.nav:disabled{opacity:.35}.cities{margin-top:11px}.cities button.ct{width:100%;border:0;background:transparent;color:inherit;text-align:left;padding:10px 2px;border-bottom:1px solid var(--tg-theme-section-separator-color,#eee);display:flex;justify-content:space-between;gap:6px}.ct.cur{background:#02d15c;color:white;border-radius:9px;padding:10px 8px}.cname{font-weight:710;font-size:13px}.num{font-size:11px;opacity:.6;white-space:nowrap}.empty{padding:18px 5px;text-align:center;color:var(--tg-theme-hint-color,#888);font-size:12px}.note{text-align:center;color:var(--tg-theme-hint-color,#999);font-size:10px;margin-top:8px}.busy{opacity:.6}#main[hidden],#chooser[hidden]{display:none}\n</style></head><body><div class=\"w\" id=\"app\"><div class=\"top\"><div class=\"ttl\">Смены рядом</div><div class=\"muted\" id=\"count\">—</div></div><button class=\"place\" id=\"city\">⌖ <span id=\"cityname\">Выбрать город</span> ▾</button><div id=\"main\"><div class=\"filterhead\">Дата</div><div class=\"filters\" id=\"days\"><button class=\"chip on\" data-day=\"all\">Все</button><button class=\"chip\" data-day=\"today\">Сегодня</button><button class=\"chip\" data-day=\"tomorrow\">Завтра</button></div><div class=\"filterhead\">Оплата за смену</div><div class=\"filters\" id=\"pays\"><button class=\"chip on\" data-pay=\"0\">Любая</button><button class=\"chip\" data-pay=\"3000\">от 3 000 ₽</button><button class=\"chip\" data-pay=\"5000\">от 5 000 ₽</button></div><div class=\"results\" id=\"results\"><div class=\"empty\">Загружаем смены…</div></div><div class=\"navrow\"><button class=\"nav\" id=\"prev\">←</button><span class=\"page\" id=\"page\">—</span><button class=\"nav\" id=\"next\">→</button></div></div><div class=\"cities\" id=\"chooser\" hidden><button class=\"nav\" id=\"back\">← К сменам</button><div class=\"muted\" style=\"margin:12px 0 4px\">Выберите город</div><div id=\"citylist\"></div><div class=\"navrow\"><button class=\"nav\" id=\"cp\">←</button><span class=\"page\" id=\"citypage\">—</span><button class=\"nav\" id=\"cn\">→</button></div></div><div class=\"note\" id=\"status\">Выберите смену или откройте полную карту ниже</div></div><script>\n(function(){'use strict';var W=window.TelegramWidget,app=document.getElementById('app'),results=document.getElementById('results'),status=document.getElementById('status'),d={v:'l',c:0,z:'Москва',f:'all',m:0,p:0,n:0,i:[]},busy=false;function el(id){return document.getElementById(id)}function esc(s){return String(s==null?'':s).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]})}function money(n){return Number(n||0).toLocaleString('ru-RU')+' ₽'}function draw(){el('cityname').textContent=d.z||'Выбрать город';var cities=d.v==='c';el('main').hidden=cities;el('chooser').hidden=!cities;el('count').textContent=cities?'Города':d.n+' смен';if(cities){var all=d.n||0,per=7,cp=d.k||0;el('citypage').textContent=(cp+1)+' / '+Math.max(1,Math.ceil(all/per));el('cp').disabled=cp===0;el('cn').disabled=(cp+1)*per>=all;el('citylist').innerHTML='';(d.g||[]).forEach(function(s){var b=document.createElement('button');b.className='ct'+(s.id===d.c?' cur':'');b.innerHTML='<span class=\"cname\">'+esc(s.name)+'</span><span class=\"num\">'+s.n+' смен</span>';b.addEventListener('click',function(){ask('l|'+s.id+'|'+d.f+'|'+d.m+'|0')});el('citylist').appendChild(b)});return}document.querySelectorAll('[data-day]').forEach(function(b){b.classList.toggle('on',b.dataset.day===d.f)});document.querySelectorAll('[data-pay]').forEach(function(b){b.classList.toggle('on',Number(b.dataset.pay)===Number(d.m))});el('prev').disabled=d.p<=0;el('next').disabled=d.p+(d.i||[]).length>=d.n;el('page').textContent=d.n?((d.p+1)+'–'+(d.p+d.i.length)+' из '+d.n):'0 смен';results.innerHTML='';if(!d.i||!d.i.length){results.innerHTML='<div class=\"empty\">Смен по этим фильтрам нет</div>';return}d.i.forEach(function(s){var b=document.createElement('button');b.className='item';b.innerHTML='<div class=\"job\">'+esc(s.t)+'</div><div class=\"line\"><span class=\"dt\">'+esc(s.d)+' · '+esc(s.h)+(s.len?' · '+esc(s.len)+' ч':'')+'</span><span class=\"dots\"></span><span class=\"money\">'+money(s.p)+'</span></div><div class=\"br\">'+esc(s.b)+'</div><div class=\"adr\">'+esc(s.r)+'</div>';b.addEventListener('click',function(){if(/^https:\\/\\//.test(s.u||'')){if(W)W.openLink(s.u);else window.open(s.u,'_blank')}});results.appendChild(b)})}function apply(raw){try{var x=JSON.parse(raw);if(!x||!['l','c'].includes(x.v))throw 0;d=x;draw();status.textContent=x.error||'Нажмите на смену, чтобы открыть объявление'}catch(e){status.textContent='Ошибка загрузки данных'}}function ask(s){if(busy)return;if(!W){status.textContent='Фильтры работают в Telegram';return}busy=true;app.classList.add('busy');W.request(s).then(function(a){busy=false;app.classList.remove('busy');if(a.result)apply(a.result);else status.textContent='Нет ответа'},function(e){busy=false;app.classList.remove('busy');status.textContent='Ошибка: '+(e.code||'соединение')})}el('city').addEventListener('click',function(){ask('c|0|'+d.c+'|'+d.f+'|'+d.m)});el('back').addEventListener('click',function(){ask('l|'+d.c+'|'+d.f+'|'+d.m+'|0')});el('cp').addEventListener('click',function(){ask('c|'+Math.max(0,d.k-1)+'|'+d.c+'|'+d.f+'|'+d.m)});el('cn').addEventListener('click',function(){ask('c|'+(d.k+1)+'|'+d.c+'|'+d.f+'|'+d.m)});document.querySelectorAll('[data-day]').forEach(function(b){b.addEventListener('click',function(){ask('l|'+d.c+'|'+b.dataset.day+'|'+d.m+'|0')})});document.querySelectorAll('[data-pay]').forEach(function(b){b.addEventListener('click',function(){ask('l|'+d.c+'|'+d.f+'|'+b.dataset.pay+'|0')})});el('prev').addEventListener('click',function(){ask('l|'+d.c+'|'+d.f+'|'+d.m+'|'+Math.max(0,d.p-3))});el('next').addEventListener('click',function(){ask('l|'+d.c+'|'+d.f+'|'+d.m+'|'+(d.p+d.i.length))});if(W){if(W.chatData)apply(W.chatData);W.onEvent('chatDataChanged',function(){if(W.chatData)apply(W.chatData)});W.ready()}else{apply(JSON.stringify({v:'l',c:0,z:'Москва',f:'all',m:0,p:0,n:3,i:[{t:'Уборка помещений',d:'14.11',h:'07:00–19:00',len:12,p:4360,b:'Лента',r:'Москва, улица Красная Пресня, 23',u:''},{t:'Выкладка товара',d:'14.11',h:'10:00–23:00',len:13,p:5824,b:'Бристоль',r:'Москва, улица Примерная, 43',u:''},{t:'Обслуживание покупателей',d:'15.11',h:'09:00–18:00',len:9,p:3200,b:'Магнит',r:'Москва, улица Примерная, 11',u:''}]}));status.textContent='Демонстрация интерфейса'}})();\n</script></body></html>";
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
    output.push({city,b:cell(c[1]),t:cell(c[4]),r:address,p:number(c[9]),len:Math.round(number(c[8])/60*10)/10,u:cell(c[3]),date,h:hh(c[6])+'–'+hh(c[7]),a,o});
  }
  cachedRows = output; cachedAt = Date.now();
  return output;
}
function moscowToday(delta=0){const pts=new Intl.DateTimeFormat('en-US',{timeZone:'Europe/Moscow',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const get=t=>pts.find(p=>p.type===t)?.value||'';const utc=new Date(Date.UTC(+get('year'),+get('month')-1,+get('day')+delta));return utc.toISOString().slice(0,10);}
function cities(data){
 const counts=new Map();for(const s of data){const name=s.city.trim();if(name)counts.set(name,(counts.get(name)||0)+1)}
 return [...counts].map(([name,n])=>({name,n})).sort((a,b)=>a.name.localeCompare(b.name,'ru',{sensitivity:'base'}));
}
function getCityId(options){const x=options.findIndex(s=>s.name.toLowerCase()==='москва');return Math.max(0,x)}
function filterArgs(f,m){return {f:['all','today','tomorrow'].includes(f)?f:'all',m:[0,3000,5000].includes(+m)?+m:0}}
function payload(data,cityId,day='all',minPay=0,offset=0){
 const options=cities(data),safe=filterArgs(day,minPay);day=safe.f;minPay=safe.m;
 cityId=Number.isInteger(+cityId)&&+cityId>=0&&+cityId<options.length?+cityId:getCityId(options);
 const name=options[cityId]?.name||'';
 const today=moscowToday(),tomorrow=moscowToday(1);
 const match=data.filter(s=>s.city===name&&(day==='today'?s.date===today:day==='tomorrow'?s.date===tomorrow:true)&&Number.isFinite(s.p)&&s.p>=minPay);
 match.sort((a,b)=>a.date.localeCompare(b.date)||(b.p||0)-(a.p||0));
 offset=Math.max(0,Math.floor(+offset)||0);if(offset>=match.length)offset=Math.max(0,match.length-3);
 const dataItem=s=>({t:s.t.slice(0,48),d:s.date.slice(8,10)+'.'+s.date.slice(5,7),h:s.h,
  len:Number.isFinite(s.len)&&s.len>0?s.len:0,b:s.b.slice(0,35),r:s.r.slice(0,82),p:Math.round(s.p),u:/^https:\/\//.test(s.u)&&s.u.length<=256?s.u:''});
 const items=match.slice(offset,offset+3).map(dataItem);
 let result={v:'l',c:cityId,z:name,f:day,m:minPay,p:offset,n:match.length,i:items};
 while(items.length>1&&new TextEncoder().encode(JSON.stringify(result)).length>1024)items.pop();
 // In the unlikely event that an individual URL is too long, show the shift without a link, not an invalid URL.
 if(new TextEncoder().encode(JSON.stringify(result)).length>1024&&items.length){items[0].u='';items[0].r=items[0].r.slice(0,45);}
 if(new TextEncoder().encode(JSON.stringify(result)).length>1024)result.i=[];
 return JSON.stringify(result);
}
function cityPayload(data,page=0,cityId,day='all',minPay=0){
 const options=cities(data),safe=filterArgs(day,minPay);
 cityId=Number.isInteger(+cityId)&&+cityId>=0&&+cityId<options.length?+cityId:getCityId(options);
 page=Math.max(0,Math.min(Math.max(0,Math.ceil(options.length/7)-1),Math.floor(+page)||0));
 const result={v:'c',c:cityId,z:options[cityId]?.name||'',f:safe.f,m:safe.m,k:page,n:options.length,
  g:options.slice(page*7,page*7+7).map((s,j)=>({id:page*7+j,name:s.name,n:s.n}))};
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
      const mode=parts[0], cityId=Number(parts[1]||'0');
      const day=mode==='c'?parts[3]:parts[2],minPay=mode==='c'?parts[4]:parts[3];
      const pos=mode==='c'?Number(parts[1]||'0'):Number(parts[4]||'0');
      let answer;
      try {
        const data=await rows();
        if(mode==='c')answer=cityPayload(data,Number(parts[1]),Number(parts[2]),parts[3],parts[4]);
        else answer=payload(data,cityId,day,minPay,pos);
      } catch(e) {
        console.error('Google Sheets:',e);
        answer=JSON.stringify({v:'l',c:0,z:'',f:'all',m:0,p:0,n:0,i:[],error:'Источник смен недоступен'});
      }
      await tg(env,'answerWidgetQuery',{widget_query_id:q.id,data:answer});
    } else if (update.message?.chat?.type==='private' && /^\/(start|map|widget)(?:\s|$)/.test(update.message.text||'')) {
      const chatId=update.message.chat.id;
      let state;
      try {state=payload(await rows(),NaN,'all',0,0)} catch(e) {
        console.error('Google Sheets:',e);
        state=JSON.stringify({v:'l',c:0,z:'',f:'all',m:0,p:0,n:0,i:[],error:'Источник смен недоступен'});
      }
      const mapUrl = (env.MAP_URL||u.origin).trim();
      await tg(env,'sendWidget', {
        chat_id:chatId, html:HTML_WIDGET, chat_data:state,
        caption:'Подработка · доступные смены', allow_queries:true,
        reply_markup:{inline_keyboard:[[
          {text:'Открыть полную карту',web_app:{url:mapUrl}}
        ]]},
      });
    }
  } catch(e) {console.error('Telegram:',e);}
  return json({ok:true});
}
