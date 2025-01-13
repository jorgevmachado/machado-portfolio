class Validator {
  public isValidCep(value: string, clean: boolean = true): boolean {
    const cepRegex = /^\d{5}\d{3}$/;
    const currentValue = clean ? this.cleanAll(value) : value;
    return cepRegex.test(currentValue);
  }

  public isValidPhone(value: string, clean: boolean = true): boolean {
    const phoneRegex = /(^\d{10}$)|(^$)/;
    const currentValue = clean ? this.cleanAll(value) : value;
    return phoneRegex.test(currentValue);
  }

  public isValidMobile(value: string, clean: boolean = true): boolean {
    const mobileRegex = /(^\d{11}$)|(^$)/;
    const currentValue = clean ? this.cleanAll(value) : value;
    return mobileRegex.test(currentValue);
  }

  public isValidCpf(value: string, clean: boolean = true): boolean {
    const cpfRegex = /^\d{3}\d{3}\d{3}\d{2}$/;
    const currentValue = clean ? this.cleanAll(value) : value;
    return cpfRegex.test(currentValue);
  }

  public isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailRegex.test(email);
  }

  public isValidNumber(value: string): boolean {
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(value);
  }

  public isValidPassword(value: string): boolean {
    return value.length >= 6;
  }

  public isEmpty(value: unknown): boolean {
    const type = typeof value;

    if (type === 'boolean') {
      return !value;
    }

    if (type !== 'object') {
      return !value;
    }

    return false;
  }

  private cleanAll(value: string) {
    return value
      .replaceAll('.', '')
      .replace('-', '')
      .replaceAll('(', '')
      .replaceAll(')', '')
      .replaceAll(' ', '');
  }
}

export default new Validator();
