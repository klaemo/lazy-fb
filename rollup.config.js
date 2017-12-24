import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

const isUMD = process.env.FORMAT === 'umd'

export default {
  input: 'index.js',
  // only minifiy UMD build
  plugins: [babel(), isUMD && uglify()],
  output: isUMD
    ? {
      file: 'lazy-fb.min.js',
      format: 'umd',
      name: 'lazyFB'
    }
    : {
      file: 'lazy-fb.js',
      format: 'cjs'
    }
}
