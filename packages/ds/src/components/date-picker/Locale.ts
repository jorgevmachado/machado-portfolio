import { TLocale } from './interface';

import { enUS } from 'date-fns/locale/en-US';
import { es } from 'date-fns/locale/es';
import { fr } from 'date-fns/locale/fr';
import { ptBR } from 'date-fns/locale/pt-BR';

import { registerLocale } from 'react-datepicker';

export default function register(locale: TLocale) {
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
