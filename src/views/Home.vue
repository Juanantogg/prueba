<template>
  <div class="home">

    <div class="contenedor">
      <router-link to="/accidentabilidad" tag="div" class="item" >Accidentabilidad</router-link>
      <router-link to="/estadisticas" tag="div" class="item" >Estadisticas</router-link>
      <router-link to="/indicadores" tag="div" class="item" >Indicadores</router-link>
      <router-link to="/riesgo-planta" tag="div" class="item" >Nivel de Riesgo</router-link>
      <router-link to="/actividad-planta" tag="div" class="item" >Actividad Física</router-link>
      <router-link to="/reporta" tag="div" class="item" >Reportar un Incidente</router-link>
    </div>

  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  }
}
</script>

<style lang="scss" scoped>
.contenedor {
  background-color: #ff0;
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.item {
  margin: 1.8em;
  border: 1px solid green;
  height: 100px;
  width: 100px;
}
</style>
