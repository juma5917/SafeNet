const axios = require('axios');

// Simple keyword-based threat scanner as fallback
function simpleThreatScan(text) {
  const keywords = ['phish', 'malware', 'ddos', 'hack', 'exploit', 'threat', 'virus', 'ransom'];
  const lowered = text.toLowerCase();
  let matches = [];
  keywords.forEach(k => { if (lowered.includes(k)) matches.push(k); });
  const score = Math.min(1, matches.length / 3);
  return { score, matches };
}

// Basic crisis detection for immediate safety escalation
function detectCrisis(text) {
  if (!text) return false;
  const lowered = text.toLowerCase();
  const crisisKeywords = [
    'suicide', 'kill myself', 'i want to die', 'dont want to live', 'self-harm', 'hurt myself',
    'im being abused', 'they beat me', 'rape', 'i was raped', 'he raped me', 'stab', 'kill', 'murder',
    'im in danger', 'someone is trying to', 'threaten', 'im being attacked', 'bleeding', 'help me now'
  ];
  return crisisKeywords.some(k => lowered.includes(k));
}

// Standardized supportive response for crisis detection
function crisisResponse() {
  const hotline = process.env.SUPPORT_HOTLINE || null;
  const url = process.env.SUPPORT_URL || null;
  const resources = [];
  if (hotline) resources.push({ type: 'phone', value: hotline, label: 'Local helpline' });
  if (url) resources.push({ type: 'link', value: url, label: 'Support resources' });
  // Generic guidance
  const message = `I'm really sorry you're going through this. If you are in immediate danger, please call your local emergency number right now. ` +
    `If you can, contact a trusted person nearby. You can also reach out to a support helpline${hotline ? ' at ' + hotline : ''}${url ? ' or visit ' + url : ''}.`;
  return { crisis: true, message, resources };
}

exports.chat = async (req, res) => {
  try {
    const { message, language = 'en', mode = 'text', supportMode = false } = req.body || {};

    if (!message) return res.status(400).json({ error: 'No message provided' });

    // If in support mode, do immediate crisis detection and return referrals if needed.
    const isCrisis = detectCrisis(message);
    if (supportMode && isCrisis) {
      // Return a standardized, non-therapeutic escalation response with referral info.
      return res.json(crisisResponse());
    }

    // Prepare trauma-informed and culturally sensitive prompts for GBV and digital literacy
    const gbvSystem = `You are SafeNet's multilingual GBV and Digital Safety assistant tailored for African contexts. Be empathetic, culturally sensitive, trauma-informed, and prioritize survivor safety and dignity. For Support Mode: validate feelings, provide grounding techniques, immediate safety steps, and local referral suggestions when available; never give clinical diagnoses or instructions that could increase risk. For Training Mode: provide clear, actionable digital literacy and GBV prevention guidance, culturally relevant examples, safe-by-design tips, and empowerment-focused learning steps suitable for girls and women in African communities. Maintain confidentiality and suggest professional/local services for legal, medical, or emergency needs.`;

    // If an AI provider is configured, proxy the request; otherwise return a friendly mock response.
    const apiKey = process.env.AI_API_KEY;
    const provider = (process.env.AI_PROVIDER || 'mock').toLowerCase();

    if (apiKey && provider === 'openai') {
      // Call OpenAI Chat Completions
      const model = process.env.AI_MODEL || 'gpt-4o-mini';
      // Choose system prompt based on modes
      let systemPrompt = gbvSystem;
      if (supportMode) systemPrompt = gbvSystem; // support-oriented prompt
      if (req.body.trainingMode) systemPrompt = gbvSystem; // training-oriented prompt (same base includes training guidance)

      const payload = {
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.6
      };

      const headers = { Authorization: `Bearer ${apiKey}` };
      const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, { headers });
      const reply = response?.data?.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
      return res.json({ text: reply });
    }

    // Fallback mock behavior: simple echo + threat scan; if supportMode, include supportive phrasing
    const scan = simpleThreatScan(message);
    const supportPrefix = supportMode ? 'I hear you — thank you for sharing. ' : '';
    const reply = `${supportPrefix}SafeNet Assistant (${language}): I received your message. ${scan.score > 0 ? 'Potential risks detected.' : 'No obvious threats found.'}`;
    return res.json({ text: reply, scan });
  } catch (err) {
    console.error('AI chat error', err);
    return res.status(500).json({ error: 'AI chat error', details: err.message });
  }
};

exports.scan = async (req, res) => {
  try {
    const { text } = req.body || {};
    if (!text) return res.status(400).json({ error: 'No text provided for scanning' });
    const scan = simpleThreatScan(text);
    return res.json({ scan });
  } catch (err) {
    console.error('AI scan error', err);
    return res.status(500).json({ error: 'AI scan error', details: err.message });
  }
};
