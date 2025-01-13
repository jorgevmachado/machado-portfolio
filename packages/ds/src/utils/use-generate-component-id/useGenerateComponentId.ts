import { useMemo } from 'react';

import { uuid } from '@repo/services';

export default function useGenerateComponentId(text: string): string {
  const uuidGenerate = uuid();
  const random = (Math.random() * 10).toFixed(1);
  return useMemo(() => `${text}-${random}-${uuidGenerate}`, [text]);
}
