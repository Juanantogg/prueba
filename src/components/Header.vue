<template>
  <div class="header">

    <router-link tag="div" class="titular" to="/">
      <div @click="ocultarMenu()" class="logo">
        <!-- <img src="" alt=""> -->
      </div>
      <h2 @click="ocultarMenu()">Empresa</h2>
    </router-link>

    <div class="buscar-menu">
      <div class="buscar"></div>
      <div class="menu-movil" @click="mostrarMenu()"></div>
    </div>

    <div class="navegacion" :class="{'navegacion--extendida': menuMostrado}">
      <ul>
        <li @click="ocultarMenu()">
          <router-link class="home navegacion__link" to="/">Inicio</router-link>
        </li>
        <li @click="ocultarMenu()">
          <router-link class="cuenta navegacion__link" to="/cuenta">Cuenta</router-link>
        </li>
        <li @click="ocultarMenu()">
          <router-link class="contacto navegacion__link" to="/contacto">Contacto</router-link>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      menuMostrado: false
    }
  },
  methods: {
    mostrarMenu () {
      this.menuMostrado = !this.menuMostrado
    },
    ocultarMenu () {
      this.menuMostrado = false
    }
  }

}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}
.titular {
  display: flex;
  align-items: center;
  cursor: pointer;
  h2 {
    font-size: 1.5em;
  }
}
.logo {
  width: 32px;
  height: 32px;
  border: 1px dotted grey;
  margin-right: 8px;
}
.buscar-menu {
  width: 70px;
  display: flex;
  cursor: pointer;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navegacion {
  background-color: #fff;
  border: 1px solid red;
  position: absolute;
  top: 60px;
  right: -200px;
  width: 200px;
  height: calc(100vh - 60px);
  transition: right linear .4s;
  &__link {
    color: black;
    text-decoration: none;
    width: 100%;
    padding: 16px;
    display: flex;
    align-items: center;
  }
  ul {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  &--extendida {
    right: 0;
  }
}
.home::before,
.buscar::before,
.cuenta::before,
.contacto::before,
.menu-movil::before {
  font-family: 'icomoon';
  font-size: 1.2em;
  margin-right: 8px;
}
.menu-movil::before {
  margin: 0;
  content: '\e9bd';
}
.home::before {
  content: '\e900';
}
.buscar{
  cursor: pointer;
  &::before {
    margin: 0;
    content: '\e986'

  }
}
.cuenta::before {
  content: '\e971'
}
.contacto::before {
  content: '\e942'
}

</style>
