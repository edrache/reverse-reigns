// Game Logic

let deck = [];
let hand = [];
let slots = {
    main: null,
    mod1: null,
    mod2: null
};

// Character Stats
let charStats = {
    b: 0, // Bravery
    a: 0, // Altruism
    m: 0, // Materialism
    r: 0  // Rationalism
};

async function initGame() {
    await loadCards();
    randomizeStats();
    drawHand();
    setupDragDrop();
}

async function loadCards() {
    const files = ['Cards/items.json', 'Cards/locations.json', 'Cards/NPC.json'];
    let allCards = [];

    for (const f of files) {
        try {
            const res = await fetch(f);
            const json = await res.json();
            Object.values(json).forEach(arr => {
                if (Array.isArray(arr)) allCards.push(...arr);
            });
        } catch (e) {
            console.error("Failed to load " + f, e);
        }
    }

    deck = shuffle(allCards);
    console.log(`Loaded ${deck.length} cards.`);
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function randomizeStats() {
    charStats.b = Math.floor(Math.random() * 161) - 80;
    charStats.a = Math.floor(Math.random() * 161) - 80;
    charStats.m = Math.floor(Math.random() * 161) - 80;
    charStats.r = Math.floor(Math.random() * 161) - 80;
    updateStatsUI();
}

function updateStatsUI() {
    // Helper to identify trait text
    const getTag = (type, val) => {
        const levelKey = getTraitLevel(val); // Returns 'l1'...'l7'
        // Access global 't' object from simulator-logic.js
        if (t && t.en && t.en[`tr_${type}`]) {
            return t.en[`tr_${type}`][levelKey];
        }
        return val; // Fallback
    };

    document.getElementById('s-bravery').innerText = getTag('bravery', charStats.b);
    document.getElementById('s-altruism').innerText = getTag('altruism', charStats.a);
    document.getElementById('s-materialism').innerText = getTag('materialism', charStats.m);
    document.getElementById('s-rationalism').innerText = getTag('rationalism', charStats.r);

    // Remove dynamic coloring
    document.getElementById('s-bravery').style.color = '';
    document.getElementById('s-altruism').style.color = '';
    document.getElementById('s-materialism').style.color = '';
    document.getElementById('s-rationalism').style.color = '';
}

function drawHand() {
    const handEl = document.getElementById('hand-area');
    handEl.innerHTML = '';
    hand = [];

    for (let i = 0; i < 5; i++) {
        if (deck.length === 0) break;
        const card = deck.pop();
        hand.push(card);
        const el = createCardElement(card, i);
        handEl.appendChild(el);
    }
}

function createCardElement(card, index) {
    const el = document.createElement('div');
    el.className = 'game-card';
    el.draggable = true;
    el.dataset.index = index;
    el.dataset.id = card.id;

    const title = card.title.en;
    const type = card.type.toUpperCase();
    const tag = card.tag;
    const desc = card.description.en;

    el.innerHTML = `
        <div class="card-tag">${type} | ${tag}</div>
        <div class="card-title">${title}</div>
        <div class="card-desc">${desc}</div>
    `;

    el.addEventListener('dragstart', handleDragStart);
    el.addEventListener('dragend', handleDragEnd);

    return el;
}

// Drag & Drop
let draggedCardIndex = null;
let draggedCardId = null;

function handleDragStart(e) {
    this.classList.add('dragging');
    draggedCardIndex = this.dataset.index;
    draggedCardId = this.dataset.id;
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    draggedCardIndex = null;
    document.querySelectorAll('.card-slot').forEach(slot => slot.classList.remove('highlight'));
}

function setupDragDrop() {
    const slotsEl = document.querySelectorAll('.card-slot');
    slotsEl.forEach(slot => {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault();
            slot.classList.add('highlight');
        });
        slot.addEventListener('dragleave', () => {
            slot.classList.remove('highlight');
        });
        slot.addEventListener('drop', handleDrop);
    });
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('highlight');
    if (draggedCardIndex === null) return;

    const slotId = this.id;
    const card = hand[draggedCardIndex];
    if (!card) return;

    placeCardInSlot(card, slotId);
    hand.splice(draggedCardIndex, 1);
    renderHand();
}

function renderHand() {
    const handEl = document.getElementById('hand-area');
    handEl.innerHTML = '';
    hand.forEach((card, i) => {
        const el = createCardElement(card, i);
        handEl.appendChild(el);
    });
}

function placeCardInSlot(card, slotId) {
    if (slotId === 'slot-main') slots.main = card;
    if (slotId === 'slot-mod-1') slots.mod1 = card;
    if (slotId === 'slot-mod-2') slots.mod2 = card;
    renderSlot(slotId);
}

function renderSlot(slotId) {
    const slotEl = document.getElementById(slotId);
    let card = null;
    let isMain = false;

    if (slotId === 'slot-main') { card = slots.main; isMain = true; }
    if (slotId === 'slot-mod-1') card = slots.mod1;
    if (slotId === 'slot-mod-2') card = slots.mod2;

    slotEl.innerHTML = '';

    // --- SIDE EFFECT: Update Option Panels if Main ---
    if (isMain) {
        const panA = document.querySelector('#opt-a-display .opt-content');
        const panB = document.querySelector('#opt-b-display .opt-content');

        if (card) {
            panA.innerHTML = `<strong>${card.main_encounter.options.a.name.en}</strong><br><br><small>${card.main_encounter.options.a.description ? card.main_encounter.options.a.description.en : ''}</small>`;
            panB.innerHTML = `<strong>${card.main_encounter.options.b.name.en}</strong><br><br><small>${card.main_encounter.options.b.description ? card.main_encounter.options.b.description.en : ''}</small>`;
        } else {
            panA.innerHTML = "Draft your destination...";
            panB.innerHTML = "...to see the path.";
        }
    }
    // ------------------------------------------------

    if (!card) {
        let placeholder = "Drop Card Here";
        if (isMain) placeholder = "Drop Scenario Here";
        // Check if it is a mini slot?
        if (slotEl.classList.contains('mini-slot')) placeholder = "Mod";

        slotEl.innerHTML = `<span style="color:#bdc3c7;">${placeholder}</span>`;
        return;
    }

    const el = document.createElement('div');
    el.className = 'game-card';
    el.style.margin = '0';
    el.style.transform = 'none';

    const closeBtn = `<button class="card-remove-btn" onclick="removeCardFromSlot('${slotId}')">X</button>`;

    if (isMain) {
        // Main: Full view with Description
        el.classList.add('main-active');
        el.innerHTML = `
            ${closeBtn}
            <div class="card-tag">${card.type.toUpperCase()} | ${card.tag}</div>
            <div class="card-title" style="font-size:1.3em; margin-top:10px;">${card.title.en}</div>
            <div class="card-desc" style="font-size:1em; margin-top:10px;">${card.description.en}</div>
        `;
    } else {
        // Modifier: Mini view
        el.classList.add('mini');
        el.innerHTML = `
            ${closeBtn}
            <div class="card-tag">${card.type.toUpperCase()} | ${card.tag}</div>
            <div class="card-title">${card.title.en}</div>
        `;
    }

    slotEl.appendChild(el);
}

window.removeCardFromSlot = function (slotId) {
    let card = null;
    if (slotId === 'slot-main') { card = slots.main; slots.main = null; }
    if (slotId === 'slot-mod-1') { card = slots.mod1; slots.mod1 = null; }
    if (slotId === 'slot-mod-2') { card = slots.mod2; slots.mod2 = null; }

    if (card) {
        hand.push(card);
        renderHand();
        renderSlot(slotId);
    }
}

// Decision Logic
window.playTurn = function () {
    if (!slots.main) {
        alert("Please place a Main Encounter card first!");
        return;
    }

    // Disable Button (Optional visual feedback)
    document.getElementById('btn-decide').disabled = true;

    // Clear previous bubbles
    const container = document.getElementById('comic-overlay');
    if (container) container.innerHTML = '';

    let effStats = { ...charStats };
    const applyMod = (card) => {
        if (!card || !card.global_modifiers || !card.global_modifiers.weights) return;
        const w = card.global_modifiers.weights;
        const SCALE = 20;
        if (w.bravery) effStats.b += w.bravery * SCALE;
        if (w.altruism) effStats.a += w.altruism * SCALE;
        if (w.materialism) effStats.m += w.materialism * SCALE;
        if (w.rationalism) effStats.r += w.rationalism * SCALE;
    };

    applyMod(slots.main);
    applyMod(slots.mod1);
    applyMod(slots.mod2);

    const clamp = (n) => Math.max(-100, Math.min(100, n));
    effStats.b = clamp(effStats.b);
    effStats.a = clamp(effStats.a);
    effStats.m = clamp(effStats.m);
    effStats.r = clamp(effStats.r);

    const main = slots.main;
    const optA = { name: main.main_encounter.options.a.name.en, weights: main.main_encounter.options.a.weights };
    const optB = { name: main.main_encounter.options.b.name.en, weights: main.main_encounter.options.b.weights };

    const res = solveScenario(effStats, optA, optB, 'en');

    const wA = { b: optA.weights.bravery, a: optA.weights.altruism, m: optA.weights.materialism, r: optA.weights.rationalism };
    const wB = { b: optB.weights.bravery, a: optB.weights.altruism, m: optB.weights.materialism, r: optB.weights.rationalism };

    const thoughtsA = getThoughtsGlobal(effStats, wA, 'en');
    const thoughtsB = getThoughtsGlobal(effStats, wB, 'en');

    // Timing constants
    const DELAY_PER_BUBBLE = 1000;
    const GROUP_DELAY = 500;

    // Spawn A
    spawnBubblesAt(thoughtsA, 'opt-a-display', 0);

    // Spawn B after A finishes
    const delayB = (thoughtsA.length * DELAY_PER_BUBBLE) + GROUP_DELAY;
    spawnBubblesAt(thoughtsB, 'opt-b-display', delayB);

    // Show Inline Result after all bubbles
    const totalDelay = delayB + (thoughtsB.length * DELAY_PER_BUBBLE) + 500;

    setTimeout(() => {
        // Hide Button
        document.getElementById('btn-decide').style.display = 'none';

        // Show Inline Result
        const resultPanel = document.getElementById('result-panel');
        const text = document.getElementById('result-text-inline');

        text.innerText = res.winner;
        resultPanel.style.display = 'flex';

        // Log in background
        const logEl = document.getElementById('log-overlay');
        logEl.innerText = res.log;
        logEl.style.display = 'block';

    }, totalDelay);
}

function spawnBubblesAt(list, targetId, startDelay) {
    const container = document.getElementById('comic-overlay');
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    let delay = startDelay;

    list.forEach((item, index) => {
        setTimeout(() => {
            // Recalculate rect in case of resize
            const rect = targetEl.getBoundingClientRect();
            // Center of the target
            const startX = rect.left + rect.width / 2;
            const startY = rect.top; // Start at top of element

            const el = document.createElement('div');
            el.className = `thought-bubble ${item.sentiment === 'pos' ? 'bubble-pos' : 'bubble-neg'} bubble-anim`;
            el.innerHTML = `${item.text}<br><small>${item.meta}</small>`;

            // Wider Alternating Left/Right to prevent overlap
            const joyX = (index % 2 === 0) ? -40 : 40;

            // Stack upwards with LARGE gap to prevent vertical overlap
            const joyY = 150 - (index * 100);

            // Position using left/top
            // We need to account for bubble width to center it.
            // Since we can't know width before render, we can use transform: translateX(-50%)
            el.style.left = `${startX + joyX}px`;
            el.style.top = `${startY + joyY}px`;
            el.style.transform = `translateX(-50%)`; // Center horizontally

            // Click to remove
            el.onclick = () => el.remove();

            container.appendChild(el);

            // NO AUTO REMOVE

        }, delay);
        delay += 1000; // Delay between bubbles in same group
    });
}

// Next Turn Logic (Clean table, draw cards)
window.nextTurn = function () {
    // Hide Result
    document.getElementById('result-panel').style.display = 'none';

    // Show Button
    const btn = document.getElementById('btn-decide');
    btn.style.display = 'block';
    btn.disabled = false;

    // Clear Bubbles
    document.getElementById('comic-overlay').innerHTML = '';

    // Clear Log
    document.getElementById('log-overlay').style.display = 'none';

    // Clear Slots
    slots.main = null;
    slots.mod1 = null;
    slots.mod2 = null;
    renderSlot('slot-main');
    renderSlot('slot-mod-1');
    renderSlot('slot-mod-2');

    // Refill Hand
    while (hand.length < 5 && deck.length > 0) {
        hand.push(deck.pop());
    }
    renderHand();
}


// INITIALIZE GAME
initGame();
