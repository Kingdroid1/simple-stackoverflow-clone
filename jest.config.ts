export default {
    roots: ['<rootDir>/source'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testEnvironment: 'node',
    preset: 'ts-jest',
    verbose: true,
    coveragePathIgnorePatterns: [
        "/node_modules/",
        ".env",
        ".env.sample",
        ".gitignore",
        "README.md"
    ],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        "**/*.{ts, js, jsx}",
        "!**/node_modules/**",
        "!**/vendor/**"
    ],
    coverageThreshold: {
        global: {
            branches: 55,
            functions: 70,
            lines: 85,
            statements: 85
        }
    }
};

export const preset = {
    preset: "@shelf/jest-mongodb"
}