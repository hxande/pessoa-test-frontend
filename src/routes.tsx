import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import CreatePerson from './pages/CreatePerson';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path='/' exact />
            <Route component={CreatePerson} path='/create-person/:id' />
        </BrowserRouter>
    );
}

export default Routes;