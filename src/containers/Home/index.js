import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {Chart, Axis, Geom, Tooltip} from "bizcharts";


const Comment = ({ text }) => text.replace(':)', '[smile]');

const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 }
];

const cols = {
  'value': { min: 0 },
  'year': {range: [ 0 , 1] }
};

const Home = () => (
  <div>
    <h2>首页</h2>
    <ul>
      <li><Link to="/topics">Bus</Link></li>
      <li><Link to="/about">Cart</Link></li>
    </ul>
    <Comment text="Text only components are awesome :)"/>
    <Chart height={400} data={data} scale={cols} forceFit>
      <Axis name="year" />
      <Axis name="value" />
      <Tooltip crosshairs={{type : "y"}}/>
      <Geom type="line" position="year*value" size={2} />
      <Geom type='point' position="year*value" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
    </Chart>
  </div>
)

export default Home;
