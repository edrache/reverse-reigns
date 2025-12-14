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

*   **Character Generator:** Ability to generate balanced characters with a specific sum of statistics (allows creating characters with flaws and virtues).
*   **Intuitive Interface:** Weight sliders determine intent ("This option is for the Greedy"), not raw math.
*   **Detailed Logs:** Step-by-step calculation preview shows which trait tipped the scales.
*   **Ready-made Scenarios:** Built-in presets (Dragon, Beggar, Fire) for quick testing.

## 📦 Installation and Usage

The project is entirely contained in a single HTML file (Single File Application).

1.  Download the `index.html` file.
2.  Open the file in any modern browser (Chrome, Firefox, Edge, Safari).
3.  **On the left:** Set the character personality using sliders or generate one.
4.  **On the right:** Choose a scenario or set your own weights for Option A and B.
5.  Click **"CALCULATE DECISION"** at the bottom of the screen.

## 🛠 Extending (For Developers)

To add your own permanent scenarios, edit the `presets` object in the `<script>` section of the HTML file:

```javascript
const presets = {
    new_scenario: {
        aName: "Attack frontally",
        bName: "Set a trap",
        // Weights format: [Bravery, Altruism, Materialism, Rationalism]
        aWeights: [2.0, 0.0, 0.0, -1.0], 
        bWeights: [-0.5, 0.0, 0.0, 2.0]
    },
    // ...
};
