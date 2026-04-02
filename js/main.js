/* ===== V6: 翻卡获客体检小游戏 ===== */

const state = {
  answers: {},       // { 1: score, 2: score, 3: score }
  currentCard: 1,
  totalCards: 3,
  flippedCount: 0
};

/* --- 结果配置 --- */
const resultMap = {
  low: {
    title: "🚨 你的获客急需体检",
    desc: "你目前的获客方式效率偏低，还有很大提升空间。好消息是——已经有成熟的方法帮你快速改善。",
    insight: "你现在的获客方式主要靠人脉和体力，天花板很低。建议先了解一下线上获客的基础打法，找到最适合你行业的切入点。"
  },
  mid: {
    title: "⚠️ 你的获客还差临门一脚",
    desc: "你已经有一定获客基础，但效率和精准度还不够。优化几个关键环节，效果可能翻倍。",
    insight: "你不是没客户，而是获客成本偏高、线索不够精准。优化投放策略和转化链路是当前性价比最高的动作。"
  },
  high: {
    title: "✅ 你的获客基础不错",
    desc: "你在获客上已经走在前面了，但还有优化空间。看看同行在做什么，也许能给你新思路。",
    insight: "你已经跑通了基础的获客链路，接下来应该关注降本增效。看看同行的最新打法，会有新启发。"
  }
};

const diagResults = {
  1: { 1: { icon: "🔴", text: "待升级" }, 2: { icon: "🟡", text: "及格" }, 3: { icon: "🟢", text: "在线" } },
  2: { 1: { icon: "🔴", text: "未投入" }, 2: { icon: "🟡", text: "试水中" }, 3: { icon: "🟢", text: "有计划" } },
  3: { 1: { icon: "🔴", text: "待解决" }, 2: { icon: "🟡", text: "可优化" }, 3: { icon: "🟢", text: "可提升" } }
};

/* ===== Screen Management ===== */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(id);
  target.classList.add("active");
  // 滚到顶
  target.scrollTop = 0;
  window.scrollTo(0, 0);
}

/* ===== Card Flip ===== */
function flipCard(cardEl) {
  if (cardEl.classList.contains("flipped")) return;
  cardEl.classList.add("flipped");
}

/* ===== Handle Option Click ===== */
function handleOption(btn) {
  const cardIdx = parseInt(btn.dataset.card);
  const score = parseInt(btn.dataset.score);

  // 记录答案
  state.answers[cardIdx] = score;
  state.flippedCount++;

  // 高亮选中
  const cardEl = document.getElementById(`card-${cardIdx}`);
  cardEl.querySelectorAll(".card-opt").forEach(b => {
    if (b === btn) {
      b.classList.add("chosen");
    } else {
      b.classList.add("unchosen");
    }
    b.disabled = true;
  });

  // 短暂延迟后进入下一张或出结果
  setTimeout(() => {
    if (state.flippedCount >= state.totalCards) {
      // 全部翻完，出结果
      showScreen("screen-result");
      setTimeout(renderResult, 300);
    } else {
      // 下一张
      state.currentCard++;
      document.getElementById("card-num").textContent = state.currentCard;

      // 当前卡片滑出
      cardEl.classList.add("slide-out");

      setTimeout(() => {
        // 下一张卡片出现
        const nextCard = document.getElementById(`card-${state.currentCard}`);
        nextCard.classList.add("active");

        // 更新 dots
        document.querySelectorAll(".dot").forEach((d, i) => {
          d.classList.toggle("active", i < state.currentCard);
          d.classList.toggle("done", i < state.currentCard - 1);
        });

        // 自动翻开
        setTimeout(() => flipCard(nextCard), 400);
      }, 350);
    }
  }, 600);
}

/* ===== Render Result ===== */
function renderResult() {
  const total = (state.answers[1] || 1) + (state.answers[2] || 1) + (state.answers[3] || 1);
  // 映射到 0-100 分 (3-9 => 25-92)
  const score = Math.round(((total - 3) / 6) * 67 + 25);

  let level = "low";
  if (score >= 60) level = "mid";
  if (score >= 78) level = "high";

  const result = resultMap[level];

  // 环形动画
  animateScore(score);

  // 文字
  setTimeout(() => {
    document.getElementById("result-title").textContent = result.title;
    document.getElementById("result-title").classList.add("show");
  }, 800);

  setTimeout(() => {
    document.getElementById("result-desc").textContent = result.desc;
    document.getElementById("result-desc").classList.add("show");
  }, 1200);

  // 诊断项逐个显示
  [1, 2, 3].forEach((cardIdx, i) => {
    setTimeout(() => {
      const s = state.answers[cardIdx] || 1;
      const diag = diagResults[cardIdx][s];
      document.getElementById(`diag-icon-${cardIdx}`).textContent = diag.icon;
      document.getElementById(`diag-status-${cardIdx}`).textContent = diag.text;
      document.getElementById(`diag-status-${cardIdx}`).className = `diag-status ds-${s}`;
      document.querySelectorAll(".diag-item")[i].classList.add("show");
    }, 1600 + i * 300);
  });

  // 顾问点评
  setTimeout(() => {
    document.getElementById("insight-text").textContent = result.insight;
    document.querySelector(".insight-card").classList.add("show");
  }, 2600);

  // 同行数据
  setTimeout(() => {
    document.querySelector(".peer-card").classList.add("show");
  }, 3000);

  // CTA
  setTimeout(() => {
    document.querySelector(".cta-final").classList.add("show");
  }, 3400);
}

/* ===== Score Ring Animation ===== */
function animateScore(target) {
  const circle = document.getElementById("ring-fill");
  const valEl = document.getElementById("score-val");
  const circumference = 2 * Math.PI * 52;
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;

  // 颜色
  let color = "#e8393e"; // red
  if (target >= 60) color = "#f5a623"; // orange
  if (target >= 78) color = "#1bbf83"; // green
  circle.style.stroke = color;

  // 动画
  let current = 0;
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    current = Math.round(eased * target);
    valEl.textContent = current;
    circle.style.strokeDashoffset = circumference * (1 - (eased * target) / 100);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ===== Reset ===== */
function resetAll() {
  state.answers = {};
  state.currentCard = 1;
  state.flippedCount = 0;

  // 重置卡片
  document.querySelectorAll(".flip-card").forEach((card, i) => {
    card.classList.remove("flipped", "active", "slide-out");
    card.querySelectorAll(".card-opt").forEach(b => {
      b.classList.remove("chosen", "unchosen");
      b.disabled = false;
    });
  });

  // 重置 dots
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === 0);
    d.classList.remove("done");
  });

  document.getElementById("card-num").textContent = "1";

  // 重置结果页
  document.getElementById("result-title").className = "result-title";
  document.getElementById("result-desc").className = "result-desc";
  document.querySelectorAll(".diag-item").forEach(el => el.classList.remove("show"));
  document.querySelector(".insight-card").classList.remove("show");
  document.querySelector(".peer-card").classList.remove("show");
  document.querySelector(".cta-final").classList.remove("show");
  document.getElementById("score-val").textContent = "0";

  showScreen("screen-home");
}

/* ===== Init ===== */
function init() {
  // 开始按钮
  document.getElementById("btn-start").addEventListener("click", () => {
    showScreen("screen-game");
    // 第一张卡片延迟显示并翻开
    const card1 = document.getElementById("card-1");
    setTimeout(() => flipCard(card1), 500);
  });

  // 卡片正面点击翻开
  document.addEventListener("click", (e) => {
    const front = e.target.closest(".flip-front");
    if (front) {
      const card = front.closest(".flip-card");
      if (card && card.classList.contains("active")) {
        flipCard(card);
      }
    }
  });

  // 选项点击
  document.addEventListener("click", (e) => {
    const opt = e.target.closest(".card-opt");
    if (opt && !opt.disabled) {
      handleOption(opt);
    }
  });

  // 重来
  document.getElementById("btn-retry").addEventListener("click", resetAll);
}

init();
