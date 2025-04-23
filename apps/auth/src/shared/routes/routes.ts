import { TParameters } from '../types';
import {NextRequest} from "next/server";

type GenerateUrlParams = TParameters & {
  url?: NextRequest['nextUrl'];
  error?: string;
  destination?: string;
};
export function generateUrl({
  url,
  env,
  error,
  source,
  redirectTo,
  destination = '/dashboard',
}: GenerateUrlParams) {
    const hasRequiredParameters = validRequiredParameters({ env, source, redirectTo });
    const currentDestination = getValidDestination(
        destination,
        hasRequiredParameters,
    );
    const currentError = getValidError(hasRequiredParameters, error);

    const currentUrl =  getCurrentUrl(url);
    const destinationUrl = new URL(currentDestination, currentUrl);
    if (env) {
        destinationUrl.searchParams.set('env', env);
    }
    if (source) {
        destinationUrl.searchParams.set('source', source);
    }
    if (redirectTo) {
        destinationUrl.searchParams.set('redirectTo', redirectTo);
    }
    if (currentError) {
        destinationUrl.searchParams.set('error', currentError);
    }
    return destinationUrl;
}

function getCurrentUrl(url: NextRequest['nextUrl'] | undefined) {
    if(!url) {
        return window.location.origin || 'http://localhost:4003';
    }
    return url;
}

export function validRequiredParameters({ source }: TParameters) {
    return Boolean(source);
}

function getValidDestination(
    destination: string,
    hasRequiredParameters: boolean,
) {
    return hasRequiredParameters ? destination : '/dashboard';
}

function getValidError(hasRequiredParameters: boolean, error?: string) {
    if (!error) {
        return hasRequiredParameters ? 'parameterNotFound' : error;
    }

    return error;
}