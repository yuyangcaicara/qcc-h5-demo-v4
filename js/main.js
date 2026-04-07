/* ===== 自查项数据：8 项常见经营问题 ===== */
const PAINS = [
  { id:'no_customer',   emoji:'📉', label:'新客进店/咨询明显变少' },
  { id:'tried_fail',    emoji:'💰', label:'做过推广，投入产出不理想' },
  { id:'peer_good',     emoji:'👀', label:'同行在涨，自己原地踏步' },
  { id:'no_idea',       emoji:'🧭', label:'想做点什么，但不知道先做哪步' },
  { id:'old_way',       emoji:'🔄', label:'主要靠老客带新客、转介绍' },
  { id:'no_online',     emoji:'📱', label:'线上渠道基本没有布局' },
  { id:'price_war',     emoji:'🏷️', label:'客户只比价，利润越来越薄' },
  { id:'busy_no_grow',  emoji:'⏰', label:'每天都在忙，但业绩没增长' }
];

/* ===== 顾问初判文案（根据选择数量） ===== */
const INSIGHTS = {
  low:  '问题比较集中，调整起来不复杂。建议先把客户来源梳理清楚——哪些渠道还在出单、哪些已经不行了，找到一个见效最快的方向集中发力，比什么都试一遍要有用得多。',
  mid:  '这几个问题经常一起出现，背后通常是客户来源太单一，加上缺少整体规划。建议先理清现在的客户都是从哪来的，再对照同行里做得好的商家，看看自己差在哪一步。很多时候不是没办法，是没找对顺序。',
  high: '问题覆盖面比较广，不是某一个环节的事，需要系统梳理一下。建议先做一次完整的经营体检——从客户来源、转化流程到复购留存，理清哪个环节卡得最严重，优先解决那一个，再逐步推进。盲目什么都改，反而越改越乱。'
};

let selected = new Set();

/* ===== 初始化 ===== */
document.addEventListener('DOMContentLoaded', () => {
  renderPains();
  setQuota();
  setSocial();
  document.getElementById('painSubmit').addEventListener('click', handleSubmit);
});

/* ===== 渲染痛点列表 ===== */
function renderPains() {
  const list = document.getElementById('painList');
  list.innerHTML = PAINS.map(p => `
    <div class="pain-btn" data-id="${p.id}" onclick="togglePain(this)">
      <span class="pain-emoji">${p.emoji}</span>
      <span class="pain-label">${p.label}</span>
      <span class="pain-check"></span>
    </div>
  `).join('');
}

/* ===== 多选切换 ===== */
function togglePain(el) {
  const id = el.dataset.id;
  if (selected.has(id)) {
    selected.delete(id);
    el.classList.remove('selected');
  } else {
    selected.add(id);
    el.classList.add('selected');
  }
  updateSubmitBtn();
}

/* ===== 更新提交按钮 ===== */
function updateSubmitBtn() {
  const btn = document.getElementById('painSubmit');
  const count = document.getElementById('submitCount');
  if (selected.size > 0) {
    btn.disabled = false;
    count.textContent = `（已选 ${selected.size} 条）`;
  } else {
    btn.disabled = true;
    count.textContent = '';
  }
}

/* ===== 提交→揭晓结果 ===== */
function handleSubmit() {
  if (selected.size === 0) return;
  
  const btn = document.getElementById('painSubmit');
  btn.disabled = true;
  btn.querySelector('.submit-text').textContent = '正在生成诊断...';

  // 短暂延迟制造"分析"感
  setTimeout(() => {
    showResult();
  }, 800);
}

/* ===== 显示结果区 ===== */
function showResult() {
  // 填充命中数
  document.getElementById('hitCount').textContent = selected.size;

  // 选择点评
  let insightKey = 'mid';
  if (selected.size <= 2) insightKey = 'low';
  else if (selected.size >= 5) insightKey = 'high';
  document.getElementById('insightText').textContent = INSIGHTS[insightKey];

  // 填充命中痛点标签
  const hitsEl = document.getElementById('resultHits');
  const hitPains = PAINS.filter(p => selected.has(p.id));
  hitsEl.innerHTML = hitPains.map(p => `
    <span class="hit-tag"><span class="ht-emoji">${p.emoji}</span>${p.label}</span>
  `).join('');

  // 显示结果区
  const reveal = document.getElementById('resultReveal');
  reveal.style.display = 'block';
  
  // 强制 reflow 后触发动效
  reveal.offsetHeight;
  reveal.classList.add('show');

  // 滚动到结果区
  setTimeout(() => {
    reveal.scrollIntoView({ behavior:'smooth', block:'start' });
  }, 100);

  // 福利项逐个入场
  const items = reveal.querySelectorAll('.freebie-item');
  items.forEach((item, i) => {
    setTimeout(() => {
      item.classList.add('show');
    }, 400 + i * 200);
  });
}

/* ===== 名额数字 ===== */
function setQuota() {
  const base = 15 + Math.floor(Math.random() * 20);
  document.getElementById('quota').textContent = base;
}

/* ===== 社会证明 ===== */
function setSocial() {
  const num = 2000 + Math.floor(Math.random() * 1500);
  document.getElementById('socialText').textContent = `${num.toLocaleString()} 位商家已领取行业资料`;
}
