import { it , expect, beforeAll, afterAll, afterEach, beforeEach } from 'vitest'

import { User } from './hooks';

const testEmail = 'test@test.com';
let user = new User(testEmail);

//runs the callback before all tests are done
beforeAll(() => {
  console.log('beforeAll')
});
beforeEach(() => {
  console.log('beforeeach')
});
afterEach(() => {
  user = new User(testEmail);
  console.log('aftereach')
});
afterAll(() => {
  console.log('afterall')
})

it('should update the email', () => {
  
  const newTestEmail = 'test2@test.com';
  
  user.updateEmail(newTestEmail);

  expect(user.email).toBe(newTestEmail);
});

it('should have an email property', () => {

  expect(user).toHaveProperty('email');
});

it('should store the provided email value', () => {


  expect(user.email).toBe(testEmail);
});

it('should clear the email', () => {

  user.clearEmail();

  expect(user.email).toBe('');
});

it('should still have an email property after clearing the email', () => {

  user.clearEmail();

  expect(user).toHaveProperty('email');
});
