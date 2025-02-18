module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    coverageDirectory: 'coverage',
    collectCoverage: true,
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.js$': 'babel-jest',
      '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg|gif|pdf)$':
        'jest-transform-stub',
    },
    clearMocks: true,
    setupFilesAfterEnv: ['./src/SetupTests.ts'],
    coveragePathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '.story.js',
      '<rootDir>/coverage',
      '<rootDir>/src/utils',
      '<rootDir>/src/theme',
      'styles.tsx',
      '<rootDir>/src/*.d.ts',
      '<rootDir>/src/App.tsx',
      '<rootDir>/src/index.tsx',
      '<rootDir>/src/services',
    ],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/coverage'],
    transformIgnorePatterns: ['/node_modules/(?!react-toastify/).+\\.css$'],
    moduleNameMapper: {
      '^@src/(.*)$': '<rootDir>/src/$1',
      '^@components/(.*)$': '<rootDir>/src/components/$1',
      '^@assets/(.*)$': '<rootDir>/public/assests/$1',
    },
}