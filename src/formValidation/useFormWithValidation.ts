import { reactive, computed } from 'vue';
import {
  isEmail,
  isLatinDigitsDot,
  isLessThanDate,
  isMinMaxDate,
  isMoreThanDate,
  isNumeric,
  isOnlyLetters,
  isPhone,
  isPositiveNumeric,
  isValidDate,
} from './utils';
import type { FieldConfig, ServerErrors, UseFormWithValidation } from './types';
import { ValidationRules } from './types';

export function useFormWithValidation<T extends Record<string, any>>(
  fields: FieldConfig<T>[]
): UseFormWithValidation<T> {
  const form = reactive({
    values: {} as Record<keyof T, string | boolean>,
    errors: {} as Record<keyof T, string[]>,
    isInFocus: {} as Record<keyof T, boolean>,
    isFormSending: false,
  }) as {
    //Нужно чтобы обойти UnwrapRef и получить тип
    values: Record<keyof T, string | boolean>;
    errors: Record<keyof T, string[]>;
    isInFocus: Record<keyof T, boolean>;
    isFormSending: boolean;
  };

  fields.forEach(({ name, value }) => {
    form.values[name] = value;
    form.errors[name] = [];
    form.isInFocus[name] = false;
  });

  // Проверка валидности всей формы без записи ошибок (для disable кнопки)
  const isFormValid = computed(() => {
    return fields.every(({ name }) => checkFieldValidity(name).length === 0);
  });

  const isFormDisable = computed(() => !isFormValid.value || form.isFormSending);

  // функция проверки валидности поля - возвращает массив ошибок без изменения состояния
  function checkFieldValidity(field: keyof T): string[] {
    const rules = fields.find((f) => f.name === field)?.rules;
    if (!rules) {
      return [];
    }

    const errors: string[] = [];
    //Значение для чекбокса булево, а методы работают со строками
    const value =
      typeof form.values[field] === 'boolean' ? (!form.values[field] ? '' : 'true') : String(form.values[field]);

    rules.forEach((rule) => {
      switch (rule.type) {
        case ValidationRules.Required:
          if (!value) {
            errors.push(rule.message);
          }
          break;
        case ValidationRules.MinLength:
          if (value.length < rule.value) {
            errors.push(rule.message);
          }
          break;
        case ValidationRules.MaxLength:
          if (value.length > rule.value) {
            errors.push(rule.message);
          }
          break;
        case ValidationRules.isEmail:
          if (!isEmail(value)) {
            errors.push(rule.message);
          }
          break;
        case ValidationRules.isNumeric:
          if (!isNumeric(value)) {
            errors.push(rule.message);
          }
          break;
        case ValidationRules.isPositiveNumeric:
          if (!isPositiveNumeric(value)) {
            errors.push(rule.message);
          }
          break;
        case ValidationRules.isMinMaxDate:
          if (!isMinMaxDate(value, rule.minDate, rule.maxDate)) {
            errors.push(rule.message);
          }
          break;
        case ValidationRules.isLessThanDate:
          if (!isLessThanDate(value, rule.borderDate)) {
            errors.push(rule.message);
          }
          break;
        case ValidationRules.isMoreThanDate:
          if (!isMoreThanDate(value, rule.borderDate)) {
            errors.push(rule.message);
          }
          break;
        case ValidationRules.isValidDate:
          if (!isValidDate(value)) {
            errors.push(rule.message);
          }
          break;
        case ValidationRules.isOnlyLetters:
          if (!isOnlyLetters(value)) {
            errors.push(rule.message);
          }
          break;
        case ValidationRules.isPhone:
          if (!isPhone(value)) {
            errors.push(rule.message);
          }
          break;
        case ValidationRules.isAnyFilled:
          //TODO
          break;
        case ValidationRules.isLatinDigitsDot:
          if (!isLatinDigitsDot(value)) {
            errors.push(rule.message);
          }
          break;
      }
    });

    return errors;
  }

  // Валидация поля с записью ошибок в состояние
  function validateField(field: keyof T): boolean {
    const errors = checkFieldValidity(field);
    form.errors[field] = errors;
    return errors.length === 0;
  }

  // Валидация всей формы с записью ошибок (для submit)
  function validateForm(): boolean {
    let isFormValid = true;
    //Нужно пройтись по всем и убрать фокус, чтобы отразить ошибки, если сразу нижимаем отправить форму
    fields.forEach(({ name }) => {
      setInFocusValue(name, false);
      const isFieldValid = validateField(name);

      if (isFormValid && !isFieldValid) {
        isFormValid = false;
      }
    });
    return isFormValid;
  }

  function setInFocusValue(field: keyof T, value: boolean) {
    form.isInFocus[field] = value;
  }

  //TODO добавлять ошибки валидации с бэка, после сабмита
  function errorsToShow(field: keyof T) {
    return !form.isInFocus[field] ? form.errors[field] : [];
  }

  async function sendForm(params: {
    beforeSend?: (formData: FormData) => Promise<void>;
    send: (formData: FormData) => Promise<any>;
    afterSend?: (response: any, formData: FormData) => Promise<void>;
  }) {
    if (!validateForm()) {
      return {};
    }

    const { beforeSend, send, afterSend } = params;

    const formData = new FormData();

    Object.entries(form.values).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    await beforeSend?.(formData);

    form.isFormSending = true;

    const data = await send(formData).finally(() => {
      form.isFormSending = false;
    });

    showServerErrors(data);

    await afterSend?.(data, formData);

    return data;
  }
  function showServerErrors(data: ServerErrors) {
    //нет единой системы на беке, поэтому вывел найденные кейсы
    if (data && ((data.error && data.message) || (data.status && data.text))) {
      if (data.field && data.text) {
        const field2 = fields.find((el) => {
          return data.field ? (el.name as string).includes(data.field) : false;
        });
        if (!field2) return;
        form.errors[field2.name].push(data.text);
      } else if (data.message) {
        const field = fields.find((field) => field.defaultServerError);
        if (!field) return;
        form.errors[field.name].push(data.message);
      }
    }
  }

  return {
    form,
    validateForm,
    validateField,
    checkFieldValidity,
    isFormDisable,
    setInFocusValue,
    errorsToShow,
    sendForm,
    showServerErrors,
  };
}
