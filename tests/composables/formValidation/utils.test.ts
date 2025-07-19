import { describe, test, expect } from 'vitest';

import {
  isEmail,
  isNumeric,
  isOnlyLetters,
  isPhone,
  isPositiveNumeric,
  isLessThanDate,
  isMoreThanDate,
  isValidDate,
  isMinMaxDate,
} from '@/composables/formValidation/utils';

describe('Validation functions', () => {
  test('should validate email addresses correctly', () => {
    expect(isEmail('test@example.com')).toBe(true);
    expect(isEmail('user+extension@domain.org')).toBe(true);
    expect(isEmail('invalid-email')).toBe(false);
    expect(isEmail('test@.com')).toBe(false);
  });

  test('should validate numeric strings correctly', () => {
    expect(isNumeric('123')).toBe(true);
    expect(isNumeric('-123')).toBe(true);
    expect(isNumeric('123.45')).toBe(true);
    expect(isNumeric('123a')).toBe(false);
  });

  test('should validate strings containing only letters', () => {
    expect(isOnlyLetters('hello')).toBe(true);
    expect(isOnlyLetters('Привет')).toBe(true); // Cyrillic letters
    expect(isOnlyLetters('John-Doe')).toBe(true);
    expect(isOnlyLetters('hello123')).toBe(false);
  });

  test("should validate phone numbers starting with '7' and followed by 10 digits", () => {
    expect(isPhone('71234567890')).toBe(true);
    expect(isPhone('81234567890')).toBe(false);
    expect(isPhone('123')).toBe(false);
  });

  test('should validate positive numeric strings', () => {
    expect(isPositiveNumeric('123')).toBe(true);
    expect(isPositiveNumeric('123.45')).toBe(true);
    expect(isPositiveNumeric('-123')).toBe(false);
  });

  test('should validate if a date is less than the border date', () => {
    expect(isLessThanDate('01.01.2020', '31.12.2020')).toBe(true);
    expect(isLessThanDate('01.01.2021', '31.12.2020')).toBe(false);
  });

  test('should validate if a date is more than the border date', () => {
    expect(isMoreThanDate('01.01.2021', '31.12.2020')).toBe(true);
    expect(isMoreThanDate('01.01.2019', '31.12.2020')).toBe(false);
  });

  test('should validate valid dates', () => {
    expect(isValidDate('01.01.2020')).toBe(true);
    expect(isValidDate('31.02.2020')).toBe(false); // Invalid date
    expect(isValidDate('invalid-date')).toBe(false);
  });

  test('should validate if a date is within a min and max range', () => {
    expect(isMinMaxDate('01.01.2021', '01.01.2020', '31.12.2021')).toBe(true);
    expect(isMinMaxDate('01.01.2019', '01.01.2020', '31.12.2021')).toBe(false);
    expect(isMinMaxDate('01.01.2022', '01.01.2020', '31.12.2021')).toBe(false);
  });
});
