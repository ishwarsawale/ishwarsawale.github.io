import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

var indexButton;
function SwitchIndexButton() {
    if (window.location.pathname.includes('/resume')){
        indexButton = <Link to="/mooc" className="button">Certifications</Link>
    }else if (window.location.pathname.includes('/mooc')){
        indexButton = <Link to="/about" className="button">About</Link>
    }
    else if (window.location.pathname.includes('/about')){
        indexButton = <Link to="/resume" className="button">Résumé</Link>
    }
    else if (window.location.pathname.includes('/projects')){
        indexButton = <Link to="/resume" className="button">Résumé</Link>
    }
    else{
        indexButton = <Link to="/about" className="button">About</Link>
    }
    return indexButton
}

var paraText;
function SwitchPara() {
    if (window.location.pathname.includes('/resume')){
        paraText = <p>I am active learner & I have completed 170+ courses/certifications on Coursera, DataCamp, Udemy,
        LinkedIn, etc.</p>
    }else if (window.location.pathname.includes('/mooc')){
        paraText = <p>
            I have extensive experience in building Machine Learning / Deep Learning. Experienced in implementing cutting-edge research using graph-based frameworks.
        </p>
    }
    else if (window.location.pathname.includes('/about')){
        paraText = <p> I Design, deploy and maintain ML models and systems, owning from research to production. I follow Zen of Python religiously.
            I have worked with an agile, scrum-based environment. Visit RÉSUMÉ for more details.</p>
    }
    else if (window.location.pathname.includes('/projects')){
        paraText = <p>Working knowledge of the data science pipeline including but not limited to data collection, data cleaning, Exploratory data analysis
            , feature engineering, supervised & unsupervised algorithms, model assessment & deployment.
        </p>
    }
    else{
        paraText = <p>Hi, I&apos;m Ishwar. I like building things.
            I am a Data Scientist/ Machine Learning Engineer with 7+ years of experience
            in real-world datasets & business problem-solving.
            I have experience in AI product research and development; in the domain -
            Natural Language Processing, Computer Vision & Conversational Agents.
        </p>
    }
    return paraText
}
const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/me.jpg`} alt="" />
      </Link>
      <header>
        <h2>Ishwar Sawale</h2>
          <ContactIcons />
        {/*<p><a href="mailto:i@gmail.com">i@gmail.com</a></p>*/}
      </header>
    </section>

    <section className="blurb">
      <h2>Summary</h2>
        {SwitchPara()}
      <ul className="actions">
        <li>
            {SwitchIndexButton()}
        </li>
      </ul>
    </section>

    <section id="footer">
      {/*<ContactIcons />*/}
      <p className="copyright">&copy; Ishwar Sawale <Link to="/">https://ishwarsawale.github.io/</Link>.</p>
    </section>
  </section>
);

export default SideBar;
