import React from 'react';
import {
  Link
} from 'react-router-dom';


const Comment = ({ text }) => text.replace(':)', '[smile]');

const Home = () => (
  <div>
    <h2>首页</h2>
    <ul>
      <li><Link to="/topics">Bus</Link></li>
      <li><Link to="/about">Cart</Link></li>
    </ul>
    <Comment text="Text only components are awesome :)"/>
  </div>
);

export default Home;
