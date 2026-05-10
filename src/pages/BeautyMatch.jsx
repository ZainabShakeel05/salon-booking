import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const questions = [
  {
    id: 'mood',
    label: 'What is your beauty mood today?',
    options: [
      { label: 'Soft glow', value: 'facial' },
      { label: 'Main character glam', value: 'makeup' },
      { label: 'Fresh hair energy', value: 'hair' }
    ]
  },
  {
    id: 'occasion',
    label: 'What are you getting ready for?',
    options: [
      { label: 'Everyday confidence', value: 'simple' },
      { label: 'Special event', value: 'event' },
      { label: 'Wedding season', value: 'bridal' }
    ]
  },
  {
    id: 'time',
    label: 'How much time do you have?',
    options: [
      { label: 'Under 45 minutes', value: 'quick' },
      { label: 'About an hour', value: 'medium' },
      { label: 'Make it a full ritual', value: 'long' }
    ]
  }
];

const BeautyMatch = () => {
  const { services } = useAppContext();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    mood: 'facial',
    occasion: 'simple',
    time: 'medium'
  });

  const matchedService = useMemo(() => {
    if (answers.occasion === 'bridal') return services.find(service => service.name.includes('Bridal'));
    if (answers.mood === 'makeup' || answers.occasion === 'event') return services.find(service => service.name.includes('Makeup'));
    if (answers.mood === 'hair') return services.find(service => service.name.includes('Hair'));
    if (answers.time === 'quick') return services.find(service => service.name.includes('Manicure'));
    if (answers.time === 'long') return services.find(service => service.name.includes('Pedicure'));
    return services.find(service => service.name.includes('Facial'));
  }, [answers, services]);

  const setAnswer = (id, value) => {
    setAnswers(current => ({ ...current, [id]: value }));
  };

  return (
    <main className="match-page">
      <section className="match-hero">
        <span className="eyebrow">Unique feature</span>
        <h1>Beauty Match</h1>
        <p>Answer three quick questions and Zaynab&apos;s Salon recommends the best service for your mood, occasion, and available time.</p>
      </section>

      <section className="match-layout">
        <div className="quiz-panel">
          {questions.map(question => (
            <fieldset key={question.id}>
              <legend>{question.label}</legend>
              <div className="choice-grid">
                {question.options.map(option => (
                  <button
                    className={answers[question.id] === option.value ? 'choice active' : 'choice'}
                    key={option.value}
                    type="button"
                    onClick={() => setAnswer(question.id, option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
          ))}
        </div>

        {matchedService && (
          <aside className="match-result">
            <img src={matchedService.image} alt={matchedService.name} />
            <div>
              <span className="eyebrow">Your match</span>
              <h2>{matchedService.name}</h2>
              <p>{matchedService.description}</p>
              <div className="service-meta">
                <span>${matchedService.price}</span>
                <small>{matchedService.duration}</small>
              </div>
              <button className="button primary" type="button" onClick={() => navigate('/booking', { state: { service: matchedService } })}>
                Book This Match
              </button>
            </div>
          </aside>
        )}
      </section>
    </main>
  );
};

export default BeautyMatch;
