import type { Config } from 'jest';

export const config = {
  collectCoverage: true,
  testEnvironment: 'jsdom',
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'ts', 'json'],
} as const satisfies Config;
