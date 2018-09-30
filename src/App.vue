<template>
  <div>
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header'

import data from './data/reportes.json'

export default {
  name: 'app',
  components: {
    Header
  },
  mounted () {
    if (!window.localStorage.getItem('reportes')) {
      window.localStorage.setItem('reportes', JSON.stringify(data))
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'icomoon';
  src:  url('./assets/fonts/icomoon.eot?3q6l0l');
  src:  url('./assets/fonts/icomoon.eot?3q6l0l#iefix') format('embedded-opentype'),
    url('./assets/fonts/icomoon.ttf?3q6l0l') format('truetype'),
    url('./assets/fonts/icomoon.woff?3q6l0l') format('woff'),
    url('./assets/fonts/icomoon.svg?3q6l0l#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
}

*,
*::before,
*::after {
    box-sizing: border-box;
}

body {
  background-color: #e6e6e6;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
</style>
