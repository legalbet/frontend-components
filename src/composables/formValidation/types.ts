export enum ValidationRules {
  Required = 'required',
  MinLength = 'minLength',
  MaxLength = 'maxLength',
  isEmail = 'isEmail',
  isNumeric = 'isNumeric',
  isPositiveNumeric = 'isPositiveNumeric',
  isMinMaxDate = 'isMinMaxDate',
  isLessThanDate = 'isLessThanDate',
  isMoreThanDate = 'isMoreThanDate',
  isValidDate = 'isValidDate',
  isOnlyLetters = 'isOnlyLetters',
  isPhone = 'isPhone',
  isAnyFilled = 'isAnyFilled',
  isLatinDigitsDot = 'isLatinDigitsDot',
}

export type ValidationRule =
  | { type: ValidationRules.Required; message: string }
  | { type: ValidationRules.MaxLength; value: number; message: string }
  | { type: ValidationRules.MinLength; value: number; message: string }
  | { type: ValidationRules.isEmail; message: string }
  | { type: ValidationRules.isNumeric; message: string }
  | { type: ValidationRules.isPositiveNumeric; message: string }
  | { type: ValidationRules.isMinMaxDate; minDate: string; maxDate: string; message: string }
  | { type: ValidationRules.isLessThanDate; borderDate: string; message: string }
  | { type: ValidationRules.isMoreThanDate; borderDate: string; message: string }
  | { type: ValidationRules.isValidDate; message: string }
  | { type: ValidationRules.isOnlyLetters; message: string }
  | { type: ValidationRules.isPhone; message: string }
  | { type: ValidationRules.isAnyFilled; message: string }
  | { type: ValidationRules.isLatinDigitsDot; message: string };

export type FieldConfig<T> = {
  name: keyof T;
  value: string | boolean;
  rules: ValidationRule[];
  //в каком поле по умолчанию выводить серверную ошибку
  defaultServerError?: boolean;
};
export type ServerErrors = {
  error?: string;
  status?: string;
  message?: string;
  text?: string;
  success: boolean;
  field?: string;
};
export interface UseFormWithValidation<T extends Record<string, any>> {
  form: {
    values: Record<keyof T, string | boolean>; // Reactive values state
    errors: Record<keyof T, string[]>; // Reactive errors state
    isInFocus: Record<keyof T, boolean>; // Reactive focus state
    errorForm: boolean; //Если нужно все поля формы выделить красным в случае авторизации например (одно из нескольких полей неверное)
  };
  validateForm: () => boolean; // Function to validate the entire form
  validateField: (field: keyof T) => boolean; // Function to validate a specific field
  setInFocusValue: (field: keyof T, value: boolean) => void; // Function to manage focus
  errorsToShow: (field: keyof T) => string[]; // Function to show errors if in focus
  sendForm: (params: {
    beforeSend?: (formData: FormData) => Promise<void>;
    send: (formData: FormData) => Promise<any>;
    afterSend?: (response: any, formData: FormData) => Promise<void>;
  }) => Promise<any>; // Function to send the form
  showServerErrors: (data: { error: string; message?: string; success: boolean }) => void;
}
