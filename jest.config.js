module.exports = {
  testPathIgnorePatterns: [
    '<rootDir>/frontend/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/frontend/node_modules/',
    '<rootDir>/backend/node_modules/'
  ],
  projects: ['./backend', './frontend'],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0
    }
  }
}
