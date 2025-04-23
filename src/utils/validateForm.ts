import FormDataProps, { Rules } from '@/api/types/form';

export const validate = <T extends FormDataProps>(formData: T, rules: Rules[]) => {
  type Errors = {
    [k in keyof T]?: string[];
  };
  const errors: Errors = {};
  const fKeys = Object.keys(formData);
  rules.map((rule) => {
    const { key, type, message } = rule;
    const index = fKeys.indexOf(key);
    
    if (index > -1) {
      const value = formData[key]?.toString().trim();
      switch (type) {
        case 'required':
          if (isEmpty(value)) {
            errors[key as keyof T] = errors[key] ?? [];
            errors[key]?.push(message);
          }
          break;
        case 'pattern':
          if (!isEmpty(value) && rule.type === 'pattern' && !rule.regex.test(value!.toString())) {
            errors[key as keyof T] = errors[key] ?? [];
            errors[key]?.push(message);
          }
          break;
        default:
          return;
      }
    }
  });
  
  return errors;
};
function isEmpty(value: null | undefined | string | number | FormDataProps) {
  return value == null || value === '';
}
