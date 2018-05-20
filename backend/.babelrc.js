const isTest = String(process.env.NODE_ENV) === 'test'

module.exports = {
  "presets": [
    [
      "env",
      {
        "targets": {
          "node": "current"
        },
        "modules": isTest ? "commonjs" : false
      }
    ]
  ],
  "plugins": [["transform-object-rest-spread", { "useBuiltIns": true }]]
}
