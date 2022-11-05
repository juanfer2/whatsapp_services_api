/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ['<rootDir>/specs'],
  clearMocks: true,
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  //transform: { "^.+\\.(ts|tsx)$": "ts-jest" },
  //preset: 'ts-jest',
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },

  /*
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "specs/(.*)": "<rootDir>/specs/$1"
  },
  */
};
