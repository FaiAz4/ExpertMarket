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

function togglePill(el) {
  el.classList.toggle('selected');
}

function generateAIPicks() {
  const userType = document.getElementById('userType').value;
  const city = document.getElementById('cityInput').value.trim();
  const goal = document.getElementById('investmentGoal').value;
  const selectedPills = [...document.querySelectorAll('.pill-opt.selected')]
    .map(el => el.textContent.trim());

  if (!userType || !city || selectedPills.length === 0) {
    alert('Please select a user type, enter a city, and choose at least one interest.');
    return;
  }

  const aiResults = document.getElementById('aiResults');
  const plainEnglishText = document.getElementById('plainEnglishText');
  const aiAnalysisText = document.getElementById('aiAnalysisText');
  const expertRecommendations = document.getElementById('expertRecommendations');
  const starterPortfolio = document.getElementById('starterPortfolio');
  const diversificationText = document.getElementById('diversificationText');
  const whyPicksText = document.getElementById('whyPicksText');

  const userTypeLabelMap = {
    beginner: 'Beginner Investor',
    trader: 'Experienced Trader',
    expert: 'Industry Expert'
  };

  const goalLabelMap = {
    steady: 'low-risk and steady growth',
    momentum: 'momentum and trend exposure',
    longterm: 'long-term conviction',
    niche: 'discovering niche experts',
    local: 'local expertise only'
  };

  const userTypeLabel = userTypeLabelMap[userType] || 'User';
  const goalLabel = goalLabelMap[goal] || 'general investing';

  const sampleExperts = {
    Japanese: [
      { initials: 'YT', name: 'Yuki Tanaka', niche: 'Japanese Cuisine Specialist', price: '£142.50', confidence: '91%', risk: 'Medium', badge: 'High Conviction', avClass: 'a3' },
      { initials: 'AS', name: 'Aiko Sato', niche: 'Emerging Sushi & Tasting Expert', price: '£118.20', confidence: '84%', risk: 'High', badge: 'Emerging', avClass: 'a5' }
    ],
    Indian: [
      { initials: 'RK', name: 'Rajan Kumar', niche: 'Indian & South Asian Cuisine', price: '£211.00', confidence: '94%', risk: 'Low', badge: 'Top Rated', avClass: 'a2' },
      { initials: 'AN', name: 'Anika Sharma', niche: 'Regional Indian Dining Analyst', price: '£129.80', confidence: '86%', risk: 'Medium', badge: 'Growth', avClass: 'a1' }
    ],
    Italian: [
      { initials: 'MF', name: 'Marco Ferraro', niche: 'Italian Dining Expert', price: '£98.20', confidence: '88%', risk: 'Low', badge: 'Steady', avClass: 'a4' },
      { initials: 'GR', name: 'Giulia Romano', niche: 'Modern Italian Market Picker', price: '£105.40', confidence: '82%', risk: 'Medium', badge: 'Emerging', avClass: 'a3' }
    ],
    'Fine Dining': [
      { initials: 'CB', name: 'Claire Bennett', niche: 'Luxury Restaurant Critic', price: '£67.80', confidence: '79%', risk: 'Medium', badge: 'Specialist', avClass: 'a1' },
      { initials: 'JL', name: 'James Laurent', niche: 'Premium Experience Curator', price: '£121.60', confidence: '85%', risk: 'Medium', badge: 'High Potential', avClass: 'a4' }
    ],
    'Street Food': [
      { initials: 'MR', name: 'Maya Rahman', niche: 'Street Food Trend Expert', price: '£82.10', confidence: '83%', risk: 'High', badge: 'Growth', avClass: 'a2' },
      { initials: 'LC', name: 'Leo Carter', niche: 'Urban Food Scout', price: '£76.30', confidence: '78%', risk: 'High', badge: 'Emerging', avClass: 'a5' }
    ],
    Fusion: [
      { initials: 'NP', name: 'Noah Park', niche: 'Fusion Dining Strategist', price: '£134.70', confidence: '89%', risk: 'Medium', badge: 'Momentum', avClass: 'a3' },
      { initials: 'SI', name: 'Sana Iqbal', niche: 'Cross-Cuisine Expert', price: '£116.90', confidence: '87%', risk: 'Medium', badge: 'Promising', avClass: 'a2' }
    ]
  };

  let allExperts = [];
  selectedPills.forEach(category => {
    const experts = sampleExperts[category] || [];
    allExperts = allExperts.concat(experts.map(expert => ({ ...expert, category })));
  });

  plainEnglishText.textContent =
    `You are using the platform as a ${userTypeLabel.toLowerCase()} in ${city}, with a focus on ${selectedPills.join(', ')}. The AI has found expert picks that match your interests and your goal of ${goalLabel}.`;

  let aiTone = '';
  if (userType === 'beginner') {
    aiTone = 'The results prioritise clarity, accessibility, and easier-to-understand expert opportunities.';
  } else if (userType === 'trader') {
    aiTone = 'The results balance conviction, momentum, and portfolio structure for a more active trading approach.';
  } else {
    aiTone = 'The results emphasise specialist signals, category positioning, and broader market interpretation.';
  }

  let goalTone = '';
  if (goal === 'steady') {
    goalTone = ' Safer and more established experts are weighted more heavily.';
  } else if (goal === 'momentum') {
    goalTone = ' Faster-moving and trend-driven opportunities are prioritised.';
  } else if (goal === 'longterm') {
    goalTone = ' Picks are biased toward durable credibility and long-term positioning.';
  } else if (goal === 'niche') {
    goalTone = ' More specialist and under-the-radar experts are surfaced.';
  } else if (goal === 'local') {
    goalTone = ' Local relevance and city fit are emphasised more strongly.';
  }

  aiAnalysisText.textContent =
    `Based on your selected categories (${selectedPills.join(', ')}) and your chosen city of ${city}, the AI surfaced experts with strong relevance, trust potential, and market fit. ${aiTone}${goalTone}`;

  let expertsHtml = '';
  allExperts.forEach(expert => {
    expertsHtml += `
      <div class="expert-row ai-expert-row">
        <div class="expert-av ${expert.avClass}">${expert.initials}</div>
        <div class="expert-info">
          <div class="expert-name">${expert.name}</div>
          <div class="expert-niche">${expert.niche} • ${city}</div>
          <div class="ai-expert-note">${expert.badge} match in ${expert.category}</div>
          <div class="ai-metrics-row">
            <span class="badge badge-green">AI Confidence ${expert.confidence}</span>
            <span class="badge ${expert.risk === 'Low' ? 'badge-green' : expert.risk === 'Medium' ? 'badge-gold' : 'badge-red'}">Risk ${expert.risk}</span>
          </div>
        </div>
        <div class="expert-price">${expert.price}</div>
      </div>
    `;
  });
  expertRecommendations.innerHTML = expertsHtml;

  let starterHtml = '';
  if (userType === 'beginner') {
    starterHtml = `
      <div class="ai-portfolio-line"><span>Established Experts</span><span>50%</span></div>
      <div class="progress-bar"><div class="progress-fill ai-fill-50"></div></div>

      <div class="ai-portfolio-line"><span>Emerging Experts</span><span>30%</span></div>
      <div class="progress-bar"><div class="progress-fill ai-fill-30"></div></div>

      <div class="ai-portfolio-line"><span>Sector Index Exposure</span><span>20%</span></div>
      <div class="progress-bar"><div class="progress-fill ai-fill-20"></div></div>
    `;
  } else if (userType === 'trader') {
    starterHtml = `
      <div class="ai-portfolio-line"><span>High Conviction Positions</span><span>40%</span></div>
      <div class="progress-bar"><div class="progress-fill ai-fill-40"></div></div>

      <div class="ai-portfolio-line"><span>Momentum Picks</span><span>35%</span></div>
      <div class="progress-bar"><div class="progress-fill ai-fill-35"></div></div>

      <div class="ai-portfolio-line"><span>Watchlist / Optionality</span><span>25%</span></div>
      <div class="progress-bar"><div class="progress-fill ai-fill-25"></div></div>
    `;
  } else {
    starterHtml = `
      <div class="ai-portfolio-line"><span>Category Leaders</span><span>45%</span></div>
      <div class="progress-bar"><div class="progress-fill ai-fill-45"></div></div>

      <div class="ai-portfolio-line"><span>Specialist Positions</span><span>35%</span></div>
      <div class="progress-bar"><div class="progress-fill ai-fill-35"></div></div>

      <div class="ai-portfolio-line"><span>High-Upside Discovery</span><span>20%</span></div>
      <div class="progress-bar"><div class="progress-fill ai-fill-20"></div></div>
    `;
  }
  starterPortfolio.innerHTML = starterHtml;

  if (selectedPills.length === 1) {
    diversificationText.textContent =
      `Your current preference set is concentrated in ${selectedPills[0]} within ${city}. To reduce concentration risk, consider adding adjacent categories such as Fusion, Street Food, or Fine Dining so your exposure is not tied too heavily to a single niche.`;
  } else if (selectedPills.length === 2) {
    diversificationText.textContent =
      `Your interests are moderately diversified across ${selectedPills.join(' and ')} in ${city}. A sensible next step is to combine one established expert, one emerging expert, and one broader index-style position for better balance.`;
  } else {
    diversificationText.textContent =
      `Your interests are already well diversified across ${selectedPills.join(', ')} in ${city}. The AI suggests maintaining a blend of established experts, specialist positions, and a small discovery allocation to preserve balance and upside.`;
  }

  whyPicksText.innerHTML = `
    <div class="ai-why-list">
      <div class="ai-why-item">These experts align closely with your selected categories: <strong>${selectedPills.join(', ')}</strong>.</div>
      <div class="ai-why-item">The picks are adapted for a <strong>${userTypeLabel.toLowerCase()}</strong> rather than treating all users the same.</div>
      <div class="ai-why-item">Your chosen goal of <strong>${goalLabel}</strong> affects whether the AI prioritises safer, faster-growing, or more specialist opportunities.</div>
      <div class="ai-why-item">Recommendations are framed around <strong>${city}</strong> to keep the results locally relevant and easier to understand.</div>
    </div>
  `;

  aiResults.classList.remove('ai-results-hidden');
  aiResults.classList.add('ai-results-visible');
}

(function initPage() {
  const id = document.body.dataset.page;
  const ticker = document.getElementById('ticker');
  if (ticker) ticker.style.display = id === 'landing' ? 'none' : 'block';

  const navMap = {
    landing: 0,
    dashboard: 1,
    profile: 2,
    stock: 3,
    category: 4,
    review: 5,
    ai: 6,
    portfolio: 7,
    ipo: 8,
    trust: 9
  };

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.nav-item')[navMap[id]]?.classList.add('active');
})();