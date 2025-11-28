import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function QuizModal({ lesson, onClose }) {
  const { t } = useTranslation();
  const questions = lesson.quiz || [];
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const current = questions[index];

  function chooseOption(idx) {
    const copy = [...answers];
    copy[index] = idx;
    setAnswers(copy);
  }

  function next() {
    if (index < questions.length - 1) setIndex(index + 1);
    else finish();
  }

  function prev() {
    if (index > 0) setIndex(index - 1);
  }

  function finish() {
    setShowResult(true);
  }

  function score() {
    let s = 0;
    questions.forEach((q, i) => {
      // support different quiz shapes
      if (q.answer !== undefined && answers[i] !== undefined) {
        if (answers[i] === q.answer) s += 1;
      } else if (q.a && q.a.length && answers[i] !== undefined) {
        // legacy format where correct answer not provided; cannot score
      }
    });
    return s;
  }

  return (
    <div style={{ position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 720, maxHeight: '90vh', overflowY: 'auto', background: 'white', padding: 20, borderRadius: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>{t('curriculum.quiz')} — {lesson.title}</h3>
          <div>
            <button onClick={onClose}>{t('curriculum.close')}</button>
          </div>
        </div>

        {questions.length === 0 && <div>{t('curriculum.no_quiz')}</div>}

        {!showResult && questions.length > 0 && (
          <div>
            <div style={{ marginTop: 12 }}>
              <strong>{t('curriculum.question')} {index + 1} / {questions.length}</strong>
              <p style={{ marginTop: 8 }}>{current.q || current.question || 'Question'}</p>
            </div>

            <div style={{ marginTop: 6 }}>
              {(current.options || current.a || []).map((opt, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <label style={{ cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name={`q-${index}`}
                      checked={answers[index] === i}
                      onChange={() => chooseOption(i)}
                    />{' '}
                    {opt}
                  </label>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <button onClick={prev} disabled={index === 0}>{t('curriculum.previous')}</button>
              </div>
              <div>
                {index < questions.length - 1 ? (
                  <button onClick={next}>{t('curriculum.next')}</button>
                ) : (
                  <button onClick={finish}>{t('curriculum.submit')}</button>
                )}
              </div>
            </div>
          </div>
        )}

        {showResult && (
          <div style={{ marginTop: 12 }}>
            <h4>{t('curriculum.results')}</h4>
            <p>{t('curriculum.your_score')}: {score()} / {questions.filter(q => q.answer !== undefined).length}</p>
            <div style={{ marginTop: 8 }}>
              {questions.map((q, i) => (
                <div key={i} style={{ marginBottom: 10, padding: 8, border: '1px solid #eee' }}>
                  <div><strong>Q{i + 1}:</strong> {q.q || q.question}</div>
                  <div> {t('curriculum.your_answer')}: {(answers[i] !== undefined) ? ( (q.options || q.a || [])[answers[i]] || '—') : t('curriculum.no_answer') }</div>
                  {q.answer !== undefined && (
                    <div> {t('curriculum.correct_answer')}: {(q.options || [])[q.answer]}</div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'right' }}>
              <button onClick={onClose}>{t('curriculum.close')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
