import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import DashBoard from './Components/DashBoard/DashBoard';
import Post from './Components/Post/Post';
import Form from './Components/Form/Form';

export default (
    <Switch>
        <Route path='/post/:postid' component={Post}  />
        <Route path='/new' component={Form} />
        <Route path='/dashboard' component={DashBoard} />
        <Route path='/' component={Auth} />
    </Switch>
)