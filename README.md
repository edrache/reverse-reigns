# RPG Decision Simulator

**RPG Decision Simulator** is an interactive web-based dashboard tool designed for designing, testing, and balancing Non-Player Character (NPC) personalities in video games using Utility Systems.

The tool allows you to visualize how character statistics (such as greed or cowardice) influence their decisions in specific narrative situations.

## 🎯 Project Goal

In traditional game design, NPC decisions are often rigid (e.g., "attack if within range"). This simulator promotes an organic approach where:

1.  **Decision depends on character:** The same situation (e.g., encountering a dragon) will end differently for a cowardly thief than for an honorable knight.
2.  **Internal conflict:** The system models a "struggle of thoughts" (e.g., desire for profit vs. fear of death).
3.  **Math instead of "If/Else":** Instead of decision trees, we use a weighted sum, which allows for more nuanced behaviors.

## ⚙️ Mathematical Model

The system is based on 4 main character axes (range from `-100` to `+100`):

1.  **Bravery:** Cowardice ↔ Bravery
2.  **Altruism:** Selfishness ↔ Sacrifice
3.  **Materialism:** Asceticism ↔ Greed
4.  **Rationalism:** Impulsiveness ↔ Logic

Each option in a scenario has **Weights** (range from `-5` to `+5`), which determine "who is attracted to this option".

### Calculation Formula

For each option (A and B), a score is calculated:

$$Score = \sum (TraitValue \times TraitWeight)$$

> **Example:**
> * Character is a **Coward** (Bravery: `-80`).
> * Option "Escape" is designed **For a Coward** (Bravery Weight: `-2.0`).
> * Calculation: `-80 * -2.0 = +160`.
> * **Conclusion:** The result is positive, so the character will very likely choose to escape.

## 🚀 Features

*   **Bilingual Support (PL/ENG):** Fully localized interface and content in Polish and English.
*   **Game Mode:** Play through sequential scenarios with step-by-step decision making.
*   **Sequential Thoughts:** Visualize the character's internal monologue as floating comic bubbles reflecting their personality traits.
*   **Character Generator:** Ability to generate balanced characters with a specific sum of statistics.
*   **Dynamic Trait Tags:** Visual indicators of character traits based on their stats (e.g., "Brave", "Greedy").
*   **Detailed Logs:** Step-by-step calculation preview shows which trait tipped the scales.
*   **JSON Scenario Import:** Load custom campaign scenarios via JSON files.

## 📦 Installation and Usage

The project is entirely contained in a single `index.html` file (Single File Application) with an optional `scenarios.json` for campaign mode.

1.  Download the repository files.
2.  Open `index.html` in any modern browser.
3.  **Simulator Mode:**
    *   Set character personality on the left.
    *   Choose a scenario or set weights on the right.
    *   Click **"CALCULATE DECISION"** to see the math in action.
4.  **Game Mode:**
    *   Click **"Switch to Game Mode"** to enter the narrative view.
    *   Load scenarios via the JSON button (or use defaults).
    *   Proceed through the story, observing character thoughts as floating bubbles before the final decision is revealed.

## 🛠 Extending (For Developers)

To add your own permanent scenarios, edit the `presets` object in `index.html` or create a JSON file with the structure found in `scenarios.json` and load it via the UI.

```json
[
  {
    "id": "example_scenario",
    "title": { "pl": "Tytuł", "en": "Title" },
    "description": { "pl": "Opis...", "en": "Description..." },
    "options": {
      "a": { "name": { "pl": "Opcja A", "en": "Option A" }, "weights": { "bravery": 1.0, "altruism": 0.0, "materialism": 0.0, "rationalism": 0.0 } },
      "b": { "name": { "pl": "Opcja B", "en": "Option B" }, "weights": { "bravery": -1.0, "altruism": 0.0, "materialism": 0.0, "rationalism": 0.0 } }
    }
  }
]
```
