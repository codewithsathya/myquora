import React from 'react';
import { Route,  BrowserRouter as Router, Switch } from 'react-router-dom';

// import Home from '../../../pages/Home';
import Layout from './Layout';

import Profile from './Profile';
import Create from './Create';
import LandingPage from './LandingPage';


export default function MainNavigation(){
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path="/" exact>
                        <LandingPage
                        page={'home'}
                        />
                    </Route>
                    
                    <Route path="/following">
                        <LandingPage
                        page={'follows'}
                        />
                    </Route>

                    
                    <Route path="/profile">
                        <Profile />
                    </Route>

                    
                    <Route path="/CreatePost">
                        <Create />
                    </Route>

                </Switch>
            </Layout>
        </Router>
        
        
        );

}