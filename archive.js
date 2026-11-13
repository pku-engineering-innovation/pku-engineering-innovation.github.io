(() => {
  'use strict';

  const events = {
    1: { name: '乐云具身 · SparkEdu 北京大学站', kind: '具身智能训练营', date: '2026年3月7日—14日', place: '新奥工学大楼 · 3004 / 3056', role: '协会与工学院、阿里巴巴达摩院等共同开展', story: '从遥操作开始，40名学员用机械臂采集数据、训练模型，再把模型放回实验台验证任务。结营时，8支团队展示了自己的工作，3支团队获评优秀。', credit: '协会训练营现场照片' },
    2: { name: '具身智能五人小班', kind: '持续教学', date: '2026年3月—7月', role: '协会教学 · 韩萱授课', story: '5名同学以每周一次的节奏学习机器人操作。16次课里，大家从熟悉实验设备开始，在机械臂操作、数据记录与实验调试之间来回验证，通过作业和课堂讨论解决遇到的问题。', credit: '协会小班教学现场照片' },
    3: { name: 'Human Five Robotics 前沿分享会', kind: '科学沙龙', date: '2026年5月30日', place: '中关村鼎好 DH3', role: '协会与 Human Five 共同开展', story: '怎样让机器人学习人的动作？连仕杰带来 PhysBrain 的研究思路，毛一鸣介绍 ARM 机器人操作研究。30名参与者和研究者围绕人类动作数据、视觉语言动作模型与强化学习展开讨论。', credit: 'Human Five 分享会现场照片' },
    4: { name: '英伟达具身智能闭门座谈会', kind: '科学沙龙', date: '2026年7月5日', place: '新奥工学大楼 · 1050', role: '协会与英伟达联合开展', story: '从仿真场景中的数据，走到真实机器人的一次动作，中间要经过哪些环节？英伟达解决方案架构师肖湘分享了机器人基础模型、合成数据和真实部署的开发流程。30名参与者围绕数据瓶颈与仿真到真实的迁移交流。', credit: '协会活动回顾与座谈会现场照片' },
    5: { name: '国际工程设计与创新 Workshop', kind: '工程设计', date: '2026年9月4日—9日', place: '北京大学工学院', role: '工学院举办 · 协会协助组织', story: '农业科技与风电运维中的真实问题成了设计起点。Peter Childs 教授指导，王清昊老师主持，20名参与者学习界定问题、分析商业模式和应用仿生设计。9月9日晚，各组带着自己的工程方案参加结题展示与答辩。', credit: '北京大学工学院 Workshop 活动回顾', url: 'https://a.xiumius.cn/board/v5/7TphY/726741875' },
    6: { name: '知行中国——中美青年对话', kind: '青年科技交流', date: '2026年7月15日', place: '北京大学', role: '协会参与科技交流与科普展示', story: '来访青年在院系参访、报告与分组研讨中交流对科技合作与可持续发展的理解。工学院是参访单位之一，协会围绕具身智能学习和机器人实践参与现场交流。', credit: '北大新闻网 · 校级活动报道', url: 'https://news.pku.edu.cn/info/7921/2748531.htm' },
    7: { name: '北京大学招生开放日', kind: '校园科普', date: '2026年4月18日', place: '北京大学', role: '协会参与校园开放日科普宣传', story: '“相约燕园，梦想起航”校园开放日向学生与家长开放院系咨询、科普场馆和校园参观。协会向来访者介绍了具身智能学习、工程实践与参与社团活动的途径。这里收录校园开放日的校级报道影像。', credit: '北大新闻网 · 校园开放日校级报道', url: 'https://news.pku.edu.cn/info/7921/2758841.htm' },
    8: { name: '科技点亮生活', kind: '青少年科普', date: '2026年5月16日', place: '北京大学', role: '协会参与科技科普与实物展示', story: '在第四届校园科技科普暨劳动月成果展示活动中，协会把机械臂和3D打印实践带到青少年与家长面前。从观察零件到理解机械臂如何运动，展台上的装置成了来访者提问和交流的起点。', credit: '协会现场照片与北大新闻网同场活动报道', url: 'https://news.pku.edu.cn/info/7921/2755321.htm' }
  };

  function startArchive() {
    const photos = Array.isArray(window.sitePhotos) ? window.sitePhotos : [];
    const byEvent = id => photos.filter(photo => Number(photo.event) === Number(id));
    const photoCredit = photo => {
      if (Number(photo.event) === 8) return /e08-0[12]\./.test(photo.file) ? '协会科普展示现场 · 王清昊提供' : '北大新闻网 · 校级活动报道';
      return events[photo.event].credit;
    };
    const create = (tag, className, text) => {
      const el = document.createElement(tag);
      if (className) el.className = className;
      if (text) el.textContent = text;
      return el;
    };
    const action = (text, label, className = 'ar-icon') => {
      const b = create('button', className, text);
      b.type = 'button';
      b.setAttribute('aria-label', label);
      return b;
    };
    function dialog(className, labelId) {
      const el = create('dialog', className);
      el.setAttribute('aria-labelledby', labelId);
      document.body.append(el);
      el.addEventListener('click', e => {
        if (e.target !== el) return;
        const rect = el.getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) el.close();
      });
      return el;
    }
    const eventDialog = dialog('ar-dialog ar-detail', 'ar-event-name');
    const viewer = dialog('ar-dialog ar-viewer', 'ar-view-name');
    let viewSet = [], current = 0, lastEventTrigger = null, lastPhotoTrigger = null;
    function syncScroll() { document.documentElement.classList.toggle('ar-open', eventDialog.open || viewer.open); }
    function restoreFocus(el) { if (el?.isConnected) el.focus({preventScroll:true}); }
    eventDialog.addEventListener('close', () => { syncScroll(); restoreFocus(lastEventTrigger); });
    viewer.addEventListener('close', () => { syncScroll(); restoreFocus(lastPhotoTrigger); });
    function meta(label, value) {
      const pair = create('div', 'ar-meta-pair');
      pair.append(create('dt', '', label), create('dd', '', value));
      return pair;
    }
    function openEvent(id, trigger) {
      const ev = events[id];
      if (!ev) return;
      lastEventTrigger = trigger;
      const pictures = byEvent(id);
      const toolbar = create('div', 'ar-detail-toolbar');
      const close = action('×', '关闭活动详情');
      close.addEventListener('click', () => eventDialog.close());
      toolbar.append(create('span', 'ar-mark', ev.kind), close);
      const article = create('article', 'ar-article');
      const title = create('h2', 'ar-title', ev.name);
      title.id = 'ar-event-name';
      const facts = create('dl', 'ar-meta');
      facts.append(meta('活动日期',ev.date));
      if (ev.place) facts.append(meta('地点',ev.place));
      facts.append(meta('活动组织',ev.role));
      const galleryHead = create('div','ar-gallery-head');
      galleryHead.append(create('h3','','现场影像'),create('span','ar-count',`${String(pictures.length).padStart(2,'0')} 张`));
      const grid = create('div','ar-grid');
      for (const photo of pictures) {
        const figure = create('figure', 'ar-figure');
        const b = action('',`放大照片：${photo.caption}`,'ar-thumbnail');
        b.dataset.photoOpen = photo.file;
        const img = create('img');
        img.src = photo.file; img.alt = photo.caption; img.width = photo.width; img.height = photo.height; img.loading = 'lazy';
        b.append(img); figure.append(b, create('figcaption','',photo.caption)); grid.append(figure);
      }
      const credit = create('p','ar-credit',`影像来源　${ev.credit}`);
      if (ev.url) {
        const source = create('a','','查看活动报道 ↗'); source.href = ev.url; source.target = '_blank'; source.rel = 'noopener noreferrer';credit.append(source);
      }
      article.append(title, facts, create('p','ar-story',ev.story), galleryHead, grid, credit);
      eventDialog.replaceChildren(toolbar,article);
      eventDialog.showModal();syncScroll();eventDialog.scrollTop = 0;close.focus({preventScroll:true});
    }
    const bar = create('div','ar-view-bar');
    const viewName = create('h2','ar-view-name'); viewName.id = 'ar-view-name';
    const dismiss = action('×','关闭照片');
    dismiss.addEventListener('click',()=>viewer.close());bar.append(viewName,dismiss);
    const stage = create('div','ar-stage');
    const mainImg = create('img','ar-full');stage.append(mainImg);
    const footer = create('div','ar-view-foot');
    const captionBox = create('div','ar-caption');captionBox.setAttribute('aria-live','polite');
    const caption = create('p');const credit = create('small');captionBox.append(caption,credit);
    const controls = create('div','ar-controls');
    const previous = action('←','上一张照片');const count = create('span','ar-counter');const next = action('→','下一张照片');
    controls.append(previous,count,next);footer.append(captionBox,controls);
    viewer.append(bar,stage,footer);
    function showPhoto(index) {
      current = (index + viewSet.length) % viewSet.length;
      const photo = viewSet[current];
      mainImg.src = photo.file; mainImg.alt = photo.caption;
      viewName.textContent = events[photo.event].name;
      caption.textContent = photo.caption;credit.textContent = `影像来源　${photoCredit(photo)}`;
      count.textContent = `${String(current + 1).padStart(2,'0')} / ${String(viewSet.length).padStart(2,'0')}`;
    }
    previous.addEventListener('click',()=>showPhoto(current-1));next.addEventListener('click',()=>showPhoto(current+1));
    viewer.addEventListener('keydown', e => {
      if(e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();showPhoto(current + (e.key === 'ArrowRight' ? 1 : -1));
    });
    let touchStart;
    stage.addEventListener('touchstart', e => { touchStart = [e.touches[0].clientX, e.touches[0].clientY]; }, {passive:true});
    stage.addEventListener('touchend', e => {
      if (!touchStart) return;
      const dx = e.changedTouches[0].clientX-touchStart[0], dy = e.changedTouches[0].clientY-touchStart[1];touchStart = null;
      if(Math.abs(dx)>65 && Math.abs(dx)>2*Math.abs(dy)) showPhoto(current + (dx<0?1:-1));
    },{passive:true});
    document.addEventListener('click', e => {
      if(e.defaultPrevented || e.button!==0 || e.altKey || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const trigger = e.target.closest('[data-photo-open],[data-event-open]');if (!trigger) return;
      if (trigger.hasAttribute('data-photo-open')) {
        const file = trigger.dataset.photoOpen.replace(/^\.\//,'');
        const photo = photos.find(p=>p.file===file); if(!photo) return;
        e.preventDefault();lastPhotoTrigger = trigger;viewSet = eventDialog.contains(trigger) ? byEvent(photo.event) : photos;
        showPhoto(viewSet.indexOf(photo));viewer.showModal();syncScroll();dismiss.focus({preventScroll:true});
      } else {
        const id=Number(trigger.dataset.eventOpen);if(!events[id]) return;
        e.preventDefault();openEvent(id,trigger);
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',startArchive,{once:true});
  else startArchive();
})();
