# RPG Decision Simulator (Symulator Decyzji RPG)

**RPG Decision Simulator** to interaktywne narzędzie webowe typu "dashboard", służące do projektowania, testowania i balansowania osobowości postaci niezależnych (NPC) w grach wideo przy użyciu systemów użyteczności (Utility Systems).

Narzędzie pozwala wizualizować, jak statystyki postaci (takie jak chciwość czy tchórzostwo) wpływają na podejmowane przez nią decyzje w konkretnych sytuacjach fabularnych.

## 🎯 Cel projektu

W tradycyjnym projektowaniu gier decyzje NPC są często sztywne (np. "zaatakuj, jeśli jesteś w zasięgu"). Ten symulator promuje podejście organiczne, gdzie:

1.  **Decyzja zależy od charakteru:** Ta sama sytuacja (np. spotkanie ze smokiem) skończy się inaczej dla tchórzliwego złodzieja, a inaczej dla honorowego rycerza.
2.  **Wewnętrzny konflikt:** System modeluje "walkę myśli" (np. chęć zysku vs strach przed śmiercią).
3.  **Matematyka zamiast "If/Else":** Zamiast drzewek decyzyjnych, używamy sumy ważonej, co pozwala na bardziej niuansowane zachowania.

## ⚙️ Model Matematyczny

System opiera się na 4 głównych osiach charakteru (zakres od `-100` do `+100`):

1.  **Odwaga (Bravery):** Tchórzostwo ↔ Brawura
2.  **Altruizm (Altruism):** Egoizm ↔ Poświęcenie
3.  **Materializm (Materialism):** Ascetyzm ↔ Chciwość
4.  **Racjonalizm (Rationalism):** Impulsywność ↔ Logika

Każda opcja w scenariuszu posiada **Wagi** (zakres od `-5` do `+5`), które określają "kogo dana opcja przyciąga".

### Wzór obliczeń

Dla każdej opcji (A i B) obliczany jest wynik punktowy:

$$Wynik = \sum (WartośćCechy \times WagaCechy)$$

> **Przykład:**
> * Postać jest **Tchórzem** (Odwaga: `-80`).
> * Opcja "Ucieczka" jest zaprojektowana **Dla Tchórza** (Waga Odwagi: `-2.0`).
> * Obliczenie: `-80 * -2.0 = +160`.
> * **Wniosek:** Wynik jest dodatni, więc postać bardzo chętnie wybierze ucieczkę.

## 🚀 Funkcjonalności

* **Generator Postaci:** Możliwość losowania zbalansowanych postaci o określonej sumie statystyk (pozwala tworzyć postacie z wadami i zaletami).
* **Intuicyjny Interfejs:** Suwaki wag określają intencję ("Ta opcja jest dla Chciwych"), a nie surową matematykę.
* **Szczegółowe Logi:** Podgląd obliczeń krok po kroku pokazuje, która cecha przeważyła szalę.
* **Gotowe Scenariusze:** Wbudowane presety (Smok, Żebrak, Pożar) do szybkich testów.

## 📦 Instalacja i Użycie

Projekt jest w całości zawarty w jednym pliku HTML (Single File Application).

1.  Pobierz plik `index.html` (lub `rpg_simulator.html`).
2.  Otwórz plik w dowolnej nowoczesnej przeglądarce (Chrome, Firefox, Edge, Safari).
3.  **Po lewej stronie:** Ustaw suwakami osobowość postaci lub wylosuj ją.
4.  **Po prawej stronie:** Wybierz scenariusz lub ustaw własne wagi dla Opcji A i B.
5.  Kliknij **"OBLICZ DECYZJĘ"** na dole ekranu.

## 🛠 Rozszerzanie (Dla programistów)

Aby dodać własne, stałe scenariusze, edytuj obiekt `presets` w sekcji `<script>` pliku HTML:

```javascript
const presets = {
    nowy_scenariusz: {
        aName: "Atakuj frontalnie",
        bName: "Zastaw pułapkę",
        // Format wag: [Brawura, Altruizm, Materializm, Racjonalizm]
        aWeights: [2.0, 0.0, 0.0, -1.0], 
        bWeights: [-0.5, 0.0, 0.0, 2.0]
    },
    // ...
};