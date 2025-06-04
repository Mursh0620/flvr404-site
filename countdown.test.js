/**
 * @jest-environment jsdom
 */
const { updateCountdown } = require('./assets/countdown');

describe('updateCountdown', () => {
  test('updates element with remaining time', () => {
    jest.useFakeTimers();
    const now = new Date('2025-05-30T00:00:00Z');
    jest.setSystemTime(now);
    const elem = document.createElement('div');
    const targetDate = new Date('2025-06-01T00:00:00Z');
    updateCountdown(elem, targetDate);
    expect(elem.textContent).toBe('2d 0h 0m 0s');
    jest.useRealTimers();
  });
});
