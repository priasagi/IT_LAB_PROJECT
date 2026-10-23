import { useState } from 'react';

const featureList = [
  {
    icon: '🎨',
    title: 'HTML & CSS Design',
    description:
      'Create attractive layouts with structured HTML and responsive CSS.',
  },
  {
    icon: '⚡',
    title: 'JavaScript',
    description:
      'Add buttons, events and interactive behaviour to web pages.',
  },
  {
    icon: '⚛️',
    title: 'React Components',
    description:
      'Build reusable UI components with JSX and React.',
  },
  {
    icon: '🧠',
    title: 'AI-Assisted Coding',
    description:
      'Use clear AI prompts to generate, review and improve code.',
  },
  {
    icon: '🐞',
    title: 'Debugging',
    description:
      'Identify errors and check suggested fixes before applying them.',
  },
  {
    icon: '📱',
    title: 'Responsive Design',
    description:
      'Make the interface adapt to mobile, tablet and desktop screens.',
  },
];

export default function Features() {
  const [search, setSearch] = useState('');

  const filteredFeatures = featureList.filter((feature) =>
    `${feature.title} ${feature.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="features section" id="features">
      <p className="eyebrow">WHAT YOU CAN LEARN</p>
      <h2>Front-End Development Features</h2>
      <p className="section-description">
        Explore the core ideas covered by Chapter 4.
      </p>

      <input
        className="search-input"
        type="text"
        placeholder="Search features..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        aria-label="Search features"
      />

      <div className="feature-grid">
        {filteredFeatures.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>

      {filteredFeatures.length === 0 && (
        <p className="no-results">No matching features found.</p>
      )}
    </section>
  );
}