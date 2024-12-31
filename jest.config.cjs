module.exports = {
  preset: 'ts-jest/presets/default-esm', // Usa el preset de ts-jest para ES Modules
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest', // Usa babel-jest para transformar archivos JS/JSX
  },
  transformIgnorePatterns: [
    '/node_modules/(?!lit|@lit|@open-wc|@webcomponents).+\\.js$', // Transforma los módulos necesarios
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mapea archivos de estilo a un proxy
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Archivo de configuración adicional
};