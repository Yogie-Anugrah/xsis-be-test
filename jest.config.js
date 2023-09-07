// config for jest

module.exports = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/src/**/*.test.js', '**/src/**/*.test.ts'],
    collectCoverage: true,
    collectCoverageFrom: ['**/src/**/*.js', '**/src/**/*.ts'],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'html'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    }
};