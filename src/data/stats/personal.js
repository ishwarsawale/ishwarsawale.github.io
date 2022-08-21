import React, { useState, useEffect } from 'react';

const WorkExp = () => {
  const [workexp, setExp] = useState();

  const tick = () => {
    const divisor = 1000 * 60 * 60 * 24 * 365.2421897; // ms in an average year
    const birthTime = new Date('2016-02-29T09:30:00');
    setExp(((Date.now() - birthTime) / divisor).toFixed(11));
  };

  useEffect(() => {
    const timer = setInterval(() => tick(), 25);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <>{workexp}</>;
};

const data = [
  {
    key: 'workexp',
    label: 'Work Experience',
    value: <WorkExp />,
  },
  {
    key: 'certification',
    label: 'Certifications & Courses Completed',
    value: 179,
    link:
      '/mooc',
  },
  {
    key: 'location',
    label: 'Current city',
    value: 'Amsterdam, NL',
  },
];

export default data;
