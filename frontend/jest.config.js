// jest.config.js

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    // Add type: "module" and extensionsToTreatAsEsm as needed
    type: 'module',
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
  };
