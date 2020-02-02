import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import ManageStudent from '~/pages/ManageStudent';
import Plans from '~/pages/Plans';
import ManagePlan from '~/pages/ManagePlan';
import Registers from '~/pages/Registers';
import ManageRegister from '~/pages/ManageRegister';
import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" component={Students} isPrivate />
      <Route path="/manageStudent/:id" component={ManageStudent} isPrivate />
      <Route path="/manageStudent" component={ManageStudent} isPrivate />

      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/managePlan/:id" component={ManagePlan} isPrivate />
      <Route path="/managePlan" component={ManagePlan} isPrivate />

      <Route path="/registers" component={Registers} isPrivate />
      <Route path="/manageRegister/:id" component={ManageRegister} isPrivate />
      <Route path="/manageRegister" component={ManageRegister} isPrivate />
      <Route path="/helpOrders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
