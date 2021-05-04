import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import data from '../data/mooc';

const tableStyle = {
    border: '1px solid black',
    borderCollapse: 'collapse',
    textAlign: 'center',
    width: '100%'
}

const tdStyle = {
    // border: '1px solid #85C1E9',
    padding: '5px'
};

const thStyle = {
    border: '1px solid #3498DB',
    background: '#3498DB',
    color: 'black',
    padding: '5px',
    'text-align':'center'
};

const students = [
    { "id": 177, "name": "Generative Adversarial Networks (GANs) Specialization by deeplearning.ai",  "year": 2021, "platform": "Coursera", "href":"https://www.coursera.org/account/accomplishments/specialization/certificate/2W4NVMZQYKMV"},
];
const About = () => (
  <Main
    title="Certifications"
    description="Learn more about Mooc"
  >
    <article className="post" id="mooc">
        <header>
            <div className="title">
                <h2 data-testid="heading"><Link to="/mooc">Certifications & Courses</Link></h2>
            </div>
        </header>
        <div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Year</th>
              <th style={thStyle}>Platform</th>
            </tr>
            {data.map(({ id, name, year, platform, href }) => (
              <tr key={id}>
                <td style={tdStyle}>{id}</td>
                  <td><a href={href} style={tdStyle}>{name}</a></td>
                <td style={tdStyle}>{year}</td>
                <td style={tdStyle}>{platform}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  </Main>
);

export default About;
