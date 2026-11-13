// Telegram Bot API 10.4 HTML Widget + Netlify Functions.
// Configure BOT_TOKEN, WEBHOOK_SECRET in Netlify Environment Variables,
// scope Functions. MAP_URL is optional; defaults to origin of this site.
// This function responds to GET /.netlify/functions/telegram?health=1 for diagnostics.
const SHEET_ID='14sA0J06RdjW8OFSCoEF0vLXiRSWe81kq3m0Mv8wqClM';
const GID='142160930';
const HTML_WIDGET="<!doctype html><html lang=\"ru\"><head><style>\n*{box-sizing:border-box}body{margin:0;background:var(--tg-theme-bg-color,#fff);color:var(--tg-theme-text-color,#151515);font:13px/1.35 system-ui,sans-serif}button{font:inherit;cursor:pointer;color:inherit}button:disabled{opacity:.45}.w{padding:12px 12px 9px}.header{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:10px}.title{font-size:17px;font-weight:800;letter-spacing:-.3px}.count{font-size:11px;color:var(--tg-theme-hint-color,#818181);white-space:nowrap}.toolbar{display:flex;gap:6px}.city{display:flex;justify-content:space-between;align-items:center;flex:1;min-width:0;background:var(--tg-theme-secondary-bg-color,#f2f2f2);border:0;border-radius:11px;padding:9px 11px;text-align:left;font-weight:700}.city span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.filter{flex:0 0 79px;background:var(--tg-theme-secondary-bg-color,#f2f2f2);border:0;border-radius:11px;padding:9px 4px;font-size:12px;font-weight:700}.filter.on{background:#02d15c;color:#fff}.days,.pays{display:flex;gap:5px;margin-top:8px}.chip{flex:1;min-width:0;background:var(--tg-theme-secondary-bg-color,#f2f2f2);border:0;border-radius:9px;padding:7px 3px;font-size:11px;font-weight:700}.chip.on{background:var(--tg-theme-text-color,#111);color:var(--tg-theme-bg-color,#fff)}.pbox{margin-top:9px;padding-top:7px;border-top:1px solid var(--tg-theme-section-separator-color,#ededed)}.pname{font-size:10px;color:var(--tg-theme-hint-color,#888)}.results{margin-top:6px}.item{display:block;width:100%;border:0;border-bottom:1px solid var(--tg-theme-section-separator-color,#ededed);background:transparent;text-align:left;padding:10px 0 11px}.item:last-child{border-bottom:0}.jobrow{display:flex;align-items:baseline;gap:7px;justify-content:space-between}.job{font-size:14px;font-weight:800;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0}.price{color:#009c47;font-size:14px;font-weight:800;white-space:nowrap;font-variant-numeric:tabular-nums}.when{font-size:11px;color:var(--tg-theme-hint-color,#777);margin-top:4px}.brand{font-size:12px;font-weight:650;margin-top:5px}.addr{font-size:11px;color:var(--tg-theme-hint-color,#777);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:2px}.more{display:block;width:100%;padding:9px 8px;margin-top:3px;background:var(--tg-theme-secondary-bg-color,#f2f2f2);border:0;border-radius:9px;font-size:12px;font-weight:700;text-align:center}.more:disabled{opacity:.45}.back{border:0;background:transparent;font-weight:700;padding:10px 0 7px}.ct{width:100%;display:flex;justify-content:space-between;align-items:center;background:transparent;border:0;border-bottom:1px solid var(--tg-theme-section-separator-color,#ededed);padding:10px 2px;text-align:left;gap:8px}.ct.cur{background:#02d15c;color:#fff;border:0;border-radius:9px;padding:10px 8px}.cname{font-weight:700}.cnum{font-size:11px;color:var(--tg-theme-hint-color,#888)}.ct.cur .cnum{color:#fff}.empty{font-size:12px;color:var(--tg-theme-hint-color,#888);padding:22px 0;text-align:center}.error{color:#ad3131;font-size:11px;margin-top:7px}.busy{opacity:.65}#main[hidden],#chooser[hidden],#paybox[hidden],#more[hidden],#citymore[hidden],#error[hidden],[hidden]{display:none!important}.foot{height:24px}\n</style></head><body><div class=\"w\" id=\"app\"><div class=\"header\"><span class=\"title\">Смены рядом</span><span class=\"count\" id=\"count\">—</span></div><div class=\"toolbar\"><button class=\"city\" id=\"city\"><span>⌖ <span id=\"cityname\">Москва</span></span><span>⌄</span></button><button class=\"filter\" id=\"toggle\">Оплата ⚙</button></div><div id=\"main\"><div class=\"days\" id=\"days\"><button class=\"chip on\" data-day=\"all\">Все</button><button class=\"chip\" data-day=\"today\">Сегодня</button><button class=\"chip\" data-day=\"tomorrow\">Завтра</button></div><div class=\"pbox\" id=\"paybox\" hidden><div class=\"pname\">Оплата за смену</div><div class=\"pays\"><button class=\"chip on\" data-pay=\"0\">Любая</button><button class=\"chip\" data-pay=\"3000\">от 3 000 ₽</button><button class=\"chip\" data-pay=\"5000\">от 5 000 ₽</button></div></div><div class=\"results\" id=\"results\"><div class=\"empty\">Загружаем смены…</div></div><button class=\"more\" id=\"more\" hidden>Ещё смены →</button></div><div id=\"chooser\" hidden><button class=\"back\" id=\"back\">← К сменам</button><div id=\"citylist\"></div><button class=\"more\" id=\"citymore\">Другие города →</button></div><div class=\"error\" id=\"error\" hidden></div><div class=\"foot\"></div></div><script>\n(function(){'use strict';var W=window.TelegramWidget,d={v:'l',c:0,z:'Москва',f:'all',m:0,p:0,n:0,i:[]},app=by('app'),busy=false,payOpen=false;function by(s){return document.getElementById(s)}function esc(x){return String(x==null?'':x).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]})}function price(x){return Math.round(Number(x)||0).toLocaleString('ru-RU')+' ₽'}function warn(s){by('error').hidden=!s;by('error').textContent=s||''}function draw(){var choosing=d.v==='c';by('main').hidden=choosing;by('chooser').hidden=!choosing;by('cityname').textContent=d.z||'Выбрать город';by('count').textContent=choosing?'Выбрать город':(d.n||0)+' смен';by('toggle').hidden=choosing;by('paybox').hidden=!payOpen||choosing;by('toggle').classList.toggle('on',payOpen);if(choosing){by('citylist').innerHTML='';(d.g||[]).forEach(function(s){var b=document.createElement('button');b.className='ct'+(s.id===d.c?' cur':'');b.innerHTML='<span class=\"cname\">'+esc(s.name)+'</span><span class=\"cnum\">'+s.n+' смен</span>';b.addEventListener('click',function(){ask('l|'+s.id+'|'+d.f+'|'+d.m+'|0')});by('citylist').appendChild(b)});by('citymore').hidden=(d.n||0)<=5;return}document.querySelectorAll('[data-day]').forEach(function(b){b.classList.toggle('on',b.dataset.day===d.f)});document.querySelectorAll('[data-pay]').forEach(function(b){b.classList.toggle('on',+b.dataset.pay===+d.m)});by('results').innerHTML='';if(!d.i||!d.i.length){by('results').innerHTML='<div class=\"empty\">Смен по выбранным фильтрам нет</div>'}else{d.i.forEach(function(s){var b=document.createElement('button');b.className='item';b.innerHTML='<div class=\"jobrow\"><span class=\"job\">'+esc(s.t)+'</span><span class=\"price\">'+price(s.p)+'</span></div><div class=\"when\">'+esc(s.d)+' · '+esc(s.h)+(s.len?' · '+esc(s.len)+' ч':'')+'</div><div class=\"brand\">'+esc(s.b)+'</div><div class=\"addr\">'+esc(s.r)+'</div>';b.addEventListener('click',function(){if(/^https:\\/\\//.test(s.u||'')){if(W)W.openLink(s.u);else window.open(s.u,'_blank')}});by('results').appendChild(b)})}by('more').hidden=!d.n||d.n<=2;by('more').textContent=d.p+d.i.length>=d.n?'К первым сменам ↺':'Ещё смены →'}function apply(raw){try{var x=JSON.parse(raw);if(!x||!(x.v==='l'||x.v==='c'))throw Error();d=x;draw();warn(x.error||'')}catch(e){warn('Не удалось загрузить смены')}}function ask(s){if(busy)return;if(!W){warn('Данные обновляются внутри Telegram');return}busy=true;app.classList.add('busy');W.request(s).then(function(a){busy=false;app.classList.remove('busy');if(a.result)apply(a.result);else warn('Нет ответа бота')},function(e){busy=false;app.classList.remove('busy');warn('Ошибка соединения: '+(e.code||''))})}by('city').addEventListener('click',function(){if(d.v==='c')ask('l|'+d.c+'|'+d.f+'|'+d.m+'|0');else ask('c|0|'+d.c+'|'+d.f+'|'+d.m)});by('back').addEventListener('click',function(){ask('l|'+d.c+'|'+d.f+'|'+d.m+'|0')});by('citymore').addEventListener('click',function(){ask('c|'+((d.k||0)+1)+'|'+d.c+'|'+d.f+'|'+d.m)});by('toggle').addEventListener('click',function(){payOpen=!payOpen;draw()});document.querySelectorAll('[data-day]').forEach(function(b){b.addEventListener('click',function(){ask('l|'+d.c+'|'+b.dataset.day+'|'+d.m+'|0')})});document.querySelectorAll('[data-pay]').forEach(function(b){b.addEventListener('click',function(){ask('l|'+d.c+'|'+d.f+'|'+b.dataset.pay+'|0')})});by('more').addEventListener('click',function(){var pos=d.p+(d.i||[]).length;if(pos>=d.n)pos=0;ask('l|'+d.c+'|'+d.f+'|'+d.m+'|'+pos)});if(W){if(W.chatData)apply(W.chatData);W.onEvent('chatDataChanged',function(){if(W.chatData)apply(W.chatData)});W.ready()}else{apply(JSON.stringify({v:'l',c:0,z:'Москва',f:'all',m:0,p:0,n:296,i:[{t:'Уборка помещений',d:'14.11',h:'07:00–19:00',len:12,p:4360,b:'Лента',r:'Москва, улица Красная Пресня, 23',u:''},{t:'Выкладка товара',d:'14.11',h:'10:00–23:00',len:13,p:5824,b:'Бристоль',r:'Москва, улица Народного Ополчения, 28',u:''}]}))}})();\n</script></body></html>";
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
 offset=Math.max(0,Math.floor(+offset)||0);if(offset>=match.length)offset=0;
 const dataItem=s=>({t:s.t.slice(0,48),d:s.date.slice(8,10)+'.'+s.date.slice(5,7),h:s.h,
  len:Number.isFinite(s.len)&&s.len>0?s.len:0,b:s.b.slice(0,35),r:s.r.slice(0,82),p:Math.round(s.p),u:/^https:\/\//.test(s.u)&&s.u.length<=256?s.u:''});
 const items=match.slice(offset,offset+2).map(dataItem);
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
 // Most active cities first. IDs still refer to the same alphabetically indexed catalog.
 const ranked=options.map((o,id)=>({...o,id})).sort((a,b)=>
   (a.id===cityId?-1:b.id===cityId?1:0)||(b.n-a.n)||a.name.localeCompare(b.name,'ru'));
 const per=5,totalPages=Math.max(1,Math.ceil(ranked.length/per));
 page=Math.max(0,Math.floor(+page)||0)%totalPages;
 const list=ranked.slice(page*per,page*per+per).map(s=>({id:s.id,name:s.name,n:s.n}));
 const result={v:'c',c:cityId,z:options[cityId]?.name||'',f:safe.f,m:safe.m,k:page,n:options.length,g:list};
 // Keep the answer inside Telegram's 1024-byte limit.
 while(result.g.length>1&&new TextEncoder().encode(JSON.stringify(result)).length>1024)result.g.pop();
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
        allow_queries:true, width:0, height:0,
        reply_markup:{inline_keyboard:[[
          {text:'Открыть полную карту',web_app:{url:mapUrl}}
        ]]},
      });
    }
  } catch(e) {console.error('Telegram:',e);}
  return json({ok:true});
}
