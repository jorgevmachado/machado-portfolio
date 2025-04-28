import React from 'react';
import { useSearchParams } from 'next/navigation';

import './Dashboard.scss';

export default function Dashboard() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source') ?? undefined;
  const env = searchParams.get('env') ?? undefined;
  const error = searchParams.get('error') ?? undefined;


  const getMessageError = () => {
    const result: { error: boolean; message: string; } = {
      error: false,
      message: 'Page Not Found.'
    }
    const isEmptyParam = !source && !env;
    const emptyParametersMessage = 'Some parameters are missing. Please check the URL.';

    switch (error) {
      case 'notfound':
        result.error = true;
        result.message = 'Page Not Found.';
        break;
      case 'emptyParameters':
        result.error = true;
        result.message = emptyParametersMessage;
        break;
      case 'notAuthenticated':
        result.error = true;
        result.message =  'You are not authenticated.';
        break;
      case 'authenticated':
        result.error = true;
        result.message =  'You are already authenticated.';
        break;
      default:
        result.error = false;
        break;
    }
    if(!result.error && isEmptyParam) {
      return emptyParametersMessage;
    }
    return result.message;
  };

  return (
    <div className="error-container">
      <div className="error-box">
        <div className="error-icon">⚠️</div>
        <h1 className="error-title">Oops!</h1>
        <p className="error-description">{getMessageError()}</p>
      </div>
    </div>
  );
}
