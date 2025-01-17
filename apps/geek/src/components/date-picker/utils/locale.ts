import { enUS } from 'date-fns/locale/en-US';
import { es } from 'date-fns/locale/es';
import { fr } from 'date-fns/locale/fr';
import { ptBR } from 'date-fns/locale/pt-BR';

import { registerLocale } from 'react-datepicker';

import { TLocale } from '../interface';

export function register(locale: TLocale) {
  switch (locale) {
    case 'es':
      registerLocale('es', es);
      break;
    case 'fr':
      registerLocale('fr', fr);
      break;
    case 'ptBR':
      registerLocale('ptBR', ptBR);
      break;
    case 'enUS':
    default:
      registerLocale('enUS', enUS);
      break;
  }
}

export function currentDateLocale(date: Date, locale: TLocale) {
  return date.toLocaleDateString(getLocaleDateString(locale), {});
}

function getLocaleDateString(locale: TLocale) {
  switch (locale) {
    case 'es':
      return 'es';
    case 'fr':
      return 'fr';
    case 'ptBR':
      return 'pt-BR';
    case 'enUS':
    default:
      return 'en-US';
  }
}
