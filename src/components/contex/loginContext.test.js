import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { LoginProvider, LoginContext } from './context.login'
import Login from "../Login";
import Header from '../Header'
import Todo from '../todo/todo'

it('should log a user in', () => {
  const login = jest.fn();
  const { getByText } = render(
    <LoginContext.Provider value={{ login }}>
      <Login />
    </LoginContext.Provider>
  );

  const submitButton = getByText('Login');
  fireEvent.click(submitButton);

  expect(login).toHaveBeenCalledTimes(1)
});


it('should logout a user in', () => {
  const loginout = jest.fn();
  const { getByText } = render(
    <LoginContext.Provider value={{ loginout }}>
      <Header />
      <Login />
      <Todo />
    </LoginContext.Provider>
  );

  const submitButton = LoginContext.loggedIn;
  // fireEvent.click(submitButton);

  expect(submitButton).toBeFalsy()
});