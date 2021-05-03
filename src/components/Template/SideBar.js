import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/me.jpg`} alt="" />
      </Link>
      <header>
        <h2>Ishwar Sawale</h2>
        <p><a href="mailto:ishwarsawale@gmail.com">ishwarsawale@gmail.com</a></p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>Hi, I&apos;m Ishwar. I like building things.
        I am a Data Scientist/ Machine Learning Engineer with 5+ years of experience
        in real-world datasets & business problem-solving.
        I have experience in AI product research and development; in the domain -
        Natural Language Processing, Computer Vision & Conversational Agents.
      </p>
      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume') ? <Link to="/resume" className="button">Learn More</Link> : <Link to="/about" className="button">About Me</Link>}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">&copy; Ishwar Sawale <Link to="/">https://ishwarsawale.github.io/</Link>.</p>
    </section>
  </section>
);

export default SideBar;
