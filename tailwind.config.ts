import type { Config } from 'tailwindcss'

// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      'black-pearl': '#050918',
      'athens-gray': '#F9F9FA',
      'cod-gray': '#0B0A0A',
      woodsmoke: '#2C2C36', //'#18181b',
      mischka: '#e4e4e7',
      malibu: '#8E98FF',
      'cornflower-blue': '#6B78FF',
      cararra: '#ECEBE8',
      flamingo: '#F25727',
      amaranth: '#EC2176',
      melrose: '#B2B9FF',
      'bright-turquoise': '#0DE7B2',
      'screamin-green': '#6FFF7D',
      'radical-red': '#FF3F57',
      mustard: '#FCD651',
    },
    fontFamily: {
      display: [
        'Fira Sans',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
    },
  },
  plugins: [],
}
