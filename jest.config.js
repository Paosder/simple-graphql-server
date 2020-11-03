// reference: https://class101.dev/ko/blog/2019/09/09/grep/
const {
  compilerOptions: { paths },
} = require('./tsconfig');
const { resolve } = require('path');

const moduleNameMapper = {}; //jest환경에서도 module Alias를 사용하기 위해 tsConfig의 paths를 가공해서 설정해줍니다.
for (key in paths) { 
  const moduleName = `${key.slice(0, key.length - 1)}(.*)$`;
  moduleNameMapper[moduleName] = resolve(__dirname, `./${paths[key][0].slice(0, paths[key][0].length - 1)}$1`);
}

module.exports = {
  verbose: true,
  testEnvironment: 'node', //jest를 node 환경에서 돌리기 위해선 testEnvironment 설정이 필요합니다.
  roots: ['<rootDir>/test'], // test root.
  // transform: { // 이 프로젝트에서는 jsx, tsx를 읽을 일이 없음.
  //   '^.+\\.tsx?$': 'ts-jest',
  // },
  globals: {
    'ts-jest': { 
      diagnostics: true, // 에러를 어떻게 표출할 것인지? default: true. reference: https://kulshekhar.github.io/ts-jest/user/config/diagnostics
    },
  },
  // setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'], //테스트가 돌아가기 전에 의존성이나 추가 환경을 구성하기위한 setup file입니다.  
  testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'ts-jest',
  moduleNameMapper,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};