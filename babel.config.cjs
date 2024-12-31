module.exports = {
  presets: [
    '@babel/preset-env',         // Para compilar a una versión compatible de JS
    '@babel/preset-typescript',   // Para soporte de TypeScript
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
  ],
  sourceType: 'module', // Asegúrate de que Babel entienda que es un módulo ES
};