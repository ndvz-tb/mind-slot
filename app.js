// MindSlot — Interactive Hackathon MVP (LocalStorage-backed, zero dependencies)

const STORAGE_KEY = 'mindslot_mvp_state_v2';

function offsetDateStr(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getDefaultState() {
  return {
    settings: {
      specName: 'Анна Савченко',
      specTitle: 'Клінічний психолог, КПТ-терапевт • Індивідуальні сесії (50 хв)',
      price: 1500,
      meetUrl: 'https://meet.google.com/mind-slot-demo',
      paymentInfo: 'Monobank • 5375 4112 0000 1234 (ФОП Савченко А.)',
      rule24h: true,
    },
    waitlistCount: 3,
    clients: [
      {
        id: 'c1',
        name: 'Олена М.',
        tg: '@olena_m',
        bio: 'Емоційне вигорання після підвищення, постійна провина при відпочинку та складність делегувати.',
        sessionsCount: 7,
        credit: 0,
        unread: 1,
        messages: [
          { sender: 'specialist', text: 'Вітаю, Олено! Нагадую, що сьогодні о 18:00 наша сесія. Посилання вже у вашому кабінеті.', time: '14:10' },
          { sender: 'client', text: 'Добрий день! У нас щойно вимкнули світло і зник інтернет — боюсь, не встигну на 18:00. Це форс-мажор, чи можна не списувати оплату?', time: '15:42' },
        ],
        checkins: [
          { date: 'Вчора, 21:10', mood: 7, note: 'Вдалося закрити ноутбук о 19:00 без відчуття провини — прогрес!' },
          { date: '3 дні тому', mood: 4, note: 'Стресовий мітинг із керівником, знову тригернуло бажання все контролювати.' },
        ],
        notes: [
          { date: 'Минула сесія', text: 'Розібрали автоматичну думку «якщо я відпочиваю — я лінива». Домашка: 2 вечори без робочих чатів.' },
          { date: '2 тижні тому', text: 'Сформували шкалу ресурсу. Добре реагує на структуровані КПТ-таблиці.' },
        ],
      },
      {
        id: 'c2',
        name: 'Андрій К.',
        tg: '@andriy_k',
        bio: 'Тривожність перед публічними виступами та перевантаження новинами.',
        sessionsCount: 3,
        credit: 0,
        unread: 0,
        messages: [
          { sender: 'client', text: 'Привіт! Скинув оплату за завтрашню сесію о 11:00.', time: '12:20' },
        ],
        checkins: [
          { date: 'Сьогодні, 09:30', mood: 6, note: 'Зробив дихальну практику перед дзвінком — пульс швидко заспокоївся.' },
        ],
        notes: [
          { date: 'Минула сесія', text: 'Опрацювали техніку заземлення 5-4-3-2-1. Наступного разу перевірити щоденник тригерів.' },
        ],
      },
      {
        id: 'c3',
        name: 'Софія В.',
        tg: '@sofia_v',
        bio: 'Особисті кордони у стосунках із батьками, складно говорити «ні».',
        sessionsCount: 5,
        credit: 0,
        unread: 0,
        messages: [
          { sender: 'specialist', text: 'Софіє, дякую за вчорашній чек-ін! Обов’язково розберемо цей успіх на зустрічі.', time: 'Вчора' },
        ],
        checkins: [
          { date: '2 дні тому', mood: 8, note: 'Спокійно сказала мамі, що приїду в неділю, а не в суботу. Без сварки!' },
        ],
        notes: [
          { date: 'Минула сесія', text: 'Потренували «Я-повідомлення». Запропонувати долучитись до групи по кордонах.' },
        ],
      },
      {
        id: 'c4',
        name: 'Дмитро Т.',
        tg: '@dmytro_t',
        bio: 'Перший запит: втрата мотивації, прокрастинація, складно планувати майбутнє.',
        sessionsCount: 1,
        credit: 0,
        unread: 0,
        messages: [],
        checkins: [],
        notes: [
          { date: 'Знайомство', text: 'Первинна діагностика, запит чіткий. Узгодили регулярність 1 раз/тиждень.' },
        ],
      },
    ],
    slots: [
      { id: 's1', date: offsetDateStr(0), time: '18:00', price: 1500, status: 'confirmed', clientId: 'c1', hoursLeft: 4, forceMajeureReason: 'Вимкнули світло та інтернет' },
      { id: 's2', date: offsetDateStr(1), time: '11:00', price: 1500, status: 'pending', clientId: 'c2', hoursLeft: 19, forceMajeureReason: null },
      { id: 's3', date: offsetDateStr(1), time: '14:00', price: 1500, status: 'free', clientId: null, hoursLeft: 22, forceMajeureReason: null },
      { id: 's4', date: offsetDateStr(2), time: '10:00', price: 1500, status: 'confirmed', clientId: 'c3', hoursLeft: 42, forceMajeureReason: null },
      { id: 's5', date: offsetDateStr(2), time: '15:00', price: 1500, status: 'free', clientId: null, hoursLeft: 47, forceMajeureReason: null },
      { id: 's6', date: offsetDateStr(2), time: '17:00', price: 1500, status: 'free', clientId: null, hoursLeft: 49, forceMajeureReason: null },
      { id: 's7', date: offsetDateStr(3), time: '12:00', price: 1500, status: 'free', clientId: null, hoursLeft: 68, forceMajeureReason: null },
    ],
    groupProgram: null,
  };
}

let state = loadState();
let selectedClientId = state.clients[0]?.id || null;
let selectedChatClientId = state.clients[0]?.id || null;
let currentSlotFilter = 'all';
let selectedBookingSlotId = null;
let lastFreedSlotId = null;

function nowTimeStr() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Resetting state', e);
  }
  return getDefaultState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatDateUA(isoDate) {
  if (!isoDate) return '';
  const today = offsetDateStr(0);
  const tomorrow = offsetDateStr(1);
  if (isoDate === today) return 'Сьогодні';
  if (isoDate === tomorrow) return 'Завтра';
  const [y, m, d] = isoDate.split('-');
  return `${d}.${m}.${y}`;
}

function getClientById(id) {
  return state.clients.find((c) => c.id === id) || null;
}

function getHoursUntil(slot) {
  if (typeof slot.hoursLeft === 'number') return slot.hoursLeft;
  const target = new Date(`${slot.date}T${slot.time}:00`);
  const diffMs = target - new Date();
  return Math.round(diffMs / 36e5);
}

// ==================== TOASTS ====================
function showToast(title, body, isTelegram = false) {
  const stack = document.getElementById('toastStack');
  const el = document.createElement('div');
  el.className = `toast ${isTelegram ? 'toast-tg' : ''}`;
  el.innerHTML = `
    <div class="toast-title"><span>${title}</span></div>
    <div class="toast-body">${body}</div>
  `;
  stack.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    el.style.transition = 'all 0.2s';
    setTimeout(() => el.remove(), 220);
  }, 5200);
}

// ==================== MODAL ====================
function openModal(title, htmlContent) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = htmlContent;
  document.getElementById('modalBackdrop').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.add('hidden');
}

// ==================== RENDER ALL ====================
function renderAll() {
  renderSettingsUI();
  renderKPIs();
  renderSpecialistSlots();
  renderSpecChatThreads();
  renderSpecChatWindow();
  renderClientsList();
  renderClientDetail();
  renderClientBookingView();
  renderClientMyBookings();
  renderCheckinClients();
  renderClientChatUI();
  if (!state.groupProgram) {
    state.groupProgram = buildGroupProgram('burnout', 'КПТ (Когнітивно-поведінковий)', 6, 'Онлайн (Zoom, 90 хв)', 8, '');
  }
  renderGroupProgram();
}

function renderSettingsUI() {
  const s = state.settings;
  document.getElementById('sidebarSpecName').textContent = s.specName;
  document.getElementById('clientSpecName').textContent = s.specName;
  document.getElementById('clientSpecTitle').textContent = s.specTitle;
  document.getElementById('clientSpecPrice').textContent = Number(s.price).toLocaleString('uk-UA');
  document.getElementById('clientPaymentInfo').textContent = s.paymentInfo;
  document.getElementById('waitlistCount').textContent = state.waitlistCount;

  document.getElementById('setSpecName').value = s.specName;
  document.getElementById('setSpecTitle').value = s.specTitle;
  document.getElementById('setPrice').value = s.price;
  document.getElementById('setMeetUrl').value = s.meetUrl;
  document.getElementById('setPaymentInfo').value = s.paymentInfo;
  document.getElementById('setRule24h').checked = s.rule24h;

  document.getElementById('clientRuleBox').classList.toggle('hidden', !s.rule24h);
}

function renderKPIs() {
  const confirmed = state.slots.filter((s) => s.status === 'confirmed').length;
  const pending = state.slots.filter((s) => s.status === 'pending').length;
  const free = state.slots.filter((s) => s.status === 'free').length;

  document.getElementById('kpiConfirmed').textContent = confirmed;
  document.getElementById('kpiPending').textContent = pending;
  document.getElementById('kpiFree').textContent = free;
  document.getElementById('badgePending').textContent = pending;
  document.getElementById('badgePending').classList.toggle('hidden', pending === 0);
  document.getElementById('badgeClients').textContent = state.clients.length;

  const totalUnread = state.clients.reduce((sum, c) => sum + (c.unread || 0), 0);
  const badgeUnread = document.getElementById('badgeUnread');
  if (badgeUnread) {
    badgeUnread.textContent = totalUnread;
    badgeUnread.classList.toggle('hidden', totalUnread === 0);
  }
}

// ==================== SPECIALIST SLOTS ====================
function renderSpecialistSlots() {
  const container = document.getElementById('specialistSlotsList');
  const filtered = state.slots
    .filter((s) => currentSlotFilter === 'all' || s.status === currentSlotFilter)
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  if (filtered.length === 0) {
    container.innerHTML = `<div class="card muted">Немає слотів за цим фільтром. Додайте нове вільне вікно зверху.</div>`;
    return;
  }

  container.innerHTML = filtered
    .map((slot) => {
      const client = slot.clientId ? getClientById(slot.clientId) : null;
      const badgeMap = {
        free: `<span class="status-badge status-free">🟢 Вільно</span>`,
        pending: `<span class="status-badge status-pending">🟡 Очікує оплати</span>`,
        confirmed: `<span class="status-badge status-confirmed">🔵 Підтверджено</span>`,
      };

      let actions = '';
      if (slot.status === 'pending') {
        actions = `
          <button class="btn btn-primary btn-xs" onclick="confirmPayment('${slot.id}')">✅ Підтвердити оплату</button>
          <button class="btn btn-purple-soft btn-xs" onclick="waiveForceMajeure('${slot.id}')">🕊️ Форс-мажор (0 ₴)</button>
          <button class="btn btn-outline btn-xs" onclick="openChatWithClient('${slot.clientId}')">💬 Чат</button>
          <button class="btn btn-danger-soft btn-xs" onclick="freeSlot('${slot.id}')">Звільнити</button>
        `;
      } else if (slot.status === 'confirmed') {
        actions = `
          ${slot.forceMajeureReason
            ? `<button class="btn btn-purple-soft btn-xs" onclick="waiveForceMajeure('${slot.id}')">🕊️ Форс-мажор: не стягувати оплату</button>`
            : `<button class="btn btn-purple-soft btn-xs" onclick="waiveForceMajeure('${slot.id}')" title="Звільнити без штрафу і зберегти передоплату">🕊️ Форс-мажор (0 ₴)</button>`}
          <a class="btn btn-soft btn-xs" href="${state.settings.meetUrl}" target="_blank" rel="noopener">🎥 Zoom</a>
          <button class="btn btn-outline btn-xs" onclick="openChatWithClient('${slot.clientId}')">💬 Чат</button>
          <button class="btn btn-outline btn-xs" onclick="openClientCard('${slot.clientId}')">👤 Картка</button>
        `;
      } else {
        actions = `
          <button class="btn btn-ghost btn-xs" onclick="deleteSlot('${slot.id}')">🗑 Видалити</button>
        `;
      }

      const fmBadge = slot.forceMajeureReason
        ? `<span class="status-badge status-fm">🕊️ Форс-мажор: ${slot.forceMajeureReason}</span>`
        : '';

      return `
        <div class="slot-row">
          <div class="slot-left">
            <div class="slot-time-box">
              <div class="slot-date">${formatDateUA(slot.date)}</div>
              <div class="slot-hour">${slot.time}</div>
            </div>
            <div>
              <div class="slot-info-title">
                ${client ? `${client.name} (${client.tg})` : 'Вільне вікно для запису'}
                ${badgeMap[slot.status]}
                ${fmBadge}
              </div>
              <div class="slot-info-sub">
                ${client ? `Запит: ${client.bio.slice(0, 72)}${client.bio.length > 72 ? '…' : ''}` : `50 хв • ${slot.price} ₴ • Доступно на сторінці запису`}
              </div>
            </div>
          </div>
          <div class="slot-actions">${actions}</div>
        </div>
      `;
    })
    .join('');
}

window.confirmPayment = function (slotId) {
  const slot = state.slots.find((s) => s.id === slotId);
  if (!slot) return;
  slot.status = 'confirmed';
  const client = getClientById(slot.clientId);
  if (client) client.sessionsCount += 1;
  saveState();
  renderAll();
  showToast(
    '✅ Оплату підтверджено',
    `Клієнту ${client?.name || ''} автоматично надіслано підтвердження і посилання на відеозустріч.`,
    true
  );
};

window.freeSlot = function (slotId) {
  const slot = state.slots.find((s) => s.id === slotId);
  if (!slot) return;
  slot.status = 'free';
  slot.clientId = null;
  slot.forceMajeureReason = null;
  lastFreedSlotId = slot.id;
  saveState();
  renderAll();

  const banner = document.getElementById('waitlistBanner');
  document.getElementById('waitlistBannerText').textContent =
    ` Слот ${formatDateUA(slot.date)} о ${slot.time} звільнився → розіслано ${state.waitlistCount} клієнтам із листа очікування!`;
  banner.classList.remove('hidden');
  showToast('⚡ Слот звільнено', `Бот розіслав сповіщення ${state.waitlistCount} людям із листа очікування.`, true);
};

window.waiveForceMajeure = function (slotId) {
  const slot = state.slots.find((s) => s.id === slotId);
  if (!slot) return;
  const client = getClientById(slot.clientId);
  const wasPaid = slot.status === 'confirmed';
  const slotLabel = `${formatDateUA(slot.date)} о ${slot.time}`;

  if (client) {
    if (!client.messages) client.messages = [];
    if (wasPaid) {
      client.credit = (client.credit || 0) + slot.price;
    }
    client.messages.push({
      sender: 'system',
      text: wasPaid
        ? `🕊️ Психолог підтвердив форс-мажор: оплату за сесію ${slotLabel} НЕ стягнуто! Передоплата ${slot.price} ₴ збережена на вашому балансі для наступної зустрічі.`
        : `🕊️ Психолог підтвердив форс-мажор: бронь ${slotLabel} скасовано без стягнення оплати (0 ₴).`,
      time: nowTimeStr(),
    });
  }

  slot.status = 'free';
  slot.clientId = null;
  slot.forceMajeureReason = null;
  lastFreedSlotId = slot.id;
  saveState();
  renderAll();

  const banner = document.getElementById('waitlistBanner');
  document.getElementById('waitlistBannerText').textContent =
    ` Слот ${slotLabel} звільнено по форс-мажору → запропоновано ${state.waitlistCount} клієнтам із листа очікування!`;
  banner.classList.remove('hidden');

  showToast(
    '🕊️ Форс-мажор підтверджено — оплату НЕ стягнуто',
    wasPaid
      ? `Для ${client?.name || 'клієнта'} збережено ${slot.price} ₴ на балансі для наступної сесії. Сповіщення надіслано в чат.`
      : `Бронь ${client?.name || ''} скасовано без штрафу (0 ₴). Сповіщення надіслано в чат.`,
    true
  );
};

window.openChatWithClient = function (clientId) {
  if (!clientId) return;
  selectedChatClientId = clientId;
  const c = getClientById(clientId);
  if (c) c.unread = 0;
  saveState();
  switchSpecialistTab('chat');
  renderAll();
};

// ==================== MINI MESSENGER (SPECIALIST + CLIENT) ====================
function renderSpecChatThreads() {
  const list = document.getElementById('specChatThreads');
  if (!list) return;

  list.innerHTML = state.clients
    .map((c) => {
      const msgs = c.messages || [];
      const last = msgs[msgs.length - 1];
      const preview = last ? last.text.slice(0, 34) + (last.text.length > 34 ? '…' : '') : 'Немає повідомлень';
      const initials = c.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
      return `
        <button class="client-item ${c.id === selectedChatClientId ? 'active' : ''}" onclick="selectSpecChat('${c.id}')">
          <div class="avatar avatar-sage">${initials}</div>
          <div style="flex:1;min-width:0;">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:4px;">
              <span class="client-item-name">${c.name}</span>
              ${c.unread ? `<span class="nav-badge">${c.unread}</span>` : ''}
            </div>
            <div class="client-item-meta" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${preview}</div>
          </div>
        </button>
      `;
    })
    .join('');
}

window.selectSpecChat = function (id) {
  selectedChatClientId = id;
  const c = getClientById(id);
  if (c) c.unread = 0;
  saveState();
  renderAll();
};

function renderSpecChatWindow() {
  const win = document.getElementById('specChatWindow');
  if (!win) return;
  const c = getClientById(selectedChatClientId) || state.clients[0];
  if (!c) {
    win.innerHTML = `<div class="muted" style="padding:20px;">Оберіть діалог ліворуч</div>`;
    return;
  }

  const msgs = c.messages || [];
  const activeSlot = state.slots.find((s) => s.clientId === c.id && s.status !== 'free');

  const fmBar = activeSlot
    ? `
      <div class="fm-alert-bar">
        <div>
          <strong>📅 Сесія ${formatDateUA(activeSlot.date)} о ${activeSlot.time}</strong>
          ${activeSlot.forceMajeureReason ? ` • Причина форс-мажору: <em>${activeSlot.forceMajeureReason}</em>` : ' • Якщо у клієнта форс-мажор — можна не стягувати оплату'}
        </div>
        <button class="btn btn-primary btn-xs" onclick="waiveForceMajeure('${activeSlot.id}')">
          🕊️ Не стягувати оплату (форс-мажор)
        </button>
      </div>`
    : '';

  const messagesHtml = msgs.length
    ? msgs
        .map((m) => {
          const cls = m.sender === 'system' ? 'msg-system' : m.sender === 'specialist' ? 'msg-out' : 'msg-in';
          return `<div class="msg-bubble ${cls}">${m.text}<span class="msg-meta">${m.time}</span></div>`;
        })
        .join('')
    : `<div class="muted" style="text-align:center;margin:auto;">Почніть діалог із ${c.name}</div>`;

  win.innerHTML = `
    <div class="chat-window-head">
      <div>
        <div style="font-weight:700;font-size:15px;">${c.name} <span class="muted" style="font-weight:400;">(${c.tg})</span></div>
        <div class="muted" style="font-size:12px;">
          ${c.credit ? `💰 Збережена оплата (форс-мажор): ${c.credit} ₴ • ` : ''}${c.bio.slice(0, 68)}${c.bio.length > 68 ? '…' : ''}
        </div>
      </div>
      <button class="btn btn-outline btn-xs" onclick="openClientCard('${c.id}')">👤 Відкрити картку</button>
    </div>
    ${fmBar}
    <div class="chat-messages" id="specChatMessagesBox">${messagesHtml}</div>
    <form class="chat-input-form" onsubmit="sendSpecChatMessage(event, '${c.id}')">
      <input type="text" id="specChatInput" placeholder="Відповісти клієнту ${c.name}..." required />
      <button type="submit" class="btn btn-primary">Надіслати</button>
    </form>
  `;

  const box = document.getElementById('specChatMessagesBox');
  if (box) box.scrollTop = box.scrollHeight;
}

window.sendSpecChatMessage = function (e, clientId) {
  e.preventDefault();
  const input = document.getElementById('specChatInput');
  const text = input.value.trim();
  if (!text) return;
  const c = getClientById(clientId);
  if (!c) return;
  if (!c.messages) c.messages = [];
  c.messages.push({ sender: 'specialist', text, time: nowTimeStr() });
  saveState();
  renderAll();
  showToast('💬 Повідомлення надіслано', `Клієнт ${c.name} побачить його в «Чат із психологом».`, true);
};

function renderClientChatUI() {
  const sel = document.getElementById('clientChatSelect');
  const box = document.getElementById('clientChatMessages');
  if (!sel || !box) return;

  const currentVal = sel.value || selectedChatClientId || state.clients[0]?.id;
  sel.innerHTML = state.clients.map((c) => `<option value="${c.id}">${c.name} (${c.tg})</option>`).join('');
  if (state.clients.some((c) => c.id === currentVal)) sel.value = currentVal;

  const c = getClientById(sel.value) || state.clients[0];
  if (!c) return;
  const msgs = c.messages || [];

  box.innerHTML = msgs.length
    ? msgs
        .map((m) => {
          const cls = m.sender === 'system' ? 'msg-system' : m.sender === 'client' ? 'msg-out' : 'msg-in';
          return `<div class="msg-bubble ${cls}">${m.text}<span class="msg-meta">${m.time}</span></div>`;
        })
        .join('')
    : `<div class="muted" style="text-align:center;margin:auto;">Напишіть психологу щодо запису або форс-мажору</div>`;

  box.scrollTop = box.scrollHeight;
}

window.deleteSlot = function (slotId) {
  state.slots = state.slots.filter((s) => s.id !== slotId);
  saveState();
  renderAll();
  showToast('🗑 Слот видалено', 'Вікно прибрано з публічного розкладу.');
};

window.openClientCard = function (clientId) {
  if (!clientId) return;
  selectedClientId = clientId;
  switchSpecialistTab('clients');
  renderClientsList();
  renderClientDetail();
};

// ==================== CLIENTS DATABASE ====================
function renderClientsList() {
  const q = (document.getElementById('clientSearch')?.value || '').toLowerCase();
  const list = document.getElementById('clientsList');
  const matches = state.clients.filter(
    (c) => c.name.toLowerCase().includes(q) || c.bio.toLowerCase().includes(q) || c.tg.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    list.innerHTML = `<div class="muted" style="padding:12px;">Нікого не знайдено</div>`;
    return;
  }

  list.innerHTML = matches
    .map((c) => {
      const initials = c.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
      return `
        <button class="client-item ${c.id === selectedClientId ? 'active' : ''}" onclick="selectClient('${c.id}')">
          <div class="avatar avatar-sage">${initials}</div>
          <div>
            <div class="client-item-name">${c.name}</div>
            <div class="client-item-meta">${c.tg} • Сесій: ${c.sessionsCount}</div>
          </div>
        </button>
      `;
    })
    .join('');
}

window.selectClient = function (id) {
  selectedClientId = id;
  renderClientsList();
  renderClientDetail();
};

function renderClientDetail() {
  const panel = document.getElementById('clientDetailPanel');
  const c = getClientById(selectedClientId) || state.clients[0];
  if (!c) {
    panel.innerHTML = `<div class="muted">Оберіть клієнта ліворуч</div>`;
    return;
  }

  const upcoming = state.slots.find((s) => s.clientId === c.id && s.status !== 'free');
  const checkinsHtml = c.checkins.length
    ? c.checkins
        .map((ch) => {
          const moodCls = ch.mood <= 4 ? 'mood-low' : ch.mood <= 6 ? 'mood-mid' : 'mood-high';
          return `
            <div class="checkin-row">
              <span class="mood-pill ${moodCls}">${ch.mood} / 10</span>
              <div>
                <div style="font-size:13.5px;">${ch.note}</div>
                <div style="font-size:11.5px;color:var(--text-muted);margin-top:2px;">${ch.date}</div>
              </div>
            </div>
          `;
        })
        .join('')
    : `<div class="muted" style="font-size:13px;">Поки немає записів між сесіями. Спробуйте додати через «Екран клієнта → Чек-ін»!</div>`;

  const notesHtml = c.notes.length
    ? c.notes
        .map(
          (n) => `
          <div class="note-item">
            <div class="note-date">🔒 ${n.date}</div>
            <div>${n.text}</div>
          </div>`
        )
        .join('')
    : `<div class="muted" style="font-size:13px;">Ще немає приватних нотаток.</div>`;

  panel.innerHTML = `
    <div class="client-detail-head">
      <div>
        <h2 style="font-size:20px;">${c.name}</h2>
        <div class="muted">
          ${c.tg} • Проведено сесій: <strong>${c.sessionsCount}</strong>
          ${c.credit ? ` • <strong style="color:var(--sage)">💰 Баланс (перенесена оплата): ${c.credit} ₴</strong>` : ''}
        </div>
      </div>
      <div>
        ${
          upcoming
            ? `<span class="status-badge ${upcoming.status === 'confirmed' ? 'status-confirmed' : 'status-pending'}">
                 Наступна: ${formatDateUA(upcoming.date)} о ${upcoming.time}
               </span>`
            : `<span class="status-badge status-free">Немає активного запису</span>`
        }
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">📋 Біо та запит клієнта (з анкети при записі)</div>
      <div class="bio-box">${c.bio}</div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">📊 Щоденник між сесіями (167 годин)</div>
      <div class="checkin-list">${checkinsHtml}</div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">🔒 Приватні нотатки психолога (клієнт їх НЕ бачить)</div>
      <div class="notes-list">${notesHtml}</div>
      <form class="note-add-form" onsubmit="addPrivateNote(event, '${c.id}')">
        <input type="text" id="newNoteInput" placeholder="Додати коротку нотатку після сесії (прийде в шпаргалці за 15 хв)..." required />
        <button type="submit" class="btn btn-primary btn-sm">Зберегти</button>
      </form>
    </div>
  `;
}

window.addPrivateNote = function (e, clientId) {
  e.preventDefault();
  const input = document.getElementById('newNoteInput');
  const text = input.value.trim();
  if (!text) return;
  const c = getClientById(clientId);
  if (!c) return;
  c.notes.unshift({ date: 'Щойно додано', text });
  saveState();
  renderClientDetail();
  showToast('🔒 Приватну нотатку збережено', `Вона автоматично прийде вам у шпаргалці за 15 хв до наступної сесії з ${c.name}.`);
};

// ==================== GROUP PROGRAM BUILDER ====================
const GROUP_TEMPLATES = {
  burnout: {
    title: 'Антивигорання та повернення ресурсу',
    modules: [
      {
        name: 'Діагностика виснаження і безпечний простір',
        blocks: ['00–15 хв: Знайомство та правила конфіденційності', '15–45 хв: Вправа «Колесо енергії: куди тікає ресурс»', '45–75 хв: Робота в парах — пошук 3 головних «пожирачів сил»', '75–90 хв: Шеринг + Домашка: щоденник мікро-пауз'],
        planB: 'Якщо група мовчить на старті — запустіть швидкий чек-ін «Опишіть свій стан сьогодні погодою».',
      },
      {
        name: 'Перфекціонізм і провина за відпочинок',
        blocks: ['00–15 хв: Розбір домашки та чек-ін по шкалі втоми', '15–45 хв: Психоедукація — чому мозок карає за паузу', '45–75 хв: Практика «Лист внутрішньому критику»', '75–90 хв: Рефлексія + Домашка: 1 дозволений вечір без справ'],
        planB: 'Якщо один учасник забирає весь час — м’яко підсумуйте його тезу і спитайте: «У кого відгукнулось схоже?»',
      },
      {
        name: 'Межі на роботі та вміння делегувати',
        blocks: ['00–15 хв: Швидкий шеринг перемог тижня', '15–50 хв: Рольова вправа «М’яке і тверде НІ» в міні-групах', '50–75 хв: Розбір реальних робочих кейсів учасників', '75–90 хв: Підсумки + Домашка: 1 фраза-відмова за тиждень'],
        planB: 'Якщо кейси занадто емоційні — зробіть 3-хвилинну паузу на тілесне заземлення.',
      },
      {
        name: 'Тіло, сон та емоційна саморегуляція',
        blocks: ['00–15 хв: Тілесний скан «Де зараз живе напруга»', '15–45 хв: Набір швидкої допомоги при стресі (дихання + 5-4-3-2-1)', '45–75 хв: Створення особистої «Аптечки ресурсу»', '75–90 хв: Шеринг + Домашка: тест 2 технік зі своєї аптечки'],
        planB: 'Для інтровертної групи дайте 5 хв на письмове заповнення аптечки перед обговоренням.',
      },
      {
        name: 'Цінності замість гонки за досягненнями',
        blocks: ['00–15 хв: Чек-ін ресурсу', '15–50 хв: Вправа «Мій тиждень очима моїх цінностей»', '50–75 хв: Групова дискусія: що я роблю з «треба», а що з «хочу»', '75–90 хв: Закриття + Домашка: план одного ресурсного вихідного'],
        planB: 'Якщо час стискається — перенесіть частину дискусії у груповий Telegram-чат.',
      },
      {
        name: 'Профілактика рецидиву і завершення групи',
        blocks: ['00–15 хв: Порівняння «Я на 1-й зустрічі vs Я сьогодні»', '15–45 хв: Карта ранніх сигналів вигорання (червоні прапорці)', '45–75 хв: Ритуал подяки та зворотний зв’язок у колі', '75–90 хв: Фінальне закриття і план підтримки на 3 місяці'],
        planB: 'Залиште обов’язково 20 хв на тепле завершення — не затягуйте теоретичний блок.',
      },
    ],
  },
  boundaries: {
    title: 'Особисті кордони та вміння казати «ні»',
    modules: [
      {
        name: 'Карта моїх кордонів: де вони гнучкі, а де стерті',
        blocks: ['00–15 хв: Правила безпеки групи + знайомство', '15–45 хв: Вправа «3 кола близькості»', '45–75 хв: Обговорення в трійках: де найважче тримати межу', '75–90 хв: Шеринг + Домашка: помітити 3 моменти дискомфорту'],
        planB: 'Використовуйте анонімні картки/чат Zoom, якщо учасникам ніяково говорити вголос.',
      },
      {
        name: 'Страх образити і синдром «зручної людини»',
        blocks: ['00–15 хв: Розбір спостережень за тиждень', '15–45 хв: Чому ми боїмося чужої злості (розбір переконань)', '45–75 хв: Практика переформулювання провини у відповідальність', '75–90 хв: Підсумки + Домашка: експеримент «маленьке ні»'],
        planB: 'Якщо піднялась сильна тривога — нормалізуйте: дискомфорт на старті це ознака росту.',
      },
      {
        name: 'Техніка «Я-повідомлень» і спокійної відмови',
        blocks: ['00–15 хв: Чек-ін групи', '15–50 хв: Тренажер фраз-відмов у парах (робота / сім’я / друзі)', '50–75 хв: Зворотний зв’язок і корекція інтонації', '75–90 хв: Закриття + Домашка: застосувати 1 шаблон у житті'],
        planB: 'Запропонуйте готові 5 фраз-шаблонів на екрані, щоб зняти страх білого аркуша.',
      },
      {
        name: 'Кордони з близькими та маніпуляції',
        blocks: ['00–15 хв: Шеринг досвіду тижня', '15–45 хв: Розпізнавання пасивної агресії та образи', '45–75 хв: Техніка «Заїжджена платівка» в дії', '75–90 хв: Рефлексія + Домашка: сформулювати 1 правило для сім’ї'],
        planB: 'Слідкуйте за таймінгом — тема батьків завжди викликає довгі історії.',
      },
      {
        name: 'Злість як захисник кордонів',
        blocks: ['00–15 хв: Тілесний чек-ін', '15–45 хв: Екологічне проживання злості без крику й руйнування', '45–75 хв: Арт/метафорична практика «Мій внутрішній охоронець»', '75–90 хв: Шеринг + Домашка'],
        planB: 'Дайте 5 хв на індивідуальний малюнок або список перед обговоренням.',
      },
      {
        name: 'Інтеграція навичок і завершення',
        blocks: ['00–20 хв: Історії успіху за курс', '20–55 хв: Особистий кодекс кордонів кожного учасника', '55–90 хв: Коло підтримки і фінальний шеринг'],
        planB: 'Надішліть учасникам PDF-пам’ятку фраз одразу після завершення.',
      },
    ],
  },
  anxiety: {
    title: 'Опора під час тривоги та невизначеності',
    modules: [
      {
        name: 'Як працює тривога: ворог чи сигналізація?',
        blocks: ['00–15 хв: Знайомство і шкала тривоги (0–10)', '15–45 хв: Психоедукація — цикл тривоги', '45–75 хв: Вправа «Коло контролю vs Коло турбот»', '75–90 хв: Шеринг + Домашка: щоденник тривожних думок'],
        planB: 'Почніть із 2-хвилинного дихання «квадрат», якщо напруга висока.',
      },
      {
        name: 'Робота з катастрофізацією («А що як…»)',
        blocks: ['00–15 хв: Чек-ін тижня', '15–50 хв: КПТ-техніка «Декатастрофізація в 3 кроки»', '50–75 хв: Робота в парах над реальним страхом', '75–90 хв: Закриття + Домашка: 15-хвилинний «час для хвилювання»'],
        planB: 'Не знецінюйте страхи — спершу валідація, потім перевірка фактів.',
      },
      {
        name: 'Тілесні якорі та швидка стабілізація',
        blocks: ['00–15 хв: Обговорення практики', '15–50 хв: Тестування 4 тілесних технік (м’язова релаксація, заземлення)', '50–75 хв: Складання особистої картки першої допомоги', '75–90 хв: Рефлексія + Домашка'],
        planB: 'Попередьте, що камери можна вимкнути під час тілесної релаксації.',
      },
      {
        name: 'Життя в невизначеності та мікро-опори',
        blocks: ['00–15 хв: Швидкий шеринг', '15–50 хв: Вправа «Мої 5 щоденних якорів стабільності»', '50–75 хв: Груповий обмін робочими ритуалами', '75–90 хв: Підсумки + план підтримки'],
        planB: 'Зберіть спільний список ідей групи в одному повідомленні чату.',
      },
    ],
  },
  selfworth: {
    title: 'Здорова самооцінка і внутрішній критик',
    modules: [
      {
        name: 'Знайомство зі своїм внутрішнім критиком',
        blocks: ['00–15 хв: Правила групи і чек-ін', '15–45 хв: Вправа «Чиїм голосом говорить критик?»', '45–75 хв: Відділення фактів від оцінок у парах', '75–90 хв: Шеринг + Домашка: фіксувати фрази критика'],
        planB: 'Дайте учасникам можливість назвати критика смішним ім’ям — це знижує напругу.',
      },
      {
        name: 'Синдром самозванця і знецінення досягнень',
        blocks: ['00–15 хв: Розбір спостережень', '15–50 хв: Практика «Банк доказів моєї компетентності»', '50–75 хв: Взаємне підсвічування сильних сторін у групі', '75–90 хв: Закриття + Домашка: 3 щоденні факти успіху'],
        planB: 'Учасникам важко приймати компліменти — нагадайте просто сказати «Дякую».',
      },
      {
        name: 'Розвиток внутрішнього підтримувача',
        blocks: ['00–15 хв: Чек-ін', '15–50 хв: Вправа «Що б я сказав(ла) найкращому другу?»', '50–75 хв: Лист самопідтримки на складні дні', '75–90 хв: Рефлексія + Домашка'],
        planB: 'Дайте спокійну фонову музику на 7 хв для написання листа.',
      },
      {
        name: 'Стійка самоцінність і завершення курсу',
        blocks: ['00–20 хв: Огляд змін за програму', '20–55 хв: Вправа «Я без масок і доведення»', '55–90 хв: Тепле завершення і план на наступний місяць'],
        planB: 'Збережіть час на фінальний зворотний зв’язок кожному.',
      },
    ],
  },
};

function buildGroupProgram(topicKey, approach, count, format, size, customNeed) {
  const base = GROUP_TEMPLATES[topicKey] || GROUP_TEMPLATES.burnout;
  const sessions = [];
  for (let i = 0; i < count; i++) {
    const tpl = base.modules[i % base.modules.length];
    sessions.push({
      num: i + 1,
      name: i >= base.modules.length ? `${tpl.name} (поглиблена практика)` : tpl.name,
      blocks: tpl.blocks,
      planB: tpl.planB,
    });
  }
  return {
    title: base.title,
    approach,
    count,
    format,
    size,
    customNeed: customNeed.trim(),
    sessions,
  };
}

function renderGroupProgram() {
  const panel = document.getElementById('groupOutputPanel');
  const p = state.groupProgram;
  if (!p) return;

  panel.innerHTML = `
    <div class="group-program-head">
      <div>
        <div class="badge-soft">${p.approach} • ${p.format} • ${p.size} учасників</div>
        <h2 style="font-size:19px;margin-top:4px;">«${p.title}» (${p.count} зустрічей)</h2>
        ${p.customNeed ? `<p class="muted" style="margin-top:4px;">🎯 Адаптовано під запит: <em>${p.customNeed}</em></p>` : ''}
      </div>
      <button class="btn btn-outline btn-sm" onclick="copyGroupProgram()">📋 Копіювати план</button>
    </div>

    ${p.sessions
      .map(
        (s) => `
      <div class="session-card">
        <div class="session-card-head">
          <div class="session-card-title">Зустріч ${s.num}: ${s.name}</div>
        </div>
        <ul class="session-blocks">
          ${s.blocks.map((b) => `<li>• ${b}</li>`).join('')}
        </ul>
        <div class="plan-b">💡 <strong>План Б:</strong> ${s.planB}</div>
      </div>`
      )
      .join('')}
  `;
}

window.copyGroupProgram = function () {
  const p = state.groupProgram;
  if (!p) return;
  const text = [
    `Програма групи: ${p.title} (${p.approach}, ${p.format})`,
    ...p.sessions.map((s) => `\nЗустріч ${s.num}: ${s.name}\n${s.blocks.map((b) => '- ' + b).join('\n')}\nПлан Б: ${s.planB}`),
  ].join('\n');
  navigator.clipboard?.writeText(text).catch(() => {});
  showToast('📋 Програму скопійовано', 'Готовий план зустрічей із таймінгом у буфері обміну — можна вставляти в Notion або Telegram.');
};

// ==================== CLIENT VIEW: BOOKING ====================
function renderClientBookingView() {
  const grid = document.getElementById('clientFreeSlots');
  const freeSlots = state.slots
    .filter((s) => s.status === 'free')
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  if (freeSlots.length === 0) {
    grid.innerHTML = `<div class="muted" style="grid-column:1/-1;">Усі вікна зараз зайняті — станьте в лист очікування нижче!</div>`;
  } else {
    grid.innerHTML = freeSlots
      .map(
        (s) => `
        <button type="button" class="slot-pick-btn ${selectedBookingSlotId === s.id ? 'selected' : ''}" onclick="pickBookingSlot('${s.id}')">
          <div class="slot-pick-date">${formatDateUA(s.date)}</div>
          <div class="slot-pick-time">${s.time}</div>
          <div class="slot-pick-price">${s.price} ₴ • 50 хв</div>
        </button>`
      )
      .join('');
  }

  const display = document.getElementById('selectedSlotDisplay');
  const picked = state.slots.find((s) => s.id === selectedBookingSlotId && s.status === 'free');
  if (picked) {
    display.textContent = `✓ Обрано слот: ${formatDateUA(picked.date)} о ${picked.time} (${picked.price} ₴)`;
  } else {
    selectedBookingSlotId = null;
    display.textContent = '← Спочатку оберіть вільний слот ліворуч';
  }
}

window.pickBookingSlot = function (slotId) {
  selectedBookingSlotId = slotId;
  renderClientBookingView();
};

// ==================== CLIENT VIEW: MY BOOKINGS & 24H RULE ====================
function renderClientMyBookings() {
  const list = document.getElementById('clientMyBookingsList');
  const booked = state.slots
    .filter((s) => s.status !== 'free')
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  if (booked.length === 0) {
    list.innerHTML = `<div class="muted">Немає активних записів. Оберіть слот на вкладці «Записатися на сесію».</div>`;
    return;
  }

  list.innerHTML = booked
    .map((s) => {
      const c = getClientById(s.clientId);
      const hrs = getHoursUntil(s);
      const under24 = state.settings.rule24h && hrs < 24;
      return `
        <div class="slot-row">
          <div class="slot-left">
            <div class="slot-time-box">
              <div class="slot-date">${formatDateUA(s.date)}</div>
              <div class="slot-hour">${s.time}</div>
            </div>
            <div>
              <div class="slot-info-title">
                Сесія з ${state.settings.specName}
                <span class="status-badge ${s.status === 'confirmed' ? 'status-confirmed' : 'status-pending'}">
                  ${s.status === 'confirmed' ? '🔵 Підтверджено' : '🟡 Очікує підтвердження оплати'}
                </span>
              </div>
              <div class="slot-info-sub">
                Клієнт: ${c?.name || 'Гість'} • До сесії ~${Math.max(1, hrs)} год
                ${under24 ? '• <strong style="color:var(--rose)">Менше 24 год (діє правило сеттингу)</strong>' : '• <span style="color:var(--sage)">Доступне безкоштовне перенесення</span>'}
              </div>
            </div>
          </div>
          <div class="slot-actions">
            <button class="btn btn-outline btn-xs" onclick="initiateReschedule('${s.id}')">🔄 Перенести</button>
            <button class="btn btn-danger-soft btn-xs" onclick="initiateCancel('${s.id}')">❌ Скасувати</button>
          </div>
        </div>
      `;
    })
    .join('');
}

window.initiateReschedule = function (slotId) {
  const slot = state.slots.find((s) => s.id === slotId);
  if (!slot) return;
  const hrs = getHoursUntil(slot);
  const freeSlots = state.slots.filter((s) => s.status === 'free');

  if (state.settings.rule24h && hrs < 24) {
    openModal(
      '🛡️ Діє правило 24 годин (або форс-мажор)',
      `
      <p style="margin-bottom:12px;">До вашої сесії (<strong>${formatDateUA(slot.date)} о ${slot.time}</strong>) залишилось менше 24 годин (~${Math.max(1, hrs)} год).</p>
      <div class="ethical-box">
        За стандартним правилом безкоштовне авто-перенесення закрите. Але якщо у вас <strong>форс-мажор</strong> (відключення світла, тривога, хвороба) — надішліть запит психологу, щоб <strong>не стягувати оплату</strong> і зберегти її на наступну сесію.
      </div>
      <form onsubmit="submitForceMajeureRequest(event, '${slot.id}')">
        <label class="field">
          <span>Коротко вкажіть причину форс-мажору</span>
          <input type="text" id="fmReasonInput" placeholder="Напр. вимкнули світло / повітряна тривога / захворіла дитина" required />
        </label>
        <div class="form-actions-right">
          <button type="button" class="btn btn-ghost" onclick="closeModal()">Залишити запис</button>
          <button type="submit" class="btn btn-primary">🕊️ Запит на форс-мажор (0 ₴)</button>
        </div>
      </form>
      `
    );
    return;
  }

  if (freeSlots.length === 0) {
    openModal('Немає вільних вікон', `<p>На жаль, інших вільних слотів зараз немає.</p><div class="form-actions-right"><button class="btn btn-primary" onclick="closeModal()">Ок</button></div>`);
    return;
  }

  openModal(
    '🔄 Безкоштовне перенесення (> 24 год)',
    `
    <p class="muted" style="margin-bottom:12px;">До сесії більше 24 годин — оберіть нове вільне вікно. Психологу не треба писати вручну, розклад оновиться сам:</p>
    <div class="client-slots-grid">
      ${freeSlots
        .map(
          (fs) => `
          <button class="slot-pick-btn" onclick="completeReschedule('${slot.id}', '${fs.id}')">
            <div class="slot-pick-date">${formatDateUA(fs.date)}</div>
            <div class="slot-pick-time">${fs.time}</div>
            <div class="slot-pick-price">Обрати цей час →</div>
          </button>`
        )
        .join('')}
    </div>
    `
  );
};

window.completeReschedule = function (oldSlotId, newSlotId) {
  const oldS = state.slots.find((s) => s.id === oldSlotId);
  const newS = state.slots.find((s) => s.id === newSlotId);
  if (!oldS || !newS) return;

  newS.status = oldS.status;
  newS.clientId = oldS.clientId;
  oldS.status = 'free';
  oldS.clientId = null;

  saveState();
  closeModal();
  renderAll();
  showToast(
    '🔄 Сесію перенесено автоматично!',
    `Новий час: ${formatDateUA(newS.date)} о ${newS.time}. Старий слот відкрито для листа очікування.`,
    true
  );
};

window.initiateCancel = function (slotId) {
  const slot = state.slots.find((s) => s.id === slotId);
  if (!slot) return;
  const hrs = getHoursUntil(slot);
  const under24 = state.settings.rule24h && hrs < 24;

  openModal(
    under24 ? '⚠️ Скасування менш ніж за 24 год' : 'Скасувати сесію?',
    `
    <p style="margin-bottom:12px;">Сесія: <strong>${formatDateUA(slot.date)} о ${slot.time}</strong>.</p>
    ${
      under24
        ? `<div class="ethical-box"><strong>Увага:</strong> до сесії менше 24 годин. За стандартним правилом оплата (${slot.price} ₴) не повертається. Якщо стався <strong>форс-мажор</strong> — надішліть запит психологу нижче, щоб не стягувати оплату!</div>
           <form onsubmit="submitForceMajeureRequest(event, '${slot.id}')" style="margin-bottom:12px;">
             <label class="field">
               <span>Причина форс-мажору (щоб не стягувати оплату)</span>
               <input type="text" id="fmReasonInput" placeholder="Напр. форс-мажор зі світлом / невідкладна ситуація" required />
             </label>
             <button type="submit" class="btn btn-purple-soft btn-full">🕊️ Повідомити про форс-мажор (запросити 0 ₴)</button>
           </form>`
        : `<p class="muted" style="margin-bottom:12px;">До сесії більше 24 годин — скасування безкоштовне, а вікно автоматично передасться в лист очікування.</p>`
    }
    <div class="form-actions-right">
      <button class="btn btn-ghost" onclick="closeModal()">Назад</button>
      <button class="btn btn-danger-soft" onclick="confirmClientCancel('${slot.id}')">Скасувати ${under24 ? '(зі збереженням оплати)' : 'безкоштовно'}</button>
    </div>
    `
  );
};

window.submitForceMajeureRequest = function (e, slotId) {
  e.preventDefault();
  const reason = document.getElementById('fmReasonInput')?.value.trim() || 'Форс-мажор';
  const slot = state.slots.find((s) => s.id === slotId);
  if (!slot) return;
  slot.forceMajeureReason = reason;
  const client = getClientById(slot.clientId);
  if (client) {
    if (!client.messages) client.messages = [];
    client.messages.push({
      sender: 'client',
      text: `🕊️ Форс-мажор щодо сесії ${formatDateUA(slot.date)} о ${slot.time}: «${reason}». Прошу не стягувати оплату / перенести її на наступну зустріч.`,
      time: nowTimeStr(),
    });
    client.unread = (client.unread || 0) + 1;
    selectedChatClientId = client.id;
  }
  saveState();
  closeModal();
  renderAll();
  showToast(
    '🕊️ Запит про форс-мажор надіслано!',
    'Психолог побачить його в Міні-месенджері та Розкладі і зможе в 1 клік не стягувати оплату.',
    true
  );
};

window.confirmClientCancel = function (slotId) {
  closeModal();
  window.freeSlot(slotId);
};

// ==================== CLIENT CHECK-IN ====================
function renderCheckinClients() {
  const sel = document.getElementById('checkinClientSelect');
  sel.innerHTML = state.clients.map((c) => `<option value="${c.id}">${c.name} (${c.tg})</option>`).join('');
}

// ==================== NAVIGATION HELPERS ====================
function switchSpecialistTab(tabName) {
  document.querySelectorAll('.nav-item').forEach((b) => b.classList.toggle('active', b.dataset.tab === tabName));
  document.querySelectorAll('.tab-panel').forEach((p) => p.classList.toggle('active', p.id === `tab-${tabName}`));
}

function switchRole(role) {
  document.querySelectorAll('.role-btn').forEach((b) => b.classList.toggle('active', b.dataset.role === role));
  document.getElementById('specialistView').classList.toggle('active', role === 'specialist');
  document.getElementById('clientView').classList.toggle('active', role === 'client');
  renderAll();
}

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('newSlotDate').value = offsetDateStr(2);
  renderAll();

  // Role toggle
  document.querySelectorAll('.role-btn').forEach((btn) => {
    btn.addEventListener('click', () => switchRole(btn.dataset.role));
  });

  // Specialist tabs
  document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.addEventListener('click', () => switchSpecialistTab(btn.dataset.tab));
  });

  // Client sub-tabs
  document.querySelectorAll('.ctab').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ctab').forEach((b) => b.classList.toggle('active', b === btn));
      document.querySelectorAll('.ctab-panel').forEach((p) => p.classList.toggle('active', p.id === `ctab-${btn.dataset.ctab}`));
    });
  });

  // Filter chips
  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach((c) => c.classList.toggle('active', c === chip));
      currentSlotFilter = chip.dataset.filter;
      renderSpecialistSlots();
    });
  });

  // Add slot toggle & submit
  const addSlotForm = document.getElementById('addSlotForm');
  document.getElementById('btnToggleAddSlot').addEventListener('click', () => addSlotForm.classList.toggle('hidden'));
  document.getElementById('btnCancelAddSlot').addEventListener('click', () => addSlotForm.classList.add('hidden'));
  addSlotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('newSlotDate').value;
    const time = document.getElementById('newSlotTime').value;
    const price = Number(document.getElementById('newSlotPrice').value) || state.settings.price;
    state.slots.push({
      id: 's' + Date.now(),
      date,
      time,
      price,
      status: 'free',
      clientId: null,
    });
    saveState();
    addSlotForm.classList.add('hidden');
    renderAll();
    showToast('🟢 Вільний слот додано', `${formatDateUA(date)} о ${time} уже доступно на сторінці запису клієнта.`);
  });

  // Fill from waitlist simulation
  document.getElementById('btnFillWaitlist').addEventListener('click', () => {
    const slot = state.slots.find((s) => s.id === lastFreedSlotId && s.status === 'free') || state.slots.find((s) => s.status === 'free');
    if (!slot) return;
    slot.status = 'pending';
    slot.clientId = state.clients[3]?.id || state.clients[0].id;
    state.waitlistCount = Math.max(0, state.waitlistCount - 1);
    document.getElementById('waitlistBanner').classList.add('hidden');
    saveState();
    renderAll();
    showToast('🔥 Дірку в графіку закрито!', `Клієнт із листа очікування миттєво забрав слот ${formatDateUA(slot.date)} о ${slot.time}!`, true);
  });

  // New client form
  const newClientForm = document.getElementById('newClientForm');
  document.getElementById('btnOpenNewClient').addEventListener('click', () => newClientForm.classList.toggle('hidden'));
  document.getElementById('btnCancelNewClient').addEventListener('click', () => newClientForm.classList.add('hidden'));
  newClientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const c = {
      id: 'c' + Date.now(),
      name: document.getElementById('ncName').value.trim(),
      tg: document.getElementById('ncTg').value.trim(),
      bio: document.getElementById('ncBio').value.trim(),
      sessionsCount: 0,
      credit: 0,
      unread: 0,
      messages: [],
      checkins: [],
      notes: [],
    };
    state.clients.unshift(c);
    selectedClientId = c.id;
    saveState();
    newClientForm.reset();
    newClientForm.classList.add('hidden');
    renderAll();
    showToast('👤 Картку клієнта створено', `${c.name} додано до вашої бази.`);
  });

  // Client search
  document.getElementById('clientSearch').addEventListener('input', renderClientsList);

  // Group builder submit
  document.getElementById('groupBuilderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    state.groupProgram = buildGroupProgram(
      document.getElementById('grpTopic').value,
      document.getElementById('grpApproach').value,
      Number(document.getElementById('grpSessions').value),
      document.getElementById('grpFormat').value,
      Number(document.getElementById('grpSize').value),
      document.getElementById('grpCustomNeed').value
    );
    saveState();
    renderGroupProgram();
    showToast('✨ Програму групи згенеровано', `Готова структура на ${state.groupProgram.count} зустрічей із таймінгом і планом Б.`);
  });

  // Settings submit
  document.getElementById('settingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    state.settings = {
      specName: document.getElementById('setSpecName').value.trim(),
      specTitle: document.getElementById('setSpecTitle').value.trim(),
      price: Number(document.getElementById('setPrice').value) || 1500,
      meetUrl: document.getElementById('setMeetUrl').value.trim(),
      paymentInfo: document.getElementById('setPaymentInfo').value.trim(),
      rule24h: document.getElementById('setRule24h').checked,
    };
    saveState();
    renderAll();
    showToast('⚙️ Налаштування збережено', 'Зміни одразу оновились на сторінці запису клієнта.');
  });

  // Copy share link
  document.getElementById('btnCopyLink').addEventListener('click', () => {
    navigator.clipboard?.writeText('https://mindslot.app/anna-s').catch(() => {});
    showToast('🔗 Посилання скопійовано', 'Вставте у шапку Instagram або перемкніться на «Екран клієнта», щоб перевірити запис.');
  });

  // Client booking submit
  document.getElementById('clientBookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const slot = state.slots.find((s) => s.id === selectedBookingSlotId && s.status === 'free');
    if (!slot) {
      showToast('⚠️ Оберіть слот', 'Спочатку натисніть на вільну дату й час ліворуч.');
      return;
    }

    const name = document.getElementById('cbName').value.trim();
    const tg = document.getElementById('cbTg').value.trim();
    const bio = document.getElementById('cbBio').value.trim();

    let client = state.clients.find((c) => c.tg.toLowerCase() === tg.toLowerCase());
    if (!client) {
      client = { id: 'c' + Date.now(), name, tg, bio, sessionsCount: 0, credit: 0, unread: 0, messages: [], checkins: [], notes: [] };
      state.clients.unshift(client);
    } else {
      client.bio = bio;
    }

    slot.status = 'pending';
    slot.clientId = client.id;
    selectedClientId = client.id;
    selectedBookingSlotId = null;
    saveState();
    document.getElementById('clientBookingForm').reset();
    renderAll();

    showToast(
      '🎉 Слот зарезервовано!',
      `Психолог отримав сповіщення про оплату і вашу картку (${name}). Перемкніться в «Кабінет психолога», щоб підтвердити в 1 клік!`,
      true
    );
  });

  // Join waitlist
  document.getElementById('btnJoinWaitlist').addEventListener('click', () => {
    state.waitlistCount += 1;
    saveState();
    renderAll();
    showToast('⏳ Ви в листі очікування', 'Як тільки звільниться вікно — бот миттєво напише вам у Telegram.', true);
  });

  // Mood slider & check-in submit
  const moodSlider = document.getElementById('checkinMood');
  moodSlider.addEventListener('input', () => {
    document.getElementById('moodValueLabel').textContent = `${moodSlider.value} / 10`;
  });

  document.getElementById('clientCheckinForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const clientId = document.getElementById('checkinClientSelect').value;
    const mood = Number(moodSlider.value);
    const note = document.getElementById('checkinNote').value.trim();
    const c = getClientById(clientId);
    if (!c) return;
    c.checkins.unshift({ date: 'Щойно', mood, note });
    selectedClientId = c.id;
    saveState();
    document.getElementById('checkinNote').value = '';
    renderAll();
    showToast('📝 Чек-ін збережено', `Запис додано в картку «${c.name}» — психолог побачить його перед сесією!`, true);
  });

  // Demo live notifications simulation (Killer button for stage!)
  document.getElementById('btnDemoReminder').addEventListener('click', () => {
    const firstClient = state.clients[0];
    const lastNote = firstClient?.notes[0]?.text || 'Перевірити домашнє завдання.';
    showToast(
      '🤖 Telegram → Клієнту (за 24 год)',
      `Привіт, ${firstClient?.name}! Нагадую про сесію завтра о 18:00. Якщо треба перенести безкоштовно — зробіть це зараз в 1 клік.`,
      true
    );
    setTimeout(() => {
      showToast(
        '🧠 Шпаргалка психологу (за 15 хв)',
        `Через 15 хв ${firstClient?.name} (Оплачено ✅). Запит: ${firstClient?.bio.slice(0, 55)}… Нотатка: «${lastNote.slice(0, 75)}…»`,
        true
      );
    }, 900);
  });

  // Client mini-messenger events
  document.getElementById('clientChatSelect').addEventListener('change', () => {
    selectedChatClientId = document.getElementById('clientChatSelect').value;
    renderClientChatUI();
  });

  document.getElementById('btnQuickForceMajeure').addEventListener('click', () => {
    document.getElementById('clientChatInput').value =
      'У мене стався форс-мажор (вимкнули світло / невідкладна ситуація), чи можемо перенести сесію без стягнення оплати?';
    document.getElementById('clientChatInput').focus();
  });

  document.getElementById('btnQuickLate').addEventListener('click', () => {
    document.getElementById('clientChatInput').value = 'Вибачте, трохи затримуюсь — підключусь через 5 хвилин!';
    document.getElementById('clientChatInput').focus();
  });

  document.getElementById('clientChatForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const clientId = document.getElementById('clientChatSelect').value;
    const input = document.getElementById('clientChatInput');
    const text = input.value.trim();
    if (!text) return;
    const c = getClientById(clientId);
    if (!c) return;
    if (!c.messages) c.messages = [];
    c.messages.push({ sender: 'client', text, time: nowTimeStr() });
    c.unread = (c.unread || 0) + 1;
    selectedChatClientId = c.id;
    input.value = '';
    saveState();
    renderAll();
    showToast('💬 Надіслано психологу', `Повідомлення від ${c.name} уже в «Міні-месенджері» психолога!`, true);
  });

  // Reset demo
  document.getElementById('btnResetDemo').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    state = getDefaultState();
    selectedClientId = state.clients[0].id;
    saveState();
    renderAll();
    showToast('↺ Демо скинуто', 'Початкові дані відновлено.');
  });

  // Modal close
  document.getElementById('btnModalClose').addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'modalBackdrop') closeModal();
  });
});
