import { describe, test, expect, beforeEach, vi } from 'vitest';
import { useFormWithValidation } from '@/composables/formValidation/useFormWithValidation';
import { ValidationRules } from '@/composables/formValidation/types';

describe('useFormValidation', () => {
  const beforeSendMock = vi.fn(async (_formData) => {});
  const sendMock = vi.fn(async (_formData) => ({ status: 'success' }));
  const afterSendMock = vi.fn(async (_formData) => {});

  const fieldsConfig = [
    {
      name: 'username',
      value: '',
      rules: [{ type: ValidationRules.MinLength, value: 2, message: 'Name must be at least 2 characters long' }],
    },
    {
      name: 'email',
      value: '',
      rules: [{ type: ValidationRules.isEmail, message: 'Invalid email format' }],
    },
    {
      name: 'comment',
      value: '',
      rules: [{ type: ValidationRules.MinLength, value: 2, message: 'Comment must be at least 10 characters long' }],
    },
    {
      name: 'subscribe',
      value: false,
      rules: [{ type: ValidationRules.Required, message: 'You must agree to the terms' }],
    },
  ];

  let validation: any;

  beforeEach(() => {
    // Instantiate the validation function

    //@ts-expect-error
    validation = useFormWithValidation(fieldsConfig);
  });

  test('should initialize the form object correctly', () => {
    expect(validation.form.values).toEqual({ username: '', email: '', comment: '', subscribe: false });
    expect(validation.form.errors).toEqual({ username: [], email: [], comment: [], subscribe: [] });
    expect(validation.form.isInFocus).toEqual({ username: false, email: false, comment: false, subscribe: false });
  });

  test('should validate the whole form correctly', async () => {
    // Initially set invalid values
    validation.form.values.username = 'test';
    validation.form.values.email = 'testgmail.com';
    validation.form.values.comment = 'test-test';
    validation.form.values.subscribe = false;

    const isValidForm = validation.validateForm();
    expect(isValidForm).toBe(false);
    expect(validation.form.errors.email).toContain('Invalid email format');
    expect(validation.form.errors.subscribe).toContain('You must agree to the terms');

    // Correct the form values
    validation.form.values.username = 'test';
    validation.form.values.email = 'test@gmail.com';
    validation.form.values.comment = 'test-test';
    validation.form.values.subscribe = true;

    const isValidFormNow = validation.validateForm();
    expect(isValidFormNow).toBe(true);
  });

  test('should handle in-focus error logic correctly', async () => {
    validation.form.errors.email.push('Email is required');
    expect(validation.errorsToShow('email')).toHaveLength(0);

    validation.setInFocusValue('email', true);
    expect(validation.errorsToShow('email')).toContain('Email is required');
  });

  test('should not send form is not valid', async () => {
    await validation.sendForm({
      beforeSend: beforeSendMock,
      send: sendMock,
      afterSend: afterSendMock,
    });

    expect(beforeSendMock).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
    expect(afterSendMock).not.toHaveBeenCalled();
  });

  test('should send form data with hooks', async () => {
    // Correct the form values
    validation.form.values.username = 'test';
    validation.form.values.email = 'test@gmail.com';
    validation.form.values.comment = 'test-test';
    validation.form.values.subscribe = true;

    await validation.sendForm({
      beforeSend: beforeSendMock,
      send: sendMock,
      afterSend: afterSendMock,
    });

    expect(beforeSendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(afterSendMock).toHaveBeenCalledTimes(1);

    const formDataInBeforeHook = beforeSendMock.mock.calls?.[0]?.[0];
    expect(formDataInBeforeHook).toBeInstanceOf(FormData);
    expect(formDataInBeforeHook.get('username')).toBe('test');

    const responseInAfterSendHook = afterSendMock.mock.calls?.[0]?.[0];
    //@ts-ignore
    const formDataInAfterHook = afterSendMock.mock.calls?.[0]?.[1];
    expect(formDataInAfterHook).toBeInstanceOf(FormData);
    //@ts-ignore
    expect(formDataInAfterHook.get('username')).toBe('test');
    expect(responseInAfterSendHook).toEqual({ status: 'success' });
  });
});
