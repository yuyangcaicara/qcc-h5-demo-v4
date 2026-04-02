/* ============================
   朋友圈获客模拟器 v7
   ============================ */

(function () {
  'use strict';

  // ---- 行业数据 ----
  const industries = [
    { id: 'edu',      icon: '📚', name: '教育培训' },
    { id: 'beauty',   icon: '💆', name: '美容美发' },
    { id: 'food',     icon: '🍜', name: '餐饮美食' },
    { id: 'home',     icon: '🏠', name: '家装建材' },
    { id: 'auto',     icon: '🚗', name: '汽车服务' },
    { id: 'health',   icon: '🏥', name: '大健康' },
    { id: 'finance',  icon: '💰', name: '金融保险' },
    { id: 'retail',   icon: '🛍️', name: '零售电商' },
    { id: 'other',    icon: '🏢', name: '其他行业' },
  ];

  // ---- 目标选项 ----
  const goals = [
    { id: 'leads',   icon: '📞', text: '获取客户线索',   sub: '让更多人主动咨询你' },
    { id: 'wechat',  icon: '💬', text: '引导加微信',     sub: '把客户沉淀到私域' },
    { id: 'visit',   icon: '📍', text: '门店到客',       sub: '让附近的人到店消费' },
    { id: 'brand',   icon: '📣', text: '品牌曝光',       sub: '让更多人知道你' },
  ];

  // ---- 行业广告模拟数据 ----
  const adData = {
    edu: {
      brand: '某教育培训机构',
      tag: '限时体验',
      title: '孩子成绩上不去？试试这个方法',
      desc: '已有 3,200+ 家长选择，首课免费体验',
      img: 'linear-gradient(135deg,#667eea,#764ba2)',
      exposure: '8,000~15,000',
      click: '320~600',
      cost: '¥25~55/人',
    },
    beauty: {
      brand: '某美容连锁',
      tag: '新客专享',
      title: '素颜也能有好气色',
      desc: '到店体验价 ¥68，限前 100 名',
      img: 'linear-gradient(135deg,#f093fb,#f5576c)',
      exposure: '6,000~12,000',
      click: '240~480',
      cost: '¥18~42/人',
    },
    food: {
      brand: '某餐饮品牌',
      tag: '霸王餐',
      title: '这家店排队 2 小时，到底什么来头？',
      desc: '新店开业，前 50 桌 5 折',
      img: 'linear-gradient(135deg,#f6d365,#fda085)',
      exposure: '10,000~20,000',
      click: '500~900',
      cost: '¥8~22/人',
    },
    home: {
      brand: '某家装品牌',
      tag: '0 元设计',
      title: '装修怕踩坑？先看看这份避坑清单',
      desc: '免费量房+3D效果图，已服务 5,000+ 业主',
      img: 'linear-gradient(135deg,#a8edea,#fed6e3)',
      exposure: '5,000~10,000',
      click: '200~400',
      cost: '¥45~90/人',
    },
    auto: {
      brand: '某汽车服务',
      tag: '到店礼',
      title: '你的爱车该保养了',
      desc: '进口全合成机油 ¥198 起，预约立减 50',
      img: 'linear-gradient(135deg,#667eea,#764ba2)',
      exposure: '5,000~9,000',
      click: '200~360',
      cost: '¥35~70/人',
    },
    health: {
      brand: '某健康管理中心',
      tag: '限时筛查',
      title: '体检年年做，这些指标你真的看懂了？',
      desc: '专业解读+个性化方案，限时免费',
      img: 'linear-gradient(135deg,#89f7fe,#66a6ff)',
      exposure: '6,000~11,000',
      click: '240~440',
      cost: '¥40~80/人',
    },
    finance: {
      brand: '某金融服务',
      tag: '专属顾问',
      title: '闲钱放哪里更合适？',
      desc: '1对1规划师，帮你做合理配置',
      img: 'linear-gradient(135deg,#fbc2eb,#a6c1ee)',
      exposure: '4,000~8,000',
      click: '160~320',
      cost: '¥60~120/人',
    },
    retail: {
      brand: '某零售品牌',
      tag: '爆款直降',
      title: '这款好物被 10 万人加了购物车',
      desc: '限时 3 天，直降 40%',
      img: 'linear-gradient(135deg,#fa709a,#fee140)',
      exposure: '12,000~25,000',
      click: '600~1200',
      cost: '¥10~30/人',
    },
    other: {
      brand: '某本地商家',
      tag: '限时活动',
      title: '附近的人都在关注这家店',
      desc: '新客福利领取中，名额有限',
      img: 'linear-gradient(135deg,#a1c4fd,#c2e9fb)',
      exposure: '5,000~10,000',
      click: '200~400',
      cost: '¥30~65/人',
    },
  };

  // ---- State ----
  let selectedIndustry = null;
  let selectedGoal = null;

  // ---- DOM Refs ----
  const $ = (sel) => document.querySelector(sel);
  const screens = {
    hero:     $('#screen-hero'),
    industry: $('#screen-industry'),
    goal:     $('#screen-goal'),
    loading:  $('#screen-loading'),
    result:   $('#screen-result'),
  };

  // ---- Helper: switch screen ----
  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // ---- Render industry grid ----
  function renderIndustries() {
    const grid = $('#industry-grid');
    grid.innerHTML = industries.map(ind => `
      <div class="opt" data-id="${ind.id}">
        <span class="opt-icon">${ind.icon}</span>
        <span class="opt-text">${ind.name}</span>
      </div>
    `).join('');

    grid.addEventListener('click', (e) => {
      const opt = e.target.closest('.opt');
      if (!opt) return;
      // highlight
      grid.querySelectorAll('.opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedIndustry = opt.dataset.id;
      // auto advance after short delay
      setTimeout(() => showScreen('goal'), 350);
    });
  }

  // ---- Render goal list ----
  function renderGoals() {
    const list = $('#goal-list');
    list.innerHTML = goals.map(g => `
      <div class="opt" data-id="${g.id}">
        <span class="opt-icon">${g.icon}</span>
        <div class="opt-body">
          <p class="opt-text">${g.text}</p>
          <p class="opt-sub">${g.sub}</p>
        </div>
      </div>
    `).join('');

    list.addEventListener('click', (e) => {
      const opt = e.target.closest('.opt');
      if (!opt) return;
      list.querySelectorAll('.opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedGoal = opt.dataset.id;
      setTimeout(() => startLoading(), 350);
    });
  }

  // ---- Loading animation ----
  function startLoading() {
    showScreen('loading');
    const fill = $('#loading-fill');
    const tip = $('#loading-tip');

    const tips = [
      '匹配行业数据中...',
      '分析同行投放策略...',
      '生成广告素材预览...',
      '计算预估效果数据...',
    ];

    let progress = 0;
    let tipIdx = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 18 + 5;
      if (progress > 95) progress = 95;
      fill.style.width = progress + '%';

      if (progress > (tipIdx + 1) * 25 && tipIdx < tips.length - 1) {
        tipIdx++;
        tip.textContent = tips[tipIdx];
      }
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      fill.style.width = '100%';
      setTimeout(() => showResult(), 300);
    }, 2200);
  }

  // ---- Show result ----
  function showResult() {
    const data = adData[selectedIndustry] || adData.other;

    // Fill ad card
    $('#ad-brand').textContent = data.brand;
    $('#ad-tag').textContent = data.tag;
    $('#ad-title').textContent = data.title;
    $('#ad-desc').textContent = data.desc;
    $('#ad-img').style.background = data.img;
    $('#ad-img').style.backgroundSize = 'cover';

    // Adjust button text based on goal
    const btnTexts = {
      leads: '立即咨询',
      wechat: '添加好友',
      visit: '导航到店',
      brand: '了解更多',
    };
    $('#ad-btn').textContent = btnTexts[selectedGoal] || '了解更多';

    // Fill data
    $('#data-exposure').textContent = data.exposure;
    $('#data-click').textContent = data.click;
    $('#data-cost').textContent = data.cost;

    showScreen('result');

    // Animate data numbers
    animateDataCards();
  }

  // ---- Animate data cards ----
  function animateDataCards() {
    const cards = document.querySelectorAll('.data-card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      setTimeout(() => {
        card.style.transition = 'all .5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 300 + i * 150);
    });
  }

  // ---- Init ----
  function init() {
    renderIndustries();
    renderGoals();

    $('#btn-start').addEventListener('click', () => {
      showScreen('industry');
    });
  }

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
