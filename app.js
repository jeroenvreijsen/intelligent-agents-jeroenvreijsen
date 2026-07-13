const config=window.PORTFOLIO_CONFIG||{};
const list=document.querySelector('#writing-list');
const status=document.querySelector('#status');
const search=document.querySelector('#search');
const reader=document.querySelector('#reader');
const article=document.querySelector('#article');
let works=[];

function cleanTitle(name){return name.replace(/\.(md|txt)$/i,'').replace(/^\d+[-_ ]*/,'').replace(/[-_]/g,' ')}
function plainText(markdown){return markdown.replace(/^---[\s\S]*?---/,'').replace(/[#>*_`\[\]()]/g,' ').replace(/https?:\/\/\S+/g,'').replace(/\s+/g,' ').trim()}
function frontMatter(markdown){const match=markdown.match(/^---\n([\s\S]*?)\n---/);if(!match)return{};return Object.fromEntries(match[1].split('\n').map(line=>{const i=line.indexOf(':');return i<0?[line.trim(),'']:[line.slice(0,i).trim(),line.slice(i+1).trim().replace(/^['"]|['"]$/g,'')]}))}
function details(file,markdown){const meta=frontMatter(markdown),body=plainText(markdown);return{file,markdown,title:meta.title||cleanTitle(file.name),date:meta.date||'',category:meta.category||'Essay',excerpt:meta.description||body.slice(0,190)+(body.length>190?'…':''),minutes:Math.max(1,Math.round(body.split(/\s+/).length/220))}}
function render(items){list.innerHTML='';status.textContent=items.length?'':works.length?'No writing matches your search.':'No writing has been published yet.';items.forEach((work,i)=>{const el=document.createElement('article');el.className='writing-card';el.tabIndex=0;el.innerHTML=`<span class="number">${String(i+1).padStart(2,'0')}</span><div><h3>${work.title}</h3><p>${work.excerpt}</p></div><span class="meta">${work.category} · ${work.minutes} min</span>`;el.addEventListener('click',()=>openWork(work));el.addEventListener('keydown',e=>{if(e.key==='Enter')openWork(work)});list.append(el)})}
function openWork(work){article.innerHTML=marked.parse(work.markdown);if(!article.querySelector('h1'))article.insertAdjacentHTML('afterbegin',`<h1>${work.title}</h1>`);document.querySelector('#reading-time').textContent=`${work.minutes} min read`;reader.showModal();reader.scrollTop=0}
async function load(){try{const local=location.hostname===''||location.hostname==='localhost'||config.githubOwner.startsWith('YOUR_');const files=local?['texts/Eportfolio.md']:await fetch(`https://api.github.com/repos/${config.githubOwner}/${config.githubRepo}/contents/${config.textsFolder}`).then(r=>{if(!r.ok)throw new Error('Could not read the texts folder');return r.json()}).then(x=>x.filter(f=>/\.(md|txt)$/i.test(f.name)).map(f=>f.download_url));works=await Promise.all(files.map(async url=>{const text=await fetch(url).then(r=>r.text());return details({name:url.split('/').pop()},text)}));render(works)}catch(error){status.textContent=`The archive could not load. Check the repository details in config.js. (${error.message})`}}
search.addEventListener('input',()=>{const q=search.value.toLowerCase();render(works.filter(w=>`${w.title} ${w.category} ${w.excerpt}`.toLowerCase().includes(q)))});document.querySelector('#close-reader').addEventListener('click',()=>reader.close());document.querySelector('#year').textContent=new Date().getFullYear();load();
