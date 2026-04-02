/* ===== V5: 去掉分流，纯认知内容流 + 加微引导 ===== */

/* --- 互动反馈（基于截图认知链，对号入座后告诉用户卡在哪一层） --- */
const feedbacks = {
  "no-reach": {
    html: `<div class="fade-in">
<p class="body-text"><strong>没人看——说明你的内容没有完成"唤醒"这一步。</strong></p>
<p class="body-text">客户不是没需求，是<span class="feedback-highlight">你的内容没有和他建立关联</span>。他刷到你，就像路过一家和自己无关的店——直接划走了。</p>
<p class="body-text">你需要的不是更努力地发，而是<strong>换一种开口方式</strong>。</p>
</div>`
  },
  "price-only": {
    html: `<div class="fade-in">
<p class="body-text"><strong>只问价——说明你唤醒了需求，但没有走完信任链。</strong></p>
<p class="body-text">客户会问价，说明他有兴趣。但直接聊价格，等于<span class="feedback-highlight">跳过了方法、案例和打消顾虑</span>这三步——他还没准备好买，你就开始卖了。</p>
<p class="body-text">你离成交其实不远，<strong>差的是中间几步的承接</strong>。</p>
</div>`
  },
  "unstable": {
    html: `<div class="fade-in">
<p class="body-text"><strong>偶尔来一个——说明方向对了，但没有形成体系。</strong></p>
<p class="body-text">你可能某条内容碰巧踩中了某个点，但<span class="feedback-highlight">缺少一套稳定的成交路径设计</span>。有客户是运气，没客户才是常态。</p>
<p class="body-text">你需要的不是更多内容，而是<strong>把验证过的方法固定下来</strong>。</p>
</div>`
  }
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
function handleInteraction(btn) {
  const value = btn.dataset.value;

  // 选项高亮反馈
  const container = document.getElementById("options-1");
  container.querySelectorAll(".inline-opt").forEach(b => {
    if (b === btn) {
      b.classList.add("selected");
    } else {
      b.classList.add("dimmed");
    }
    b.disabled = true;
  });

  setTimeout(() => {
    showFeedback(value);
  }, 400);
}

function showFeedback(value) {
  const feedbackEl = document.getElementById("feedback-1");
  const fb = feedbacks[value];
  if (!fb) return;

  feedbackEl.innerHTML = fb.html;
  feedbackEl.classList.remove("hidden");
  observeNewElements(feedbackEl);

  setTimeout(() => {
    feedbackEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 200);

  // 依次展示后续模块
  const sequence = [
    { id: "sec-bridge", delay: 1200 },
    { id: "sec-cases", delay: 2200 },
    { id: "sec-gap", delay: 3200 },
    { id: "sec-cta", delay: 4200 }
  ];

  sequence.forEach(({ id, delay }) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      el.classList.remove("hidden");
      observeNewElements(el);
    }, delay);
  });

  // 最后滚动到 CTA
  setTimeout(() => {
    const cta = document.getElementById("sec-cta");
    cta.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 4800);
}

/* ===== Reset ===== */
function resetAll() {
  ["feedback-1", "sec-bridge", "sec-cases", "sec-gap", "sec-cta"].forEach(id => {
    const el = document.getElementById(id);
    el.classList.add("hidden");
    if (id === "feedback-1") el.innerHTML = "";
  });

  document.querySelectorAll(".inline-opt").forEach(btn => {
    btn.classList.remove("selected", "dimmed");
    btn.disabled = false;
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ===== Init ===== */
function init() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".inline-opt");
    if (!btn || btn.disabled) return;
    handleInteraction(btn);
  });

  document.getElementById("btn-restart").addEventListener("click", resetAll);

  document.querySelectorAll(".fade-in").forEach(el => {
    fadeObserver.observe(el);
  });
}

init();
