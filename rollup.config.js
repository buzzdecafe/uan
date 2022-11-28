const typescript = require('@rollup/plugin-typescript')


module.exports = {
  input: 'src/uan.ts',
  output: {
    file: 'dist/uan.js'
  },
  plugins: [
    typescript()
  ]
}
