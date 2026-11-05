# GRE Vocab Builder

Learn over 600 high-value GRE words with spaced-repetition flashcards, example sentences and quick quizzes.

Part of the [GRE and TOEFL Study Suite](https://github.com/Apurba94/gre-toefl-study-suite): 100 free study apps for the GRE General Test and more. It works offline, as a Windows program or in the browser.

## Download and run

- **Windows:** download `GRE Vocab Builder.exe` from the [latest release](https://github.com/Apurba94/gre-vocab-builder/releases/latest) and open it. Nothing to install. It opens in its own window and saves your progress in your user folder.
- **Browser:** open it online in the suite's web edition at https://gre-toefl-study-suite.vercel.app/apps/gre-vocab-builder/ . Progress stays in that browser.
- **From source:** `python launcher.py` (Python 3.10 or later, no packages needed).

## What it does

Learn high-value GRE words the way memory works best: a little every day, with each word coming back just before you would forget it. Every word has a definition, an example sentence and similar words, all written for this suite.

Sections: Flashcards, Quiz, Word list, Progress, About.

## How to use it

1. Open **Flashcards**. Read the word, try to recall its meaning, then turn the card over.
2. Grade yourself honestly: **Again** if you did not know it, **Good** if you did. The app schedules each word for you.
3. Every few days, take a **Quiz** to test words four ways: meaning, word from meaning, sentence blank and closest synonym.
4. Use **Word list** to search the bank or study one set of fifty at a time.

## Good to know

- All questions, passages and definitions were written for this suite. None are official ETS questions. For official practice, use the materials on ets.org.
- It follows the GRE General Test as shortened in September 2023 and the TOEFL iBT as updated in January 2026. Formats change, so check ets.org before your test.
- Feedback on writing and speaking counts things a program can count honestly, such as length and linking words. It does not give an official score.
- Not endorsed by or affiliated with ETS. GRE and TOEFL are registered trademarks of ETS.

## For developers

The app is plain HTML and JavaScript in `web/`, run by a small Python launcher that serves it on 127.0.0.1 only and needs a secret token for saving. Tests: `node --test "tests/*.test.js"` (25 tests) and `python -m unittest discover -s tests`. Build the .exe with `python build_exe.py`.

Built with AI assistance (Claude Code). MIT licence. By JANIN A APURBA.
