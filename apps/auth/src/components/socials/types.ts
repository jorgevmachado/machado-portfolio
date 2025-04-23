import React from "react";

export type TSocialPlatform = 'google' | 'facebook' | 'github';

export type AuthSocial = Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
    label: string;
    platform: TSocialPlatform;
    ariaLabel?: string;
}