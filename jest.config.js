module.exports = {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "verbose": true,
    "rootDir": "src",
    "roots": [
      "<rootDir>",
    ],
    "modulePaths": [
      "<rootDir>",
    ],
    "moduleDirectories": [
      "node_modules",
      "<rootDir>"
    ],
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "coveragePathIgnorePatterns": [
      "<rootDir>/node_modules",
      "().entity.(ts|tsx|js)$"
    ],
    "testPathIgnorePatterns": [
      "<rootDir>/node_modules",
      "().entity.(ts|tsx|js)$"
    ],
    "watchPathIgnorePatterns": [
      "<rootDir>/node_modules",
      "().entity.(ts|tsx|js)$"
    ],
    "coverageReporters": [
      "text-summary",
      "html"
    ],
    "coverageDirectory": "./coverage",
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,mjs}"
    ],
    "testEnvironment": "node"
  };