const myFunctions = require('./sample-functions.js');

test('Testing div ints -- success', () => {
  const target = 7;
  const result = myFunctions.div(63, 9);
  expect(target).toBe(result);
});

test('Testing div float -- success', () => {
  const target = 2.5;
  const result = myFunctions.div(5, 2);
  expect(target).toBe(result);
});

test('Testing div float to int-- success', () => {
  const target = 1;
  const result = myFunctions.div(99.99, 99.99);
  expect(target).toBe(result);
});

test('Testing div with 0 divident -- success', () => {
  const target = 0;
  const result = myFunctions.div(0, 10);
  expect(target).toBe(result);
});

test('Testing string with a single digit -- success', () => {
  const target = true;
  const result = myFunctions.containsNumbers("abc1def");
  expect(target).toBe(result);
});

test('Testing string with multiple digits -- success', () => {
  const target = true;
  const result = myFunctions.containsNumbers("123");
  expect(target).toBe(result);
});

test('Testing string with no digits -- success', () => {
  const target = false;
  const result = myFunctions.containsNumbers("abcdef");
  expect(target).toBe(result);
});

test('Testing empty string -- success', () => {
  const target = false;
  const result = myFunctions.containsNumbers("");
  expect(target).toBe(result);
});

test('Testing string with a space only -- should return false', () => {
  const target = false;
  const result = myFunctions.containsNumbers(" "); 
  expect(target).toBe(result);
});


test('Testing string with underscores-- should return false', () => {
  const target = false;
  const result = myFunctions.containsNumbers("_____________"); 
  expect(target).toBe(result);
});

test('Testing string with a special character -- should return false', () => {
  const target = false;
  const result = myFunctions.containsNumbers("!@#"); 
  expect(target).toBe(result);
});

test('Testing string with digits and letters -- success', () => {
  const target = true;
  const result = myFunctions.containsNumbers("a1b2c3");
  expect(target).toBe(result);
});

test('Testing string with only numbers -- success', () => {
  const target = true;
  const result = myFunctions.containsNumbers("987654");
  expect(target).toBe(result);
});

test('Testing string only spaces -- success', () => {
  const target = false;
  const result = myFunctions.containsNumbers('__________');
  expect(target).toBe(result);
});
