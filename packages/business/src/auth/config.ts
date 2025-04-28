import { mobileValidator } from '@repo/services/validator/contact/contact';
import { cleanFormatter as serviceCleanFormatter } from "@repo/services/formatter/formatter";

export function cleanFormatter(value?: string, cleanAllFormatter: boolean = true) {
    if (!value) {
        return value;
    }
    if (cleanAllFormatter) {
        return serviceCleanFormatter(value);
    }

    return value;
}

export function validateMobile(value?: string, cleanAllFormatter: boolean = true) {
    const valueToValidate = cleanFormatter(value, true);
    const validatorMessage = mobileValidator({ value: valueToValidate });
    if (!validatorMessage.valid) {
        throw new Error(validatorMessage.message);
    }
    return cleanFormatter(value, cleanAllFormatter);
}