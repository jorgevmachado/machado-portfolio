import React from 'react';

import {
  CiCalendar,
  CiCamera,
  CiHeart,
  CiPhone,
  CiUser,
  CiWarning,
} from 'react-icons/ci';
import {
  FaCheck,
  FaFacebook,
  FaGoogle,
  FaHamburger,
  FaReact,
  FaRegLightbulb,
} from 'react-icons/fa';
import { IoClose, IoDocumentTextOutline } from 'react-icons/io5';
import {
  IoIosStar,
  IoIosStarHalf,
  IoIosStarOutline,
  IoMdExit,
} from 'react-icons/io';
import {
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
  MdOutlineInfo,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowUp,
  MdOutlineSpaceDashboard,
} from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';
import { VscError } from 'react-icons/vsc';

import type { TColors } from '../colors';

import type { TIcon, TIconPosition } from './interface';

export const OIconPosition: Array<TIconPosition> = ['left', 'right'];

export const OIcon: Array<TIcon> = [
  'user',
  'lamp',
  'star',
  'like',
  'exit',
  'check',
  'close',
  'error',
  'react',
  'phone',
  'google',
  'camera',
  'confirm',
  'success',
  'warning',
  'arrow-up',
  'facebook',
  'calendar',
  'document',
  'star-half',
  'hamburger',
  'arrow-down',
  'arrow-right',
  'star-filled',
];

export function getIcon(icon: TIcon, size?: string | number, color?: TColors) {
  switch (icon) {
    case 'user':
      return <CiUser size={size || '1em'} color={color} />;
    case 'lamp':
      return <FaRegLightbulb size={size || '1em'} color={color} />;
    case 'star':
      return <IoIosStarOutline size={size || '1em'} color={color} />;
    case 'info':
      return <MdOutlineInfo size={size || '1em'} color={color} />;
    case 'like':
      return <CiHeart size={size || '1em'} color={color} />;
    case 'exit':
      return <IoMdExit size={size || '1em'} color={color} />;
    case 'check':
      return <FaCheck size={size || '1em'} color={color} />;
    case 'close':
      return <IoClose size={size || '1em'} color={color} />;
    case 'error':
      return <VscError size={size || '1em'} color={color} />;
    case 'phone':
      return <CiPhone size={size || '1em'} color={color} />;
    case 'google':
      return <FaGoogle size={size || '1em'} color={color} />;
    case 'camera':
      return <CiCamera size={size || '1em'} color={color} />;
    case 'confirm':
    case 'success':
      return <GiConfirmed size={size || '1em'} color={color} />;
    case 'warning':
      return <CiWarning size={size || '1em'} color={color} />;
    case 'arrow-up':
      return <MdOutlineArrowDropUp size={size || '1em'} color={color} />;
    case 'facebook':
      return <FaFacebook size={size || '1em'} color={color} />;
    case 'calendar':
      return <CiCalendar size={size || '1em'} color={color} />;
    case 'document':
      return <IoDocumentTextOutline size={size || '1em'} color={color} />;
    case 'star-half':
      return <IoIosStarHalf size={size || '1em'} color={color} />;
    case 'dashboard':
      return <MdOutlineSpaceDashboard size={size || '1em'} color={color} />;
    case 'hamburger':
      return <FaHamburger size={size || '1em'} color={color} />;
    case 'arrow-down':
      return <MdOutlineArrowDropDown size={size || '1em'} color={color} />;
    case 'arrow-right':
      return <MdOutlineKeyboardArrowRight size={size || '1em'} color={color} />;
    case 'star-filled':
      return <IoIosStar size={size || '1em'} color={color} />;
    case 'arrow-up-outline':
      return <MdOutlineKeyboardArrowUp size={size || '1em'} color={color} />;
    case 'arrow-down-outline':
      return <MdOutlineKeyboardArrowDown size={size || '1em'} color={color} />;
    case 'react':
    default:
      return <FaReact size={size || '1em'} color={color} />;
  }
}
