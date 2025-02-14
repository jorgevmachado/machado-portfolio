import { mobileValidator } from '@repo/services/validator/contact/contact';

export function cleanFormatter(value?: string, cleanAllFormatter: boolean = true) {
    if (!value) {
        return value;
    }
    if (cleanAllFormatter) {
        return value.replace(/[^\w]/g, '');
    }

    return value;
}

export function validateMobile(value?: string, cleanAllFormatter: boolean = true) {
    const valueToValidate = cleanFormatter(value, true);
    const validatorMessage = mobileValidator({ value: valueToValidate });
    if (!validatorMessage.valid) {
        throw new Error(validatorMessage.message);
    }
    return cleanFormatter(valueToValidate, cleanAllFormatter);
}