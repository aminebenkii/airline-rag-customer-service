// ==============================
// ELEMENT SELECTORS
// ==============================
const sendButton = document.getElementById('send-button');
const chatbox = document.getElementById('chat-messages');
const inputField = document.getElementById('chat-input');

// ==============================
// SESSION ID BY PAGE LOAD
// ==============================
const sessionID = crypto.randomUUID();

// ==============================
// EVENT LISTENERS
// ==============================

function setVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);


window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded');
  setVh(); // Call on initial load
  initLanguageSettings();
  initLanguageButtons();
  displayWelcomeContent();
  // Focus input on load
  inputField.focus();
});

sendButton.addEventListener('click', handleSend);
inputField.addEventListener('keydown', (e) => {
  if (e.key === "Enter") handleSend();
});

// ==============================
// LANGUAGE SETTINGS
// ==============================
const translations = {
  en: {
    title: "Air Arabica",
    subtitle: "Your 24/7 Virtual Travel Assistant",
    welcome: "👋 Hi! I'm your Air Arabica assistant. How can I help you today?",
    buttons: {
      booking: "Booking Information",
      baggage: "Baggage Policy",
      delay: "Delays & Cancellations",
      assistance: "Special Assistance"
    },

    responses: {

      booking: [
        "Booking channels", "Ok to Board", "Airport Terminals", "Payment", "Credit use", "Fare types",
        "Modification", "Cancellation", "Name change", "Refund", "Infants", "Unaccompanied minor",
        "Open ticket", "Credit card errors", "Additional services", "Booking confirmation",
        "Connecting flights", "Insurance claims", "Duplicate payments"
      ],
      baggage: [
        "Checked baggage", "Hand baggage", "Damaged baggage", "Prohibited items", "Animals and Pets",
        "Lost or delayed baggage", "Infant baggage allowance"
      ],
      delay: [
        "Flight delays", "Cancellations", "Compensation policies", "Rescheduling options", "Refund processes"
      ],
      assistance: [
        "Pregnant women", "Wheelchair support", "Baby Stroller", "Passengers with special needs"
      ]
    }
  },
  fr: {
    title: "Air Arabica",
    subtitle: "Votre assistant de voyage virtuel 24h/24 et 7j/7",
    welcome: "👋 Bonjour ! Je suis l'assistant Air Arabica. Comment puis-je vous aider aujourd'hui ?",
    buttons: {
      booking: "Informations sur la réservation",
      baggage: "Politique des bagages",
      delay: "Retards et annulations",
      assistance: "Assistance spéciale"
    },

    responses: {
      booking: [
        "Canaux de réservation", "Ok to Board", "Terminaux aéroportuaires", "Paiement", "Utilisation du crédit", "Types de tarifs",
        "Modification", "Annulation", "Changement de nom", "Remboursement", "Bébés", "Mineur non accompagné",
        "Billet ouvert", "Erreurs de carte bancaire", "Services supplémentaires", "Confirmation de réservation",
        "Vols avec correspondance", "Réclamations d'assurance", "Paiements en double"
      ],
      baggage: [
        "Bagages enregistrés", "Bagage à main", "Bagages endommagés", "Objets interdits", "Animaux et animaux de compagnie",
        "Bagages perdus ou retardés", "Franchise de bagages pour bébés"
      ],
      delay: [
        "Retards de vol", "Annulations", "Politiques de compensation", "Options de reprogrammation", "Procédures de remboursement"
      ],
      assistance: [
        "Femmes enceintes", "Assistance en fauteuil roulant", "Poussette pour bébé", "Passagers ayant des besoins spéciaux"

      ]
    }
  },

  ar: {
    title: "العربية للطيران",
    subtitle: "مساعدك الافتراضي للسفر على مدار الساعة",
    welcome: "👋 أهلاً وسهلاً! أنا مساعد العربية للطيران. كيف يمكنني مساعدتك اليوم؟",
    buttons: {
      booking: "معلومات الحجز",
      baggage: "سياسة الأمتعة",
      delay: "تأخيرات الرحلات والإلغاءات",
      assistance: "المساعدة الخاصة"
    },

    responses: {
      booking: [
        "قنوات الحجز", "الموافقة على الصعود", "صالات المطار", "الدفع", "استخدام الرصيد", "أنواع الأسعار",
        "تعديل الحجز", "إلغاء الحجز", "تغيير الاسم", "استرداد الأموال", "الرضع", "القاصرون غير المصحوبين",
        "تذكرة مفتوحة", "أخطاء بطاقة الائتمان", "خدمات إضافية", "تأكيد الحجز",
        "الرحلات المتصلة", "مطالبات التأمين", "المدفوعات المكررة"
      ],
      baggage: [
        "الأمتعة المسجلة", "أمتعة اليد", "الأمتعة التالفة", "العناصر المحظورة", "الحيوانات والحيوانات الأليفة",
        "الأمتعة المفقودة أو المتأخرة", "مخصصات أمتعة الرضع"
      ],
      delay: [
        "تأخيرات الرحلات", "الإلغاءات", "سياسات التعويض", "خيارات إعادة الجدولة", "إجراءات الاسترداد"
      ],
      assistance: [
        "النساء الحوامل", "دعم الكراسي المتحركة", "عربة أطفال", "الركاب ذوو الاحتياجات الخاصة"

      ]
    }
  }
};

function initLanguageSettings() {
  const lang = localStorage.getItem('chatLang') || 'en';
  const t = translations[lang];

  // Update header content
  document.querySelector('header h1').innerText = t.title;
  document.querySelector('header p').innerText = t.subtitle;

  // Correct Button IDs and Labels
  const buttonMap = {
    'btn-booking': t.buttons.booking,
    'btn-baggage': t.buttons.baggage,
    'btn-delay': t.buttons.delay,
    'btn-assistance': t.buttons.assistance
  };

  Object.entries(buttonMap).forEach(([id, text]) => {
    const btn = document.getElementById(id);
    if (btn) {
      const icon = btn.querySelector('i');
      btn.innerHTML = icon.outerHTML + ' ' + text;
    }
  });
}


function initLanguageButtons() {
  const langButtons = {
    en: document.getElementById('lang-en'),
    fr: document.getElementById('lang-fr'),
    ar: document.getElementById('lang-ar')
  };

  Object.entries(langButtons).forEach(([lang, btn]) => {
    if (btn) btn.addEventListener('click', () => {
      localStorage.setItem('chatLang', lang);
      location.reload();
    });
  });
}

function displayWelcomeContent() {
  // Check if the welcome message already exists
  const lang = localStorage.getItem('chatLang') || 'en';
  const welcomeText = translations[lang].welcome;

  // Look for an existing bot message with the welcome text
  const existing = Array.from(chatbox.getElementsByClassName('chat-bubble'))
    .some(bubble => bubble.classList.contains('bot') && bubble.innerText.trim() === welcomeText);

  if (!existing) {
    appendBotMessage(welcomeText);
  }
}

// ==============================
// SEND MESSAGE HANDLER
// ==============================
function handleSend() {
  const message = inputField.value.trim();
  if (!message) {
    inputField.classList.add("border-red-400");
    inputField.placeholder = "Please type something...";
    return;
  }

  inputField.classList.remove("border-red-400");
  inputField.placeholder = "Type your message...";
  appendUserMessage(message);
  inputField.value = "";
  toggleInput(false);

  const loadingBubble = createLoadingBubble();
  chatbox.appendChild(loadingBubble);
  scrollToBottom();

  fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionID, query: message })
  })
    .then(res => res.json())
    .then(data => {
      chatbox.removeChild(loadingBubble);
      appendBotMessage(data.answer);
    })
    .catch(() => {
      chatbox.removeChild(loadingBubble);
      appendErrorMessage("⚠️ An error occurred. Please try again later.");
    })
    .finally(() => {
      toggleInput(true);
      scrollToBottom();
    });
}

// ==============================
// Suggestion Buttons Click handler
// ==============================

function handleSuggestion(category) {
  const lang = localStorage.getItem('chatLang') || 'en';
  const t = translations[lang];
  const userMessage = t.buttons[category];
  const items = t.responses[category];

  appendUserMessage(userMessage);

  const loadingBubble = createLoadingBubble();
  chatbox.appendChild(loadingBubble);
  scrollToBottom();

  setTimeout(() => {
    chatbox.removeChild(loadingBubble);

    const askMessage = {
      en: "You can ask me about:",
      fr: "Vous pouvez me poser des questions sur :",
      ar: "يمكنك أن تسألني عن:"
    }[lang];

    const isRTL = lang === 'ar';
    const responseHTML = `
      <div style="text-align: ${isRTL ? 'right' : 'left'}; direction: ${isRTL ? 'rtl' : 'ltr'};">
        <p>${askMessage}</p>
        <ul class="bullet-list mt-2">
          ${items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;


    
    appendBotMessageHTML(responseHTML);
  }, 1200);
}

function appendBotMessageHTML(htmlContent) {
  const bubble = document.createElement('div');
  bubble.className = "chat-bubble bot message-animate";
  bubble.innerHTML = htmlContent;
  chatbox.appendChild(bubble);
  scrollToBottom();
}

document.querySelectorAll('#quick-suggestions button').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.id.replace('btn-', '');
    handleSuggestion(id);
  });
});




// ==============================
// UI HELPERS
// ==============================
function toggleInput(state) {
  inputField.disabled = !state;
  sendButton.disabled = !state;
  if (state) inputField.focus();
}

function scrollToBottom() {
  chatbox.scrollTop = chatbox.scrollHeight;
}

function appendUserMessage(msg) {
  const bubble = document.createElement('div');
  bubble.className = "chat-bubble user message-animate";
  bubble.innerText = msg;
  chatbox.appendChild(bubble);
  scrollToBottom();
}

function appendBotMessage(msg) {
  console.log('Appending bot message:', msg);
  const bubble = document.createElement('div');
  bubble.className = "chat-bubble bot message-animate";
  bubble.innerText = msg;
  chatbox.appendChild(bubble);
  scrollToBottom();
}

function appendErrorMessage(msg) {
  const bubble = document.createElement('div');
  bubble.className = "chat-bubble bot bg-red-50 text-red-600 border border-red-200 message-animate";
  bubble.innerText = msg;
  chatbox.appendChild(bubble);
  scrollToBottom();
}

function createLoadingBubble() {
  const loading = document.createElement('div');
  loading.className = "typing-indicator message-animate";
  loading.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `;
  return loading;
}
