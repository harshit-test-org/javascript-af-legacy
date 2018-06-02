module.exports = {
  overrides: [
    {
      test: 'backend',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          }
        ]
      ],
      plugins: [
        [
          '@babel/plugin-proposal-object-rest-spread',
          {
            useBuiltIns: true
          }
        ]
      ]
    }
  ]
}
