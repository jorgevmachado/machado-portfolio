import React from 'react';

import {
  IoIosClose,
  IoIosStar,
  IoIosStarHalf,
  IoIosStarOutline,
  IoMdExit,
  IoMdEye,
  IoMdEyeOff,
} from 'react-icons/io';

import type { TIconGroupIcons } from '../interface';

export const ioGroup: TIconGroupIcons = {
  eye: <IoMdEye />,
  user: undefined,
  lamp: undefined,
  star: <IoIosStarOutline />,
  info: undefined,
  like: undefined,
  exit: <IoMdExit />,
  check: undefined,
  close: <IoIosClose />,
  error: undefined,
  react: undefined,
  phone: undefined,
  google: undefined,
  camera: undefined,
  confirm: undefined,
  success: undefined,
  warning: undefined,
  'arrow-up': undefined,
  facebook: undefined,
  calendar: undefined,
  document: undefined,
  'star-half': <IoIosStarHalf />,
  dashboard: undefined,
  hamburger: undefined,
  'eye-close': <IoMdEyeOff />,
  'arrow-down': undefined,
  'arrow-right': undefined,
  'star-filled': <IoIosStar />,
  'arrow-up-outline': undefined,
  'arrow-down-outline': undefined,
};