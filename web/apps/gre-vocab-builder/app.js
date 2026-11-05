/* GRE Vocab Builder: spaced-repetition flashcards and quizzes over the suite's GRE word bank. */
(function () {
  'use strict';
  const words = (ctx) => ctx.data.gre_words;
  const App = {
    about: 'Learn high-value GRE words the way memory works best: a little every day, with each word coming back just before you would forget it. Every word has a definition, an example sentence and similar words, all written for this suite.',
    how: ['Open **Flashcards**. Read the word, try to recall its meaning, then turn the card over.',
      'Grade yourself honestly: **Again** if you did not know it, **Good** if you did. The app schedules each word for you.',
      'Every few days, take a **Quiz** to test words four ways: meaning, word from meaning, sentence blank and closest synonym.',
      'Use **Word list** to search the bank or study one set of fifty at a time.'],
    tabs: [
      SK.cardsTab('cards', 'Flashcards', (ctx) => SK.wordCards(words(ctx)), { reversible: true, newPerDay: 15 }),
      SK.wordQuizTab('quiz', 'Quiz', words),
      { id: 'list', label: 'Word list', render(el, ctx) {
        const all = words(ctx);
        const deck = SK.store.get('gre-vocab-builder.srs', {});
        const sets = [...new Set(all.map((w) => w.set))];
        let set = 'All', term = '';
        const out = SK.h('div', {});
        const draw = () => {
          SK.clear(out);
          const hits = all.filter((w) => (set === 'All' || String(w.set) === String(set)) && (!term || SK.norm(w.w + ' ' + w.d).includes(SK.norm(term))));
          out.appendChild(SK.h('p', { class: 'sk-muted sk-small', text: hits.length + ' words' }));
          out.appendChild(SK.table(['Word', 'Meaning', 'Example', 'Status'], hits.slice(0, 120).map((w) => [SK.h('strong', { text: w.w }), w.d, SK.h('span', { class: 'sk-small', text: w.e }), deck[w.id] ? (deck[w.id].interval >= 21 ? 'Known well' : 'Learning') : 'New'])));
        };
        el.appendChild(SK.card('Word list', SK.h('div', { class: 'sk-row' },
          SK.select([['All', 'All sets']].concat(sets.map((s) => [s, 'Set ' + s + ' (' + all.filter((w) => w.set === s).map((w) => w.w)[0] + '…)'])), set, (v) => { set = v; draw(); }, 'Set'),
          SK.field('Search', SK.h('input', { type: 'text', oninput: (e) => { term = e.target.value; draw(); } }))), out));
        draw();
      } },
    ],
    progress(card) {
      const deck = SK.store.get('gre-vocab-builder.srs', {});
      const st = SK.srs.stats(SK.ctx.data.gre_words.map((w) => w.id), deck);
      card.appendChild(SK.h('h3', { text: 'Words' }));
      card.appendChild(SK.stats([['Known well', st.mature], ['Learning', st.learning], ['Not seen yet', st.fresh]]));
    },
    checks: {
      'every word has a definition, a part of speech and an example that uses it': (data, assert) => {
        assert.ok(data.gre_words.length >= 600);
        for (const w of data.gre_words) {
          assert.ok(w.d.length > 5 && /^(noun|verb|adjective|adverb)$/.test(w.pos), w.w);
          assert.ok(SK.blankOut(w.e, w.w), 'the example for ' + w.w + ' should contain it');
        }
        assert.equal(new Set(data.gre_words.map((w) => w.w.toLowerCase())).size, data.gre_words.length);
      },
      'quizzes always offer five different choices with the right one among them': (data, assert) => {
        for (let s = 1; s <= 40; s++) {
          const items = SK.wordItems(data.gre_words, 20, s, ['meaning', 'word', 'blank', 'synonym']);
          assert.equal(items.length, 20);
          for (const it of items) { assert.equal(new Set(it.choices).size, 5); assert.deepEqual(SK.validateItem(it), []); }
        }
      },
      'flashcards cover every word once': (data, assert) => {
        const cards = SK.wordCards(data.gre_words);
        assert.equal(new Set(cards.map((c) => c.id)).size, data.gre_words.length);
      },
    },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
