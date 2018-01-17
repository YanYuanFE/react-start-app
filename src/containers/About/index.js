import React from 'react';

const Fruits = () => [
  <li key="1">Pear</li>,
  <li key="2">Weater Melon</li>,
];

const About = () => (
  [
    <div key="3">
      <h2>关于</h2>
    </div>,
    <ul  key="4">
      <li>Apple</li>
      <li>Banana</li>
      <Fruits/>
    </ul>
  ]
);

export default About;
