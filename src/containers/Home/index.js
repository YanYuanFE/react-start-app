import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>首页</h2>
    <ul>
      <li><Link to="/topics">Bus</Link></li>
      <li><Link to="/about">Cart</Link></li>
    </ul>
  </div>
)

export default Home;