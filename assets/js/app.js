(()=>{
const ADD_EMAIL=''; // TODO: e-mail платформы для заявок компаний (пока не задан)
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let lang=new URLSearchParams(location.search).get('lang')==='uz'?'uz':(localStorage.getItem('lang')||'ru');
function setLang(l){lang=l;document.documentElement.lang=l;
 $$('[data-ru]').forEach(e=>e.hidden=l!=='ru');$$('[data-uz]').forEach(e=>e.hidden=l!=='uz');
 $$('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===l));
 $$('[data-ph-ru]').forEach(i=>i.placeholder=i.dataset['ph'+(l==='uz'?'Uz':'Ru')]);
 localStorage.setItem('lang',l);filter();}
$$('[data-lang]').forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
const q=$('#q'),items=$$('.res');
const norm=s=>s.toLowerCase().replace(/[ʻʼ'`ё]/g,m=>m==='ё'?'е':'').trim();
const alias={chilonzor:'чиланзар',yunusobod:'юнусабад','mirzo ulugbek':'мирзо-улугбек','мирзо улугбек':'мирзо-улугбек',sergeli:'сергели',yakkasaroy:'яккасарай'};
function filter(){const v=norm(q.value);const t=alias[v]||v;let n=0;
 items.forEach(li=>{const ok=!t||norm(li.dataset.search).includes(t);li.hidden=!ok;if(ok)n++});
 $('#empty').hidden=n>0;
 $('#count').textContent=lang==='uz'?`${n} ta kompaniya`:`${n} ${n%10===1&&n%100!==11?'компания':(n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?'компании':'компаний')}`;
 $$('.chips button').forEach(b=>b.classList.toggle('is-on',b.dataset.q===t));}
q.addEventListener('input',filter);
$('#searchForm').onsubmit=e=>{e.preventDefault();filter();$('#companies').scrollIntoView()};
$$('.chips button').forEach(b=>b.onclick=()=>{q.value=q.value===b.dataset.q?'':b.dataset.q;filter()});
$('#reset').onclick=()=>{q.value='';filter()};
const p0=new URLSearchParams(location.search).get('q');if(p0)q.value=p0;
$('#addForm').onsubmit=e=>{e.preventDefault();const f=e.target,st=$('#addStatus');
 if(!f.name.value.trim()||f.phone.value.replace(/\D/g,'').length<9){st.textContent=lang==='uz'?'Nomi va telefonni kiriting':'Укажите название и телефон';return}
 const body=`Компания: ${f.name.value}\nТелефон: ${f.phone.value}\nСайт: ${f.site.value}\nРайоны/бренды: ${f.info.value}`;
 location.href=`mailto:${ADD_EMAIL}?subject=${encodeURIComponent('Добавить компанию — Ремонт котлов Ташкент')}&body=${encodeURIComponent(body)}`;
 st.textContent=lang==='uz'?'Pochta dasturi ochildi':'Открылось почтовое приложение — отправьте письмо';};
setLang(lang);
})();
