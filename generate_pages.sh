#!/usr/bin/env bash
set -euo pipefail

read -r -d '' NAV <<'EOF' || true
<nav class="sidebar">
  <div class="sidebar-logo">
    <div class="logo-text">EM</div>
    <div class="logo-sub">ExpertMarket</div>
  </div>
  <div class="nav-section">
    <div class="nav-item" onclick="showPage('landing')"><span>Home</span></div>
    <div class="nav-item" onclick="showPage('dashboard')"><span>Dashboard</span></div>
  </div>
  <div class="nav-section">
    <div class="nav-label">Explore</div>
    <div class="nav-item" onclick="showPage('profile')"><span>Expert Profile</span></div>
    <div class="nav-item" onclick="showPage('stock')"><span>Expert Stock</span></div>
    <div class="nav-item" onclick="showPage('category')"><span>Categories</span></div>
    <div class="nav-item" onclick="showPage('review')"><span>Reviews</span></div>
  </div>
  <div class="nav-section">
    <div class="nav-label">My Account</div>
    <div class="nav-item" onclick="showPage('ai')"><span>AI Picks</span></div>
    <div class="nav-item" onclick="showPage('portfolio')"><span>Portfolio</span></div>
    <div class="nav-item" onclick="showPage('ipo')"><span>Join as Expert</span></div>
    <div class="nav-item" onclick="showPage('trust')"><span>Trust & Safety</span></div>
  </div>
</nav>
EOF

read -r -d '' TICKER <<'EOF' || true
<div class="ticker-wrap" id="ticker" style="display:none">
  <div class="ticker-inner">
    <span class="tick-item"><span class="tick-name">YUKI.J</span> <span class="up">£142.50 ▲2.4%</span></span>
    <span class="tick-item"><span class="tick-name">MARCO.F</span> <span class="up">£98.20 ▲1.1%</span></span>
    <span class="tick-item"><span class="tick-name">CLAIRE.B</span> <span class="down">£67.80 ▼0.8%</span></span>
    <span class="tick-item"><span class="tick-name">RAJAN.K</span> <span class="up">£211.00 ▲3.7%</span></span>
  </div>
</div>
EOF

read -r -d '' SCRIPT <<'EOF' || true
<script>
const pageFiles = {
  landing: 'expertmarket.html',
  dashboard: 'dashboard.html',
  profile: 'profile.html',
  stock: 'stock.html',
  category: 'category.html',
  review: 'review.html',
  ai: 'ai.html',
  portfolio: 'portfolio.html',
  ipo: 'ipo.html',
  trust: 'trust.html'
};

function showPage(id) {
  const target = pageFiles[id];
  if (target) window.location.href = target;
}

function setTab(t) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById('tab-' + t)?.classList.add('active');
}

function togglePill(el) {
  el.classList.toggle('selected');
}

(function initPage() {
  const id = document.body.dataset.page;
  const ticker = document.getElementById('ticker');
  if (ticker) ticker.style.display = id === 'landing' ? 'none' : 'block';

  const navMap = {
    landing: 0, dashboard: 1, profile: 2, stock: 3, category: 4,
    review: 5, ai: 6, portfolio: 7, ipo: 8, trust: 9
  };
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.nav-item')[navMap[id]]?.classList.add('active');
})();
</script>
EOF

emit() {
  local file="$1"
  local page="$2"
  local title="$3"
  local content="$4"
  cat > "$file" <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body data-page="${page}">
${NAV}
<div class="main">
${TICKER}
${content}
</div>
${SCRIPT}
</body>
</html>
EOF
}

emit expertmarket.html landing "ExpertMarket — Trade on Expertise" '<div class="page active" id="landing"><div class="hero"><div class="hero-eyebrow">The World\'s First Expert Trading Platform</div><h1 class="hero-title">Invest in the People<br>Who <span>Actually Know</span><br>Their Stuff</h1><p class="hero-sub">ExpertMarket turns verified expert opinions into tradeable assets.</p><div class="hero-ctas"><button class="btn btn-primary btn-hero" onclick="showPage('"'"'dashboard'"'"')">Explore the Market</button><button class="btn btn-outline btn-hero" onclick="showPage('"'"'ipo'"'"')">Become an Expert</button></div></div></div>'
emit dashboard.html dashboard "ExpertMarket — Dashboard" '<div class="page active" id="dashboard"><div class="topbar"><h1 class="page-title">Market Dashboard</h1></div><div class="grid grid-4"><div class="card"><div class="card-title">Market Cap</div><div class="stat-value">£42.1M</div></div><div class="card"><div class="card-title">Active Experts</div><div class="stat-value">2,418</div></div><div class="card"><div class="card-title">Today\'s Volume</div><div class="stat-value">£1.2M</div></div><div class="card"><div class="card-title">AI Alerts</div><div class="stat-value">7</div></div></div></div>'
emit profile.html profile "ExpertMarket — Expert Profile" '<div class="page active" id="profile"><div class="topbar"><h1 class="page-title">Expert Profile</h1></div><div class="profile-hero"><div class="profile-av-lg">RK</div><div><h2>Rajan Kumar</h2><div class="verified-badge">Verified Expert</div><p style="margin-top:10px;color:var(--muted)">Indian & South Asian Cuisine · London, UK</p></div></div></div>'
emit stock.html stock "ExpertMarket — Expert Stock" '<div class="page active" id="stock"><div class="topbar"><h1 class="page-title">RAJAN.K — Expert Stock</h1></div><div class="stock-header"><div><div class="stock-price">£211.00</div><div class="up">▲ £7.52 (3.7%) today</div></div></div><div class="chart-wrap"><svg id="stock-canvas" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg"><path d="M0,160 C120,130 240,110 360,85 C480,65 600,40 720,20 C760,10 800,15 800,15" class="chart-line"/></svg></div></div>'
emit category.html category "ExpertMarket — Sector Indices" '<div class="page active" id="category"><div class="topbar"><h1 class="page-title">Sector Indices</h1></div><div class="grid grid-3"><div class="cat-card"><div class="cat-name">Japanese Cuisine</div><div class="mono">£890.30</div></div><div class="cat-card"><div class="cat-name">Fine Dining</div><div class="mono">£1,204.00</div></div><div class="cat-card"><div class="cat-name">Italian</div><div class="mono">£445.60</div></div></div></div>'
emit review.html review "ExpertMarket — Expert Verdict" '<div class="page active" id="review"><div class="topbar"><h1 class="page-title">Expert Verdict</h1></div><div class="card"><h2>Dishoom King\'s Cross</h2><div class="stars">★★★★☆</div><div class="review-box"><p>Dishoom continues to deliver on its Irani cafe concept with remarkable consistency.</p></div></div></div>'
emit ai.html ai "ExpertMarket — AI Recommendations" '<div class="page active" id="ai"><div class="topbar"><h1 class="page-title">AI Recommendations</h1></div><div class="grid grid-2"><div class="card"><div class="section-title">Tell Us Your Preferences</div><div class="pill-select"><div class="pill-opt selected" onclick="togglePill(this)">Japanese</div><div class="pill-opt" onclick="togglePill(this)">Indian</div><div class="pill-opt selected" onclick="togglePill(this)">Italian</div></div></div><div class="ai-block"><div class="ai-label"><div class="ai-dot"></div>AI Analysis</div><div class="ai-text">Based on your interests, AI identified high-conviction picks and index positions.</div></div></div></div>'
emit portfolio.html portfolio "ExpertMarket — My Portfolio" '<div class="page active" id="portfolio"><div class="topbar"><h1 class="page-title">My Portfolio</h1></div><div class="portfolio-summary"><div><div class="port-total">£2,450</div><div class="up">▲ £142.30 (+6.2%) all time</div></div></div><div class="card"><div class="section-title">Holdings</div><table class="table"><tbody><tr><td>Rajan Kumar</td><td>4</td><td>£844</td><td class="up">+£184</td></tr></tbody></table></div></div>'
emit ipo.html ipo "ExpertMarket — Join as Expert" '<div class="page active" id="ipo"><div class="topbar"><h1 class="page-title">Join as an Expert</h1></div><div class="grid grid-2"><div class="card"><div class="section-title">Expert Application Form</div><div class="form-field"><label class="form-label">Full Name</label><input class="form-input" type="text" placeholder="Your professional name"></div><button class="btn btn-primary" style="width:100%">Submit IPO Application</button></div><div class="ai-block"><div class="ai-label"><div class="ai-dot"></div>AI Suggested Starting Price</div><div class="ai-text">Suggested opening price: £45–£80 after verification.</div></div></div></div>'
emit trust.html trust "ExpertMarket — Trust & Verification" '<div class="page active" id="trust"><div class="topbar"><h1 class="page-title">Trust & Verification</h1></div><div class="grid grid-3"><div class="card" style="text-align:center"><div style="font-size:32px">🔐</div><div class="stat-value">99.2%</div><div class="info-tip">Fake Profile Detection Rate</div></div><div class="card" style="text-align:center"><div style="font-size:32px">🤖</div><div class="stat-value">24/7</div><div class="info-tip">AI Monitoring</div></div><div class="card" style="text-align:center"><div style="font-size:32px">✅</div><div class="stat-value">2,418</div><div class="info-tip">Verified Experts Live</div></div></div></div>'

rm -f generate_pages.sh
