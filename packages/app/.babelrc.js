const Config = api => ({
  presets: [
    [
      '@babel/env',
      {
        modules: 'commonjs',
        useBuiltIns: 'entry',
        ...(api.env('test') && { targets: { node: 'current' } }),
      },
    ],
    '@babel/react',
  ],
  plugins: ['@babel/proposal-object-rest-spread', '@babel/proposal-class-properties'],
})

module.exports = Config
