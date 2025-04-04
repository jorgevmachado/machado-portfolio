import { documentCookie } from '../window';

/**
 * Represents a utility class for handling browser cookies.
 */
class Cookies {
  public get(key: string): string | undefined {
    return documentCookie()
      .split('; ')
      .find((row) => row.startsWith(`${key}=`))
      ?.split('=')[1];
  }

  public set(
    key: string,
    value: string,
    domain: string,
    expires: number = 365,
  ) {
    const date = new Date();
    date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
    return (document.cookie = `${key}=${value}; expires=${date.toUTCString()}; path=/; domain=${domain}`);
  }

  public remove(key: string, domain: string) {
    return (document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`);
  }
}

export default new Cookies();
