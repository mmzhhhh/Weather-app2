module.exports = {
  content: [
    './src/**/*.{html,js,vue}', // 包含 .vue 文件
    './public/index.html',      // 如果你的 HTML 文件在 public 文件夹中
  ],
  theme: {
    fontFamily:{
      'montserrat':['Montserrat','sans-serif']
    },
    extend: {
    },
  },
  plugins: [],
  darkMode: 'media',
}
