import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Edit from './components/Edit';
import New from './components/New';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch
} from 'react-router-dom';


const routes = [
	{
		path: '/:id/edit',
		component: Edit,
		name: 'Edit'
	},
	{
		path: '/',
		component: App,
		name: 'Home'
  },
  {
    path: '/new',
    component: New,
    name: 'New'
  }
];


ReactDOM.render(
  <React.StrictMode>
    <Router>
		<Switch>
			{routes.map(route => {
				return (
					<Route
						component={route.component}
						key={route.name}
						path={route.path}
					/>
				);
			})}
		</Switch>
	</Router>,
  </React.StrictMode>,
  document.getElementById('root')
);


