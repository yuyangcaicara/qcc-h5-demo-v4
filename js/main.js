/* ===== V4.2: 爆款文案 + 加微转化优化 ===== */

/* --- 结果数据 --- */
const profiles = {
  ad: {
    emoji: "🎯",
    label: "精准获客",
    title: "让对的客户，主动来找你",
    scheme: "精准获客方案"
  },
  agency: {
    emoji: "🤝",
    label: "省心获客",
    title: "你负责拍板，专业团队帮你拿结果",
    scheme: "省心获客方案"
  },
  content: {
    emoji: "🌱",
    label: "长效获客",
    title: "用内容持续吸引客户，越做越轻松",
    scheme: "长效获客方案"
  }
};

/* --- 互动1 选完后的反馈文案 --- */
const feedbacks1 = {
  "no-leads": {
    html: `<p class="feedback-text"><strong>你说的这个状态，80% 的老板都经历过。</strong></p>
<p class="feedback-text">不是你不行，是<span class="feedback-highlight">获客渠道还没打通</span>。</p>
<p class="feedback-text">好消息是——这种情况反而最好解决。方法对了，一周就能看到变化。</p>`,
    weight: "velocity"
  },
  "waste-money": {
    html: `<p class="feedback-text"><strong>花了钱没效果，这是最让人窝火的。</strong></p>
<p class="feedback-text">但你比那些"还没花钱"的老板强——起码你知道<span class="feedback-highlight">哪些路走不通了</span>。</p>
<p class="feedback-text">接下来的关键是：别换方法，<strong>换做法</strong>。</p>`,
    weight: "trust"
  },
  "unstable": {
    html: `<p class="feedback-text"><strong>能有客户，说明你方向是对的。</strong></p>
<p class="feedback-text">不稳定的原因通常只有一个——<span class="feedback-highlight">没有形成稳定的获客通道</span>。</p>
<p class="feedback-text">你离"不愁客户"其实只差一步。</p>`,
    weight: "system"
  }
};

/* --- 互动2 选完后的反馈文案 --- */
const feedbacks2 = {
  "self": {
    html: `<p class="feedback-text">行，你是<strong>执行力型选手</strong>。<br/>给对方法你就能跑，那关键就是——<span class="feedback-highlight">方法别选错</span>。</p>`
  },
  "delegate": {
    html: `<p class="feedback-text">懂，你的时间值钱，<strong>不该花在试错上</strong>。<br/>那关键就是——<span class="feedback-highlight">找对帮你做的人</span>。</p>`
  },
  "collab": {
    html: `<p class="feedback-text">这是最聪明的方式——<strong>方向你把握，执行有人配合</strong>。<br/>关键就是<span class="feedback-highlight">配合模式得设计对</span>。</p>`
  }
};

/* --- 同行案例（按结果类型） --- */
const caseData = {
  ad: [
    { industry: "家装", desc: "月均获客成本从 180 降到 47", time: "3周见效" },
    { industry: "教培", desc: "首月新增 230+ 条有效线索", time: "投入 5000 起步" },
    { industry: "本地餐饮", desc: "到店客户翻了一倍", time: "2周开始有客" }
  ],
  agency: [
    { industry: "医美", desc: "获客全程托管，老板只管接诊", time: "首月回本" },
    { industry: "建材", desc: "团队帮跑后，线索质量明显提升", time: "第2周开始交付" },
    { industry: "汽车服务", desc: "从0到稳定月获客200+", time: "合作3个月" }
  ],
  content: [
    { industry: "法律咨询", desc: "靠短视频3个月积累2000+精准粉丝", time: "第2月开始有稳定咨询" },
    { industry: "财税", desc: "内容获客占比从10%提到60%", time: "坚持4个月后爆发" },
    { industry: "母婴", desc: "一条爆款带来 500+ 咨询", time: "内容体系搭好后" }
  ]
};

/* --- 信息缺口文案（按结果类型） --- */
const gapTexts = {
  ad: "具体怎么定向、预算怎么分配、素材怎么做，不同行业打法差别很大。",
  agency: "找什么样的团队靠谱、怎么评估效果、合作模式怎么谈，里面门道不少。",
  content: "做什么内容能吸引目标客户、怎么分发、怎么把看客变成询客，每一步都有讲究。"
};

/* --- 结果页详细内容 --- */
function getResultContent(type, choice1, choice2) {
  const reasons = {
    ad: {
      "no-leads": "你现在最缺的就是客户来源。精准定向能帮你快速找到对的人，不用再干等",
      "waste-money": "你之前花的钱不是白花——是方向对了但定向没做好。重新来，效果完全不同",
      "unstable": "你已经有基础了，加一条稳定的精准获客通道，就不用再靠运气"
    },
    agency: {
      "no-leads": "与其自己从零摸索，不如让做过上百个案子的团队帮你快速上手",
      "waste-money": "你踩过的坑，人家早有成熟方案。花同样的钱，效果可能翻几倍",
      "unstable": "把获客交给专人负责，你的精力花在交付和管理上，整体效率更高"
    },
    content: {
      "no-leads": "你的情况适合搭一套长期获客体系——前期投入时间，后面客户自己来",
      "waste-money": "与其一直花钱买流量，不如搭好内容体系，让获客成本持续降低",
      "unstable": "你有基础了，下一步是把内容、承接、转化串起来，形成稳定循环"
    }
  };

  const points = {
    ad: [
      "通过标签精准找到你要的客户类型",
      choice2 === "self" ? "你能自己把控节奏和预算" : "配合专业优化，效果更稳",
      "先小预算测试，看到效果再放大"
    ],
    agency: [
      "从策划到执行，全程有人推进",
      choice2 === "delegate" ? "你只需要看数据、盯结果" : "关键节点你拍板，日常有人帮你跑",
      "先跑一轮测试期，效果好再长期合作"
    ],
    content: [
      "前期投入精力，后期获客成本持续降低",
      choice2 === "collab" ? "你把控方向，团队帮你做执行和分发" : "体系搭好后，获客基本自动化",
      "内容 + 精准推广组合，效果可以叠加"
    ]
  };

  const how = {
    ad: "按行业、地域、兴趣精准定向，让有需求的人看到你、主动来咨询。",
    agency: "找到靠谱的执行团队，从方案到落地全程有人负责，你盯结果就行。",
    content: "搭好内容体系和客户承接流程，让目标客户被内容吸引、主动找到你。"
  };

  const steps = {
    ad: [
      "明确你想找什么样的客户",
      "小预算测试，看哪类人转化最好",
      "跑通后放量，持续优化"
    ],
    agency: [
      "定清楚你要什么样的线索",
      "选对团队，先跑一轮测试",
      "看数据决定要不要放大"
    ],
    content: [
      "确定什么内容最吸引你的目标客户",
      "用轻量内容先验证效果",
      "稳定后加上推广放大效果"
    ]
  };

  return {
    reason: reasons[type]?.[choice1] || "",
    points: points[type] || [],
    how: how[type] || "",
    steps: steps[type] || []
  };
}

/* ===== State ===== */
const state = {
  scores: { ad: 0, agency: 0, content: 0 },
  choices: {},
};

/* ===== Intersection Observer for fade-in ===== */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function observeNewElements(container) {
  container.querySelectorAll(".fade-in:not(.visible)").forEach(el => {
    fadeObserver.observe(el);
  });
}

/* ===== Interaction Logic ===== */
function handleInteraction(group, btn) {
  const value = btn.dataset.value;
  const scoresData = JSON.parse(btn.dataset.scores);

  state.choices[`q${group}`] = value;

  Object.entries(scoresData).forEach(([type, score]) => {
    state.scores[type] += score;
  });

  const container = document.getElementById(`options-${group}`);
  container.querySelectorAll(".interact-btn").forEach(b => {
    if (b === btn) {
      b.classList.add("selected");
    } else {
      b.classList.add("dimmed");
    }
    b.disabled = true;
  });

  setTimeout(() => {
    showFeedback(group, value);
  }, 400);
}

function showFeedback(group, value) {
  const feedbackEl = document.getElementById(`feedback-${group}`);
  
  if (group === 1) {
    const fb = feedbacks1[value];
    feedbackEl.innerHTML = fb.html;
    feedbackEl.classList.remove("hidden");
    observeNewElements(feedbackEl);

    setTimeout(() => {
      revealSection("sec-bridge");
      setTimeout(() => revealSection("interact-2"), 600);
    }, 800);
  }

  if (group === 2) {
    const fb = feedbacks2[value];
    feedbackEl.innerHTML = fb.html;
    feedbackEl.classList.remove("hidden");
    observeNewElements(feedbackEl);

    setTimeout(() => {
      revealSection("sec-pre-result");
      setTimeout(() => {
        renderResult();
        revealSection("sec-result");
      }, 1000);
    }, 800);
  }

  setTimeout(() => {
    feedbackEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 200);
}

function revealSection(id) {
  const sec = document.getElementById(id);
  sec.classList.remove("hidden");
  observeNewElements(sec);

  setTimeout(() => {
    sec.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
}

/* ===== Result ===== */
function resolveType() {
  const entries = Object.entries(state.scores);
  const maxScore = Math.max(...entries.map(([, s]) => s));
  const candidates = entries.filter(([, s]) => s === maxScore).map(([t]) => t);
  if (candidates.length === 1) return candidates[0];

  const tieMap = {
    "no-leads": "ad",
    "waste-money": "agency",
    "unstable": "content",
    "self": "ad",
    "delegate": "agency",
    "collab": "content"
  };

  for (const qKey of ["q1", "q2"]) {
    const c = state.choices[qKey];
    if (c && tieMap[c] && candidates.includes(tieMap[c])) {
      return tieMap[c];
    }
  }

  return candidates[0];
}

function renderResult() {
  const type = resolveType();
  const profile = profiles[type];
  const content = getResultContent(type, state.choices.q1, state.choices.q2);

  document.getElementById("result-emoji").textContent = profile.emoji;
  document.getElementById("result-label").textContent = profile.label;
  document.getElementById("result-title").textContent = profile.title;
  document.getElementById("result-reason").textContent = content.reason;
  document.getElementById("result-how").textContent = content.how;
  document.getElementById("cta-scheme").textContent = profile.scheme;

  // 信息缺口
  document.getElementById("gap-text").textContent = gapTexts[type] || "";

  // 要点
  const pointsEl = document.getElementById("result-points");
  pointsEl.innerHTML = content.points.map(p => `<li>${p}</li>`).join("");

  // 步骤
  const stepsEl = document.getElementById("result-steps");
  stepsEl.innerHTML = content.steps.map(s => `<li>${s}</li>`).join("");

  // 同行案例
  const cases = caseData[type] || [];
  const casesEl = document.getElementById("case-items");
  casesEl.innerHTML = cases.map(c => `
    <div class="case-item">
      <span class="case-industry">${c.industry}</span>
      <span class="case-desc">${c.desc}</span>
      <span class="case-time">${c.time}</span>
    </div>
  `).join("");
}

/* ===== Reset ===== */
function resetAll() {
  state.scores = { ad: 0, agency: 0, content: 0 };
  state.choices = {};

  ["feedback-1", "feedback-2"].forEach(id => {
    const el = document.getElementById(id);
    el.classList.add("hidden");
    el.innerHTML = "";
  });

  ["sec-bridge", "interact-2", "sec-pre-result", "sec-result"].forEach(id => {
    document.getElementById(id).classList.add("hidden");
  });

  document.querySelectorAll(".interact-btn").forEach(btn => {
    btn.classList.remove("selected", "dimmed");
    btn.disabled = false;
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ===== Init ===== */
function init() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".interact-btn");
    if (!btn || btn.disabled) return;

    const group = parseInt(btn.dataset.group);
    handleInteraction(group, btn);
  });

  document.getElementById("btn-restart").addEventListener("click", resetAll);

  document.querySelectorAll(".fade-in").forEach(el => {
    fadeObserver.observe(el);
  });
}

init();
