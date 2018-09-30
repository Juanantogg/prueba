<template>
  <div class="reporta">
    <h3>Reporta una incidencia</h3>

    <form class="formulario">
      <input type="text" ref="afectado" placeholder="Nombre del afectado">
      <select class="areas" ref="areaIncidente">
        <option
          v-for="(area, index) in areasIncidentes"
          :key="index"
          :value="area"
        >
          {{ area }}
        </option>
      </select>
      <select class="areas" ref="responsable">
        <option
          v-for="(responsable, index) in responsables"
          :key="index"
          :value="responsable"
        >
          {{ responsable }}
        </option>
      </select>
      <Datetime
        ref="fecha"
        class="calendar"
        v-model="calendar.date"
        placeholder='Fecha'
        :max-datetime="calendar.maxDay"
      />

      <div class="botones">
        <button @click="confirmarIncidencia">Confirmar</button>
        <router-link tag="button" to="/rca">RCA</router-link>
      </div>

    </form>

    <SweetModal ref="modal" title="Verifica que los datos son correctos." hide-close-button>
      <p>Nombre: <span>{{ reporte.afectado }}</span></p>
      <p>Área del incidente: <span>{{ reporte.area }}</span></p>
      <p>Responsable RCA: <span>{{ reporte.responsable }}</span></p>
      <p>Fecha: <span>{{ reporte['fecha-inicio'] }}</span></p>
      <div class="botones">
        <button @click="confirmarReporte()">Confirmar</button>
        <button @click="$refs.modal.close()">Cancelar</button>
      </div>
    </SweetModal>

    <SweetModal ref="modalHijo" title="Número de reporte" hide-close-button>
      {{ reportes.length }}
      <div class="botones">
        <button @click="cerrarModales()">Cerrar</button>
      </div>
    </SweetModal>

  </div>
</template>

<script>
import { DateTime as LuxonDateTime } from 'luxon'
import { SweetModal } from 'sweet-modal-vue'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import reportes from './../data/reportes.json'
import responsables from './../data/responsables.json'
import areas from './../data/areas.json'

export default {
  name: 'reporta',
  components: {
    Datetime,
    SweetModal

  },
  data () {
    return {
      calendar: {
        date: '',
        maxDay: LuxonDateTime.local().plus({ days: 0 }).toISO()
      },
      areasIncidentes: [ 'Área de incidente' ],
      responsables: [ 'Responsable RCA' ],
      reporte: {
        folio: 0,
        afectado: '',
        area: '',
        responsable: '',
        clasificacion: '',
        activo: true,
        impacto: 0,
        'fecha-inicio': '',
        'fecha-fin': '',
        'causa': ''
      },
      reportes
    }
  },
  methods: {
    confirmarIncidencia () {
      this.$refs.modal.open()
      let meses = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ]
      let fecha = new Date(this.$refs.fecha.value)
      let dia = fecha.getDate()
      let mes = fecha.getMonth()
      let anio = fecha.getFullYear()

      this.reporte['fecha-inicio'] = `${dia} de ${meses[mes]} de ${anio}`
      this.reporte.responsable = this.$refs.responsable.value
      this.reporte.area = this.$refs.areaIncidente.value
      this.reporte.afectado = this.$refs.afectado.value
    },
    cerrarModales () {
      this.$refs.modalHijo.close()
      this.$refs.modal.close()
    },
    confirmarReporte () {
      this.reporte.folio = reportes.length
      reportes.push(this.reporte)
      this.$refs.modalHijo.open()
      console.log(reportes)
    }
  },
  mounted () {
    for (let area of areas) {
      this.areasIncidentes.push(area.nombre)
    }
    for (let responsable of responsables) {
      this.responsables.push(responsable.nombre)
    }
  }
}
</script>

<style lang="scss">
.reporta {
  padding: 16px
}
.formulario {
  width: 100%;
  max-width: 600px;
  margin: auto;
  input {
    &::placeholder {
      text-align: center;
    }
    width: 100%;
    padding: .5em;
    border-radius: 5px;
    margin: .5em 0;
    outline: none;
    text-align: center;
  }
}
.areas {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  margin: 8px 0;
}
.botones {
  width: 100%;
  margin-top: 2em;
  display: flex;
  justify-content: space-around;
}
.calendar {
  margin: auto;
  border: none !important;
}
.sweet-modal {
  background-color: #e6e6e6;
  width: 90% !important;
  max-width: 600px !important;
  height: auto !important;
  position: relative !important;
  top: 0 !important;
  left: 0 !important;
  transform: translate(calc(50vw - 50%), calc(50vh - 50%)) !important;
}
</style>
