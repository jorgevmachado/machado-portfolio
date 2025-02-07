'use client';
import { useEffect } from 'react';

import { pokemonService } from '../../shared';

import Home from '../page';

export default function Dashboard() {
  useEffect(() => {
    pokemonService.getAll({ limit: 10, page: 0}).then((response) => {
      console.log('response => ', response);
    });
  }, []);
  return <Home />;
}
