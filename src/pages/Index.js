import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main
    description={"Ishwar Sawale's personal website."}
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2 data-testid="heading"><Link to="/">About this site</Link></h2>
          <p>This website gives you brief information about me, my work and interests.
            Feel free to explore around, and don't hesitate to get in touch!
          </p>
        </div>
      </header>
      <p> Welcome to my website. Please feel free to read more <Link to="/about">about me</Link>,
        or you can check out my {' '}
        <Link to="/resume">résumé</Link>, {' '}
        <Link to="/projects">projects</Link>, {' '}
        <Link to="/mooc">certifications</Link>, {' '}
        view <Link to="/stats">site statistics</Link>, {' '}
        or <Link to="/contact">contact</Link> me.
      </p>
      <p> Source available <a href="https://github.com/ishwarsawale">here</a>.</p>
    </article>
  </Main>
);

export default Index;
