import Home from "./components/Home";
import About from "./components/About";
import Topics from "./components/Topics";
import Topic from "./components/Topic";

const routes = [{
    path: '/home',
    component: Home
  }, {
    path: '/about',
    component: About
  }, {
    path: '/topics',
    component: Topics
  }
]

export default routes;