import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const moodOptions = {
  eventType: ['Birthday dinner', 'Wedding guest', 'Bridal day', 'Date night', 'Photoshoot', 'Casual glow'],
  outfitColor: ['Rose pink', 'Black', 'Ivory', 'Emerald', 'Red', 'Gold'],
  vibe: ['Soft glam', 'Clean girl', 'Bold glam', 'Luxury', 'Romantic', 'Fresh dewy'],
  skinTone: ['Fair', 'Medium', 'Olive', 'Deep'],
  hairLength: ['Short', 'Shoulder length', 'Long', 'Curly']
};

const colorPalettes = {
  'Rose pink': ['#f7b4c6', '#d94f7d', '#fff0f3', '#d9a441'],
  Black: ['#20131a', '#4d263d', '#f7b49a', '#ffffff'],
  Ivory: ['#fff8ef', '#d9a441', '#d8eee7', '#d94f7d'],
  Emerald: ['#0f6b57', '#d8eee7', '#d9a441', '#4d263d'],
  Red: ['#be123c', '#ffe4e6', '#20131a', '#d9a441'],
  Gold: ['#d9a441', '#fff4cc', '#4d263d', '#d94f7d']
};

const eventProfiles = {
  'Birthday dinner': {
    service: 'Soft Glam Makeup',
    makeup: 'glowy party base, lifted liner, flutter lashes, blush-forward cheeks, glossy birthday lip',
    hair: 'bouncy blowout with face-framing pieces and soft movement',
    nails: 'sparkle accent nails with a glossy party finish',
    prep: 'brightening skin prep and under-eye refresh before glam'
  },
  'Wedding guest': {
    service: 'Signature Hair Styling',
    makeup: 'long-wear soft glam, waterproof liner, satin skin, refined blush, photo-safe highlight',
    hair: 'polished waves pinned away from the face for an elegant ceremony look',
    nails: 'soft neutral manicure with a tiny metallic detail',
    prep: 'primer-focused prep so makeup lasts through photos and dancing'
  },
  'Bridal day': {
    service: 'Bridal Beauty Plan',
    makeup: 'bridal base, soft sculpt, waterproof eyes, delicate shimmer, timeless rose lip',
    hair: 'romantic bridal waves or low bun with veil-friendly hold',
    nails: 'milky bridal french with pearl or chrome detail',
    prep: 'calming hydration, depuffing, and glow layering before bridal glam'
  },
  'Date night': {
    service: 'Soft Glam Makeup',
    makeup: 'warm candlelit skin, soft smoky outer corner, flushed cheeks, kiss-proof lip tint',
    hair: 'touchable waves with shine spray and romantic volume',
    nails: 'flirty almond nails in a glossy rose or berry tone',
    prep: 'soft-focus primer and body glow on collarbones'
  },
  Photoshoot: {
    service: 'Soft Glam Makeup',
    makeup: 'camera-ready matte-soft base, sculpted cheekbones, defined eyes, balanced lip color',
    hair: 'high-volume styling with extra hold and clean shape from every angle',
    nails: 'minimal clean nails that will not distract from the frame',
    prep: 'shine-control prep, pore smoothing, and touch-up plan for lights'
  },
  'Casual glow': {
    service: 'Rose Glow Facial',
    makeup: 'tinted moisturizer, brushed brows, cream blush, mascara, juicy balm',
    hair: 'effortless smooth styling with a fresh salon finish',
    nails: 'clean-girl sheer pink manicure',
    prep: 'hydrating facial-style prep for naturally dewy skin'
  }
};

const vibeAddOns = {
  'Soft glam': 'Keep the finish blended, feminine, and softly sculpted.',
  'Clean girl': 'Reduce heavy liner, use skin-like coverage, fluffy brows, and clear glossy details.',
  'Bold glam': 'Increase eye definition, contour, lashes, and statement shine.',
  Luxury: 'Make every finish polished: expensive-looking skin, glossy hair, and refined color choices.',
  Romantic: 'Use rosy tones, soft shimmer, airy hair texture, and delicate nail details.',
  'Fresh dewy': 'Prioritize hydration, cream textures, luminous cheekbones, and a juicy lip.'
};

const toneAddOns = {
  Fair: 'Best tones: pearl champagne, soft pink, cool rose, and light taupe.',
  Medium: 'Best tones: rose-bronze, caramel contour, peach blush, and warm champagne.',
  Olive: 'Best tones: peach-gold, bronze, terracotta rose, and warm brown liner.',
  Deep: 'Best tones: rich berry, bronze-gold, cocoa liner, and radiant golden highlight.'
};

const colorNailAddOns = {
  'Rose pink': 'Match the outfit with rose chrome, blush french, or pink shimmer accents.',
  Black: 'Add contrast with black cherry gloss, champagne chrome, or nude nails with black tips.',
  Ivory: 'Use pearl, milky french, champagne shimmer, or soft gold foil.',
  Emerald: 'Pair with nude nails, tiny emerald detail, or gold micro accents.',
  Red: 'Choose classic red, cherry gloss, or nude nails with a red detail.',
  Gold: 'Use champagne chrome, glazed nude, or warm metallic accents.'
};

const getServiceName = ({ eventType, vibe }) => {
  if (vibe === 'Fresh dewy' && eventType !== 'Bridal day') return 'Rose Glow Facial';
  if (vibe === 'Clean girl' && eventType === 'Casual glow') return 'Blush Manicure';
  return eventProfiles[eventType].service;
};

const getLookPlan = (answers, services) => {
  const serviceName = getServiceName(answers);
  const service = services.find(item => item.name === serviceName) || services[0];
  const palette = colorPalettes[answers.outfitColor];
  const eventProfile = eventProfiles[answers.eventType];
  const lengthDetail = answers.hairLength === 'Short'
    ? ' Adapted for short hair with sleek shape and face-framing shine.'
    : answers.hairLength === 'Curly'
      ? ' Adapted for curls with definition, volume control, and glossy separation.'
      : answers.hairLength === 'Shoulder length'
        ? ' Adapted for shoulder length with soft bends and lifted roots.'
        : ' Adapted for long hair with movement, hold, and polished ends.';
  const makeup = `${eventProfile.makeup}. ${vibeAddOns[answers.vibe]} ${toneAddOns[answers.skinTone]}`;
  const hair = `${eventProfile.hair}.${lengthDetail}`;
  const nails = `${eventProfile.nails}. ${colorNailAddOns[answers.outfitColor]}`;
  const prep = `${eventProfile.prep}. ${toneAddOns[answers.skinTone]}`;

  return {
    title: `${answers.vibe} for ${answers.eventType}`,
    service,
    palette,
    makeup,
    hair,
    nails,
    prep,
    occasion: answers.eventType,
    notes: `Mood Board: ${answers.vibe}, ${answers.outfitColor} outfit. Makeup: ${makeup}. Hair: ${hair}. Nails: ${nails}. Skin prep: ${prep}.`
  };
};

const MoodBoard = () => {
  const { services, currentUser } = useAppContext();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    eventType: 'Birthday dinner',
    outfitColor: 'Rose pink',
    vibe: 'Soft glam',
    skinTone: 'Medium',
    hairLength: 'Long'
  });

  const lookPlan = useMemo(() => getLookPlan(answers, services), [answers, services]);

  const updateAnswer = (key, value) => {
    setAnswers(current => ({ ...current, [key]: value }));
  };

  const bookLook = () => {
    const bookingState = { service: lookPlan.service, moodBoard: lookPlan };

    if (!currentUser) {
      navigate('/login', { state: { from: '/booking', bookingState } });
      return;
    }

    navigate('/booking', { state: bookingState });
  };

  return (
    <main className="mood-page">
      <section className="mood-hero">
        <span className="eyebrow">AI-style beauty planner</span>
        <h1>Beauty Mood Board</h1>
        <p>Choose your event, outfit color, and vibe. Zaynab&apos;s Salon creates a complete look plan with makeup, hair, nails, skin prep, and the best service to book.</p>
      </section>

      <section className="mood-layout">
        <div className="mood-builder">
          {Object.entries(moodOptions).map(([key, options]) => (
            <label key={key}>
              {key.replace(/([A-Z])/g, ' $1')}
              <select value={answers[key]} onChange={(event) => updateAnswer(key, event.target.value)}>
                {options.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
          ))}
        </div>

        <article className="mood-board">
          <div className="mood-board-header">
            <span className="eyebrow">Generated look</span>
            <h2>{lookPlan.title}</h2>
            <p>Recommended booking: <strong>{lookPlan.service.name}</strong> · ${lookPlan.service.price} · {lookPlan.service.duration}</p>
          </div>

          <div className="swatch-row">
            {lookPlan.palette.map(color => <span key={color} style={{ background: color }} />)}
          </div>

          <div className="look-grid">
            <section>
              <span>Makeup</span>
              <p>{lookPlan.makeup}</p>
            </section>
            <section>
              <span>Hair</span>
              <p>{lookPlan.hair}</p>
            </section>
            <section>
              <span>Nails</span>
              <p>{lookPlan.nails}</p>
            </section>
            <section>
              <span>Skin prep</span>
              <p>{lookPlan.prep}</p>
            </section>
          </div>

          <div className="mood-actions">
            <button className="button primary" type="button" onClick={bookLook}>Book This Look</button>
            <button className="button ghost" type="button" onClick={() => navigate('/match')}>Try Beauty Match</button>
          </div>
        </article>
      </section>
    </main>
  );
};

export default MoodBoard;
