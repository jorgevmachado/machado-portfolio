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
    console.log('# => validateMobile => validatorMessage => ', validatorMessage);
    if (!validatorMessage.valid) {
        throw new Error(validatorMessage.message);
    }
    console.log('# => validateMobile => value => ', value);
    console.log('# => validateMobile => cleanAllFormatter => ', cleanAllFormatter);
    const x = cleanFormatter(value, cleanAllFormatter);
    console.log('# => validateMobile => cleanFormatter => ', x);
    return x
}