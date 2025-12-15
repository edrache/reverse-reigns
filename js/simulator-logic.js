// --- SHARED DATA & LOGIC ---

// --- 0. LOCALIZATION & TRAITS DATA ---
const t = {
    en: {
        // UI
        char_title: "👤 Character",
        stat_sum: "Stat Sum:",
        target: "Target:",
        btn_random: "🎲 Randomize",
        scen_title: "⚔️ Scenario",
        btn_dragon: "Dragon",
        btn_beggar: "Beggar",
        btn_fire: "Fire",
        btn_calc: "▶ CALCULATE DECISION",

        // Sliders Headers
        s_bravery: "Bravery",
        s_altruism: "Altruism",
        s_materialism: "Materialism",
        s_rationalism: "Rationalism",

        // Sliders Labels
        l_coward: "Coward", l_hero: "Hero", l_brave: "Brave",
        l_egoist: "Egoist", l_altruist: "Altruist",
        l_ascetic: "Ascetic", l_greedy: "Greedy",
        l_impulse: "Impulse", l_logic: "Logic",

        // WeightsHeaders
        for_who_bravery: "For whom? (Bravery)",
        for_who_altruism: "For whom? (Altruism)",
        for_who_materialism: "For whom? (Materialism)",
        for_who_rationalism: "For whom? (Rationalism)",

        // Logs
        log_ready: "Ready...",
        log_random: "Character randomized.",
        log_loaded: "Loaded: ",
        log_header: "### SIMULATION RESULT ###\n\n",
        log_score: "Score",
        log_decision: "✅ DECISION",
        log_draw: "⚖️ DRAW",
        log_advantage: "Advantage",

        // Traits
        tr_bravery: {
            l1: "Cowardly", l2: "Fearful", l3: "Cautious", l4: "Composed", l5: "Confident", l6: "Brave", l7: "Fearless"
        },
        tr_altruism: {
            l1: "Vile", l2: "Selfish", l3: "Self-centered", l4: "Impartial", l5: "Helpful", l6: "Altruistic", l7: "Saintly"
        },
        tr_materialism: {
            l1: "Ascetic", l2: "Detached", l3: "Frugal", l4: "Resourceful", l5: "Pragmatic", l6: "Greedy", l7: "Miserly"
        },
        tr_rationalism: {
            l1: "Mad", l2: "Impulsive", l3: "Emotional", l4: "Lucid", l5: "Rational", l6: "Logical", l7: "Calculating"
        },
        // Scenarios
        scen_dragon_a: "Steal Diamond", scen_dragon_b: "Retreat",
        scen_beggar_a: "Buy map", scen_beggar_b: "Intimidate beggar",
        scen_fire_a: "Run into fire", scen_fire_b: "Call guards"
    },
    pl: {
        // UI
        char_title: "👤 Postać",
        stat_sum: "Suma statystyk:",
        target: "Cel:",
        btn_random: "🎲 Losuj",
        scen_title: "⚔️ Scenariusz",
        btn_dragon: "Smok",
        btn_beggar: "Żebrak",
        btn_fire: "Pożar",
        btn_calc: "▶ OBLICZ DECYZJĘ",

        // Sliders Headers
        s_bravery: "Odwaga",
        s_altruism: "Altruizm",
        s_materialism: "Materialism",
        s_rationalism: "Racjonalizm",

        // Sliders Labels
        l_coward: "Tchórz", l_hero: "Bohater", l_brave: "Odważny",
        l_egoist: "Egoista", l_altruist: "Altruista",
        l_ascetic: "Asceta", l_greedy: "Chciwy",
        l_impulse: "Impuls", l_logic: "Logika",

        // WeightsHeaders
        for_who_bravery: "Dla kogo? (Odwaga)",
        for_who_altruism: "Dla kogo? (Altruizm)",
        for_who_materialism: "Dla kogo? (Materialism)",
        for_who_rationalism: "Dla kogo? (Racjonalizm)",

        // Logs
        log_ready: "Gotowy...",
        log_random: "Postać wylosowana.",
        log_loaded: "Wczytano: ",
        log_header: "### WYNIK SYMULACJI ###\n\n",
        log_score: "Wynik",
        log_decision: "✅ DECYZJA",
        log_draw: "⚖️ REMIS",
        log_advantage: "Przewaga",

        // Traits
        tr_bravery: {
            l1: "Tchórzliwy", l2: "Lękliwy", l3: "Ostrożny", l4: "Opanowany", l5: "Pewny siebie", l6: "Odważny", l7: "Nieustraszony"
        },
        tr_altruism: {
            l1: "Nikczemny", l2: "Egoista", l3: "Zapatrzony w siebie", l4: "Bezstronny", l5: "Pomocny", l6: "Altruista", l7: "Święty"
        },
        tr_materialism: {
            l1: "Asceta", l2: "Wyrzeczony", l3: "Oszczędny", l4: "Zaradny", l5: "Pragmatyczny", l6: "Chciwy", l7: "Skąpiec"
        },
        tr_rationalism: {
            l1: "Szalony", l2: "Impulsywny", l3: "Emocjonalny", l4: "Trzeźwy", l5: "Rozsądny", l6: "Logiczny", l7: "Kalkulujący"
        },
        // Scenarios
        scen_dragon_a: "Ukradnij diament", scen_dragon_b: "Wycofaj się",
        scen_beggar_a: "Kup mapę", scen_beggar_b: "Zastrasz żebraka",
        scen_fire_a: "Wbiegnij w ogień", scen_fire_b: "Zawołaj straż"
    }
};

const traitThoughts = {
    bravery: {
        cowardly: {
            range: [-100, -80],
            support: { pl: "Tak! Wybierzmy to, co najbezpieczniejsze. Błagam!", en: "Yes! Let's choose the safest option. I beg you!" },
            oppose: { pl: "Nie! To prosty sposób, żeby sobie napytać biedy!", en: "No! That's a sure way to invite trouble!" }
        },
        fearful: {
            range: [-80, -50],
            support: { pl: "Ta opcja wydaje się najmniej groźna. Trzymajmy się tego.", en: "This option seems the least threatening. Let's stick to it." },
            oppose: { pl: "Czuję w kościach, że to się źle skończy. Nie róbmy tego.", en: "I can feel in my bones this will end badly. Let's not do it." }
        },
        cautious: {
            range: [-50, -10],
            support: { pl: "To rozsądne. Nie ma sensu podejmować zbędnego ryzyka.", en: "That's sensible. No point in taking unnecessary risks." },
            oppose: { pl: "Zbyt duża niewiadoma. Powinniśmy być bardziej asekuracyjni.", en: "Too many unknowns. We should be more conservative." }
        },
        composed: {
            range: [-10, 10],
            support: { pl: "Zachowajmy zimną krew. To najbardziej stabilne rozwiązanie.", en: "Let's keep our cool. This is the most stable solution." },
            oppose: { pl: "Nie traćmy głowy. To działanie jest zbyt gwałtowne.", en: "Let's not lose our heads. This action is too drastic." }
        },
        confident: {
            range: [10, 50],
            support: { pl: "Damy radę. Nie ma co się wahać.", en: "We can handle it. No need to hesitate." },
            oppose: { pl: "Zbytnia ostrożność nas tylko spowolni. Działajmy.", en: "Too much caution will only slow us down. Let's act." }
        },
        brave: {
            range: [50, 80],
            support: { pl: "To wymaga śmiałości, a mi jej nie brakuje. Zróbmy to!", en: "This requires boldness, and I have plenty. Let's do it!" },
            oppose: { pl: "Nie będę się chować po kątach. Wybierzmy coś ambitniejszego.", en: "I won't hide in the corners. Let's choose something more ambitious." }
        },
        fearless: {
            range: [80, 100],
            support: { pl: "Wszystko albo nic! Tylko wielkie czyny mają znaczenie!", en: "All or nothing! Only great deeds matter!" },
            oppose: { pl: "Bezpieczeństwo jest dla nudziarzy. Ja chcę poczuć, że żyję!", en: "Safety is for boring people. I want to feel alive!" }
        }
    },
    altruism: {
        vile: {
            range: [-100, -80],
            support: { pl: "Cudze cierpienie mnie nie obchodzi, byle bym ja zyskał.", en: "I don't care about others' suffering, as long as I gain." },
            oppose: { pl: "Mam im pomóc? Wolne żarty. Niech radzą sobie sami.", en: "Help them? You must be joking. Let them rot." }
        },
        selfish: {
            range: [-80, -50],
            support: { pl: "To przynosi korzyść mnie, więc w to wchodzę.", en: "This benefits me, so count me in." },
            oppose: { pl: "Nie widzę w tym zysku dla siebie. Nie jestem zainteresowany.", en: "I see no profit for myself here. I'm not interested." }
        },
        self_centered: {
            range: [-50, -10],
            support: { pl: "Zgoda, o ile nie będzie mnie to zbyt wiele kosztować.", en: "Agreed, as long as it doesn't cost me too much." },
            oppose: { pl: "Dlaczego mam poświęcać swój komfort dla kogoś innego?", en: "Why should I sacrifice my comfort for someone else?" }
        },
        impartial: {
            range: [-10, 10],
            support: { pl: "To sprawiedliwy układ. Nikogo nie faworyzuje.", en: "It's a fair arrangement. It favors no one." },
            oppose: { pl: "To by naruszyło równowagę. Musimy pozostać obiektywni.", en: "That would disturb the balance. We must remain objective." }
        },
        helpful: {
            range: [10, 50],
            support: { pl: "Warto podać pomocną dłoń. To dobra decyzja.", en: "It's worth lending a hand. That's a good decision." },
            oppose: { pl: "To nie jest w porządku wobec innych. Poszukajmy lepszej drogi.", en: "That's not fair to others. Let's find a better way." }
        },
        altruistic: {
            range: [50, 80],
            support: { pl: "Dobro ogółu jest ważniejsze niż moje. Zróbmy tak.", en: "The greater good is more important than mine. Let's do it." },
            oppose: { pl: "Nie mogę przejść obojętnie, gdy komuś dzieje się krzywda.", en: "I cannot turn a blind eye when someone is being harmed." }
        },
        saintly: {
            range: [80, 100],
            support: { pl: "Poświęcenie dla innych to najwyższa cnota. Jestem gotów.", en: "Sacrifice for others is the highest virtue. I am ready." },
            oppose: { pl: "Nie przyłożę ręki do niczego, co niesie cierpienie.", en: "I will not be party to anything that brings suffering." }
        }
    },
    materialism: {
        ascetic: {
            range: [-100, -80],
            support: { pl: "Odrzućmy to co zbędne. Mniej znaczy więcej.", en: "Let's discard the unnecessary. Less is more." },
            oppose: { pl: "To tylko pusta chciwość. Nie potrzebujemy tego.", en: "It's just empty greed. We don't need this." }
        },
        detached: {
            range: [-80, -50],
            support: { pl: "Dobra materialne nie mają znaczenia. Zostawmy to.", en: "Material goods don't matter. Let it go." },
            oppose: { pl: "Po co obciążać się kolejnymi rzeczami? To balast.", en: "Why burden ourselves with more things? It's dead weight." }
        },
        frugal: {
            range: [-50, -10],
            support: { pl: "To oszczędne rozwiązanie. Nie zmarnujemy zasobów.", en: "It's a frugal solution. We won't waste resources." },
            oppose: { pl: "To rozrzutność. Szkoda na to środków.", en: "That's wasteful. Not worth the resources." }
        },
        resourceful: {
            range: [-10, 10],
            support: { pl: "Wykorzystajmy to, co mamy. To praktyczne podejście.", en: "Let's use what we have. It's a practical approach." },
            oppose: { pl: "Stosunek zysku do wysiłku jest słaby. Nie opłaca się.", en: "The gain-to-effort ratio is poor. Not worth it." }
        },
        pragmatic: {
            range: [10, 50],
            support: { pl: "To solidna inwestycja. Wyjdziemy na tym na plus.", en: "That's a solid investment. We'll come out ahead." },
            oppose: { pl: "Nie widzę tutaj konkretnej wartości. Odpuśćmy.", en: "I don't see tangible value here. Let's pass." }
        },
        greedy: {
            range: [50, 80],
            support: { pl: "Bierzmy ile się da! Taka okazja może się nie powtórzyć.", en: "Let's take all we can! Such a chance might not return." },
            oppose: { pl: "Odejść z pustymi rękami? Nigdy w życiu!", en: "Walk away empty-handed? Never in my life!" }
        },
        miserly: {
            range: [80, 100],
            support: { pl: "To moje! Musimy to zabezpieczyć za wszelką cenę.", en: "It's mine! We must secure it at all costs." },
            oppose: { pl: "Nie wydam ani grosza, nie oddam ani okrucha!", en: "I won't spend a penny, I won't give up a crumb!" }
        }
    },
    rationalism: {
        mad: {
            range: [-100, -80],
            support: { pl: "Tak! Niech zapanuje chaos! Zróbmy coś szalonego!", en: "Yes! Let chaos reign! Let's do something crazy!" },
            oppose: { pl: "Nuda! To zbyt przewidywalne! Nie chcę!", en: "Boring! Too predictable! I refuse!" }
        },
        impulsive: {
            range: [-80, -50],
            support: { pl: "Nie ma czasu na myślenie! Działajmy teraz!", en: "No time to think! Let's act now!" },
            oppose: { pl: "Za dużo gadania, za mało akcji. Szkoda czasu.", en: "Too much talk, not enough action. Waste of time." }
        },
        emotional: {
            range: [-50, -10],
            support: { pl: "Czuję w sercu, że to właściwa droga.", en: "I feel in my heart this is the right way." },
            oppose: { pl: "Mam co do tego złe przeczucia. To nie pasuje.", en: "I have a bad feeling about this. It feels wrong." }
        },
        lucid: {
            range: [-10, 10],
            support: { pl: "Patrzę na to trzeźwym okiem. To ma sens.", en: "I'm looking at this clearly. It makes sense." },
            oppose: { pl: "To zniekształca rzeczywistość. Nie dajmy się zwariować.", en: "This distorts reality. Let's not get crazy." }
        },
        rational: {
            range: [10, 50],
            support: { pl: "Rozsądek podpowiada, że to najlepsze wyjście.", en: "Reason suggests this is the best outcome." },
            oppose: { pl: "To po prostu głupie. Zastanówmy się jeszcze raz.", en: "That's just foolish. Let's think it through again." }
        },
        logical: {
            range: [50, 80],
            support: { pl: "Analiza faktów wskazuje na to rozwiązanie. Wykonajmy je.", en: "Analysis of facts points to this solution. Let's execute." },
            oppose: { pl: "W tej logice jest błąd. To nie może się udać.", en: "There is a flaw in this logic. It cannot work." }
        },
        calculating: {
            range: [80, 100],
            support: { pl: "Prawdopodobieństwo sukcesu jest optymalne. Zatwierdzam.", en: "The probability of success is optimal. Approved." },
            oppose: { pl: "Kalkulacja strat jest niekorzystna. Odmawiam.", en: "The loss calculation is unfavorable. I refuse." }
        }
    }
};

const traitLevelMap = {
    bravery: { l1: 'cowardly', l2: 'fearful', l3: 'cautious', l4: 'composed', l5: 'confident', l6: 'brave', l7: 'fearless' },
    altruism: { l1: 'vile', l2: 'selfish', l3: 'self_centered', l4: 'impartial', l5: 'helpful', l6: 'altruistic', l7: 'saintly' },
    materialism: { l1: 'ascetic', l2: 'detached', l3: 'frugal', l4: 'resourceful', l5: 'pragmatic', l6: 'greedy', l7: 'miserly' },
    rationalism: { l1: 'mad', l2: 'impulsive', l3: 'emotional', l4: 'lucid', l5: 'rational', l6: 'logical', l7: 'calculating' }
};

// --- LOGIC FUNCTIONS ---

function getTraitLevel(val) {
    if (val >= -100 && val < -80) return 'l1';
    if (val >= -80 && val < -50) return 'l2';
    if (val >= -50 && val < -10) return 'l3';
    if (val >= -10 && val <= 10) return 'l4';
    if (val > 10 && val <= 50) return 'l5';
    if (val > 50 && val <= 80) return 'l6';
    if (val > 80 && val <= 100) return 'l7';
    return 'l4';
}

function getThoughtsGlobal(sObj, wObj, lang = 'en') {
    const traitTypeMap = ['bravery', 'altruism', 'materialism', 'rationalism'];
    let thoughts = [];
    traitTypeMap.forEach(type => {
        const statVal = sObj[type.charAt(0)]; // b, a, m, r
        const weightVal = wObj[type.charAt(0)];
        const impact = statVal * weightVal;

        if (impact !== 0) {
            const levelKey = getTraitLevel(statVal);
            const traitKey = traitLevelMap[type][levelKey];
            const thoughtData = traitThoughts[type][traitKey];

            if (thoughtData) {
                const text = impact > 0 ? thoughtData.support[lang] : thoughtData.oppose[lang];
                const traitName = t[lang][`tr_${type}`][levelKey];
                
                thoughts.push({
                    text: `"${text}"`,
                    meta: `(${traitName})`,
                    sentiment: impact > 0 ? 'pos' : 'neg',
                    val: Math.abs(impact)
                });
            }
        }
    });
    return thoughts;
}

function calculateDecisionForOption(s, w) {
    return (s.b * w.b) + (s.a * w.a) + (s.m * w.m) + (s.r * w.r);
}

function solveScenario(stats, optA, optB, lang = 'en') {
    // optA/B expected structure: { name: "...", weights: { bravery: X, ... } }
    
    // Normalize weights structure to short keys
    const wA = { b: optA.weights.bravery, a: optA.weights.altruism, m: optA.weights.materialism, r: optA.weights.rationalism };
    const wB = { b: optB.weights.bravery, a: optB.weights.altruism, m: optB.weights.materialism, r: optB.weights.rationalism };

    // Calculate Scores
    const scoreA = calculateDecisionForOption(stats, wA);
    const scoreB = calculateDecisionForOption(stats, wB);

    // Logs
    let log = t[lang].log_header;
    const calcStr = (stat, weight) => `[${stat} x ${weight} = ${(stat * weight).toFixed(0)}]`;
    const dict = t[lang];

    // A Log
    log += `>>> ${optA.name.toUpperCase()} (${dict.log_score}: ${scoreA.toFixed(1)})\n`;
    log += `    ${dict.s_bravery}:      ${calcStr(stats.b, wA.b)}\n`;
    log += `    ${dict.s_altruism}:    ${calcStr(stats.a, wA.a)}\n`;
    log += `    ${dict.s_materialism}: ${calcStr(stats.m, wA.m)}\n`;
    log += `    ${dict.s_rationalism}: ${calcStr(stats.r, wA.r)}\n\n`;

    // B Log
    log += `>>> ${optB.name.toUpperCase()} (${dict.log_score}: ${scoreB.toFixed(1)})\n`;
    log += `    ${dict.s_bravery}:      ${calcStr(stats.b, wB.b)}\n`;
    log += `    ${dict.s_altruism}:    ${calcStr(stats.a, wB.a)}\n`;
    log += `    ${dict.s_materialism}: ${calcStr(stats.m, wB.m)}\n`;
    log += `    ${dict.s_rationalism}: ${calcStr(stats.r, wB.r)}\n\n`;

    // Winner
    let winner = "";
    if (scoreA > scoreB) {
        winner = `✅ ${optA.name}`;
        log += `${dict.log_decision}: ${optA.name} (${dict.log_advantage}: ${(scoreA - scoreB).toFixed(1)})`;
    } else if (scoreB > scoreA) {
        winner = `✅ ${optB.name}`;
        log += `${dict.log_decision}: ${optB.name} (${dict.log_advantage}: ${(scoreB - scoreA).toFixed(1)})`;
    } else {
        winner = "⚖️ DRAW";
        log += `${dict.log_draw}`;
    }

    return { winner, log, scoreA, scoreB };
}
