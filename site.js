const records=[
[1,"工程实践","03.07 — 03.14","SparkEdu 具身智能训练营","40名学员分为8组，从机械臂遥操作走到模型验证。","e01-08"],
[2,"工程实践","03 — 07 月","具身智能五人小班","在16次小班课里，反复练习操作、记录与调试。","e02-04"],
[7,"开放交流","04.18","北京大学招生开放日","向来访的同学与家长介绍社团里的工程学习。","e07-01"],
[8,"开放交流","05.16","科技点亮生活","把机械臂与3D打印带到青少年的面前。","e08-02"],
[3,"科学沙龙","05.30","Human Five Robotics 前沿分享会","从 PhysBrain 到 ARM，交流机器人如何学习人的动作。","e03-06"],
[4,"科学沙龙","07.05","英伟达具身智能闭门座谈会","讨论基础模型、仿真数据与真机部署之间的联系。","e04-01"],
[6,"开放交流","07.15","知行中国 · 中美青年对话","协会成员在北京大学专场参与科技交流。","e06-01"],
[5,"科学沙龙","09.04 — 09.09","国际工程设计与创新 Workshop","协会协助工学院组织工作坊，参与者围绕真实问题完成设计答辩。","e05-03"]];
const cards=document.querySelector('#cards');
function list(filter){cards.replaceChildren();for(const [id,type,date,title,summary,photo] of records.filter(v=>filter==='全部'||v[1]===filter)){let b=document.createElement('button');b.className='card';b.dataset.eventOpen=id;b.innerHTML='<span class="card-image"><img loading="lazy" alt="" src="media/'+photo+'.webp"><span class="label">'+type+'</span></span><span class="card-meta">'+date+'<span>↗</span></span><h3>'+title+'</h3><p>'+summary+'</p>';cards.append(b)}}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(o=>o.setAttribute('aria-pressed',String(o===b)));list(b.dataset.filter)}));list('全部');
const slides=[[1,'e01-07','2026.03　/　工程实践','SparkEdu 具身智能训练营'],[3,'e03-06','2026.05　/　科学沙龙','Human Five Robotics 前沿分享会'],[8,'e08-02','2026.05　/　开放交流','科技点亮生活'],[5,'e05-03','2026.09　/　工程设计','国际工程设计与创新 Workshop']];let index=0;
function slide(step){index=(index+step+slides.length)%slides.length;const [id,stem,date,title]=slides[index],file='media/'+stem+'.webp';const img=document.querySelector('#hero-img');img.src=file;img.alt=window.sitePhotos.find(p=>p.file===file).caption;const b=document.querySelector('.hero-pic');b.dataset.eventOpen=id;b.setAttribute('aria-label','查看'+title);document.querySelector('#hero-title').textContent=title;document.querySelector('#hero-stamp').textContent=date;document.querySelector('#hero-count').textContent='0'+(index+1)+' / 04'}
document.querySelector('#prev').onclick=()=>slide(-1);document.querySelector('#next').onclick=()=>slide(1);
let expanded=false;const highlights=['e01-08','e02-04','e05-08','e08-02','e03-03','e07-01','e06-01','e04-03'];function wall(){const el=document.querySelector('#wall');el.replaceChildren();const photos=expanded?window.sitePhotos:highlights.map(stem=>window.sitePhotos.find(p=>p.file==='media/'+stem+'.webp'));for(const p of photos){let b=document.createElement('button');b.dataset.photoOpen=p.file;b.setAttribute('aria-label',p.caption+'，放大');let im=new Image();im.src=p.file;im.alt=p.caption;im.loading='lazy';let n=document.createElement('small');n.textContent=String(window.sitePhotos.indexOf(p)+1).padStart(2,'0')+' / 49';b.append(im,n);el.append(b)}}
document.querySelector('#more').onclick=e=>{expanded=!expanded;wall();e.currentTarget.setAttribute('aria-expanded',String(expanded));e.currentTarget.innerHTML=expanded?'收起相册 <span>↑</span>':'展开全部 49 张 <span>↓</span>';if(!expanded)document.querySelector('#moments').scrollIntoView()};wall();
