const { pathsToModuleNameMapper } = require('ts-jest/utils');

// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  modulePathIgnorePatterns: [
    'createMockMethods.ts',
    'index.test-d.ts',
    'fakeParams.ts',
    'setupTests.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.ts'],
};
