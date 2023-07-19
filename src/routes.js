import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from './Context/AuthContext';
// componente onde se define as rotas, o que será carregado em cada rota e quais rotas são públicas ou privadas
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import ExpenseAdd from './pages/ExpenseAdd';
import RevenueAdd from './pages/RevenueAdd';
import ExpenseUpdate from './pages/ExpenseUpdate';
import RevenueUpdate from './pages/RevenueUpdate';
import CategoriesExpenseAdd from './pages/CategoriesExpenseAdd';
import CategoriesExpenseUpdate from './pages/CategoriesExpenseUpdate';
import CategoriesExpense from './pages/CategoriesExpense';
import Card from './pages/Card';
import CardAdd from './pages/CardAdd';
import Profile from './pages/Profile';
import Invoice from './pages/Invoice';
import Statistic from './pages/Statistic';

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute exact path="/sign-up" component={SignUp} />
      <CustomRoute isPrivate exact path="/home" component={Home} />
      <CustomRoute isPrivate exact path="/expense-add" component={ExpenseAdd} />
      <CustomRoute isPrivate exact path="/revenue-add" component={RevenueAdd} />
      <CustomRoute isPrivate exact path="/profile/:id" component={Profile} />
      <CustomRoute isPrivate exact path="/expense-update/:id" component={ExpenseUpdate} />
      <CustomRoute isPrivate exact path="/revenue-update/:id" component={RevenueUpdate} />
      <CustomRoute isPrivate exact path="/expense-categories" component={CategoriesExpense} />
      <CustomRoute isPrivate exact path="/expense-categories-add" component={CategoriesExpenseAdd} />
      <CustomRoute isPrivate exact path="/expense-categories-update/:id" component={CategoriesExpenseUpdate} />
      <CustomRoute isPrivate exact path="/card" component={Card} />
      <CustomRoute isPrivate exact path="/card-add" component={CardAdd} />
      <CustomRoute isPrivate exact path="/card-invoice/:id" component={Invoice} />
      <CustomRoute isPrivate exact path="/statistic" component={Statistic} />
    </Switch>
  );
}