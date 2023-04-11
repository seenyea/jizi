const {
  default: tsjPreset
} = require('ts-jest/presets');
module.exports = {
  preset: 'ts-jest',
  rootDir: './',
  transform: {
    ...tsjPreset.transform
  },
  testRegex: '(/test/.*\\.(test|spec))\\.[tj]sx?$',
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx"
  ],
  moduleNameWrapper: {
    '^@src/(.*)$': '<rootDir>/src/baseTs/$1'
  }
}