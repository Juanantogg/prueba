<template>
  <div class="accidentabilidad">

    <h1>Accidentabilidad</h1>
    <div>
      <div>
        <p style="text-align: center; color: red">Mortal o incapacidad permanente</p>
        <p style="text-align: center; color: orange">Incapacidad Temporal</p>
        <p style="text-align: center; color: yellow">Accidente Leve</p>
        <p style="text-align: center; color: chartreuse">Incidente</p>
        <p style="text-align: center; color: green">Actos y/o condiciones inseguras</p>
      </div>
      <div class="piramide">
        <div class="item red">{{ mortal }}</div>
        <div class="item orange">{{ incapacidad }}</div>
        <div class="item yellow">{{ accidente }}</div>
        <div class="item chartreuse">{{ incidente }}</div>
        <div class="item green">{{ condicionInsegura }}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'accidentabilidad',
  data () {
    return {
      rootStyles: '',
      dataReportes: null,
      mortal: 0,
      incapacidad: 0,
      accidente: 0,
      incidente: 0,
      condicionInsegura: 0,
      total: 0
    }
  },
  components: {
  },
  beforeMount () {
    this.dataReportes = JSON.parse(window.localStorage.getItem('reportes'))
    this.rootStyles = document.documentElement
  },
  mounted () {
    this.dataReportes.forEach((reporte) => {
      switch (reporte.clasificacion) {
        case 'Mortal/ Incapacidad Permanente':
          this.mortal++
          this.total++
          break
        case 'Incapacidad Temporal':
          this.incapacidad++
          this.total++
          break
        case 'Accidente Leve':
          this.accidente++
          this.total++
          break
        case 'Incidente':
          this.incidente++
          this.total++
          break
        case 'Acto y/o Condiciones Inseguras':
          this.condicionInsegura++
          this.total++
          break
      }
    })

    document.documentElement.style.setProperty('--red', `${(this.mortal * 100) / this.condicionInsegura}%`)
    document.documentElement.style.setProperty('--orange', `${(this.incapacidad * 100) / this.condicionInsegura}%`)
    document.documentElement.style.setProperty('--yellow', `${(this.accidente * 100) / this.condicionInsegura}%`)
    document.documentElement.style.setProperty('--chartreuse', `${(this.incidente * 100) / this.condicionInsegura}%`)
    document.documentElement.style.setProperty('--green', `${(this.condicionInsegura * 100) / this.condicionInsegura}%`)
    console.log((this.mortal * 100) / this.total)
    console.log((this.incapacidad * 100) / this.total)
    console.log((this.accidente * 100) / this.total)
    console.log((this.incidente * 100) / this.total)
    console.log((this.condicionInsegura * 100) / this.total)
  }
}
</script>

<style lang="scss" scoped>
:root {
  --red: 20%;
  --orange: 40%;
  --yellow: 60%;
  --chartreuse: 80%;
  --green: 100%;
  --total: 100%;
}
.accidentabilidad {
  padding: 8px;
}

.piramide {
  width: 95%;
  margin: auto;
}
.item {
  height: 52px;
  margin: auto;
  min-width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
}
.red {
  background-color: red;
  width: var(--red);
}
.orange {
  background-color: orange;
  width: var(--orange);
}
.yellow {
  background-color: yellow;
  width: var(--yellow);
}
.chartreuse {
  background-color: chartreuse;
  width: var(--chartreuse);
}
.green {
  background-color: green;
  width: var(--green);
}
</style>
