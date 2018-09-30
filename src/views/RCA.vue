<template>
  <div class="reporta">
    <h3>Reporta una incidencia</h3>

    <form class="formulario">
      <select
        class="areas"
        ref="reporte"
        @change='buscarReporte(parseInt($refs.reporte.value))'
      >
        <option
          v-for="(reporte, index) in reportes"
          :key="index"
          :value="reporte"
        >
          {{ reporte }}
        </option>
      </select>

      <input type="text" disabled :value="reporteEncontrado.afectado" placeholder="Afectado">
      <input type="text" disabled :value="reporteEncontrado.area" placeholder="Área del incidente">
      <select
        class="areas"
        ref="incidencia"
      >
        <option
          v-for="(incidencia, index) in incidencias"
          :key="index"
          :value="incidencia"
        >
          {{ incidencia }}
        </option>
      </select>
      <input type="text" disabled :value="reporteEncontrado.clasificacion" placeholder="Clasificación de incidente">
      <input type="text" disabled :value="reporteEncontrado.responsable" placeholder="Responsable RCA">
      <input type="text" disabled :value="reporteEncontrado['fecha-inicio']" placeholder="Fecha del incidente">
      <input type="number" ref="impacto" placeholder="Impacto estimado">
      <select
        class="areas"
        ref="causa"
      >
        <option
          v-for="(causa, index) in causas"
          :key="index"
          :value="causa"
        >
          {{ causa }}
        </option>
      </select>
      <p>{{ formatoFecha(fechaFin) }}</p>

      <div class="botones">
        <button @click="mostrarConfirmacion(parseInt($refs.reporte.value))" >Confirmar</button>
      </div>
    </form>

    <SweetModal ref="modal" title="Verifica que los datos son correctos." hide-close-button>
      <p>Nombre: <span>{{ reporteFinalizado.afectado }}</span></p>
      <p>Área del incidente: <span>{{ reporteFinalizado.area }}</span></p>
      <p>Clasificación del incidente: <span>{{ reporteFinalizado.clasificacion }}</span></p>
      <p>Responsable RCA: <span>{{ reporteFinalizado.responsable }}</span></p>
      <p>Impacto: <span>{{ reporteFinalizado.impacto }}</span></p>
      <p>Fecha inicio: <span>{{ reporteFinalizado['fecha-inicio'] }}</span></p>
      <p>Fecha fin: <span>{{ reporteFinalizado['fecha-inicio'] }}</span></p>
      <div class="botones">
        <button @click="confirmarRCA()">Confirmar</button>
      </div>
    </SweetModal>

  </div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'
import 'vue-datetime/dist/vue-datetime.css'

import incidencias from './../data/incidencias.json'
import causas from './../data/causas.json'

export default {
  name: 'reporta',
  components: {
    SweetModal
  },
  data () {
    return {
      fechaFin: new Date(),
      dataReportes: null,
      incidencias: [
        'Área de incidencias'
      ],
      reportes: [
        'Busca un reporte'
      ],
      causas: [
        'Busca la causa'
      ],
      reporteEncontrado: {
        'folio': 0,
        'afectado': '',
        'area': '',
        'responsable': '',
        'clasificacion': '',
        'activo': true,
        'impacto': 0,
        'fecha-inicio': '',
        'fecha-fin': '',
        'causa': ''
      },
      reporteFinalizado: {},
      areasIncidentes: [
        'Área de incidente',
        'Horno',
        'Almacén de MP',
        'Forja',
        'Tratamientos Térmicos',
        'Fundición',
        'Recepción de Materiales',
        'Almacén de PT',
        'Producción',
        'Bóvedas',
        'Chatarra',
        'Patio'
      ],
      responsables: [
        'Responsable RCA',
        'Juan Pérez',
        'Karlo Ibáñez',
        'Edmundo González',
        'Eduardo Torres',
        'Alejandra Torres',
        'Aurea Viruega',
        'Cesar Sánchez'
      ],
      clasificacionIncidente: [
        'Clasificación del incidente',
        'Acto y/o Condiciones Inseguras',
        'Incidente',
        'Accidente Leve',
        'Incapacidad Temporal',
        'Mortal/ Incapacidad Permanente'
      ]
    }
  },
  methods: {
    formatoFecha (fecha) {
      let meses = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ]
      let x = new Date(fecha)
      let dia = x.getDate()
      let mes = x.getMonth()
      let anio = x.getFullYear()
      return `${dia} de ${meses[mes]} de ${anio}`
    },
    mostrarConfirmacion (id) {
      if (id) {
        let x = this.dataReportes.find(reporte => reporte.folio === id)
        this.$refs.modal.open()

        x.impacto = this.$refs.impacto.value
        x.clasificacion = this.$refs.incidencia.value
        x.activo = false
        x['fecha-fin'] = this.formatoFecha(this.fechaFin)
        x.causa = this.$refs.causa.value

        this.reporteFinalizado = x

        this.dataReportes.forEach((reporte) => {
          if (reporte.folio === x.folio) {
            reporte = x
          }
        })
        window.localStorage.setItem('reportes', JSON.stringify(this.dataReportes))
      }
    },
    confirmarRCA () {
      this.reportes = [ 'Busca un reporte' ]

      let x = JSON.parse(window.localStorage.getItem('reportes'))

      for (let a in x) {
        if (this.dataReportes[a].activo) {
          this.reportes.push(parseInt(a) + 1)
        }
      }

      this.$refs.modal.close()
      setTimeout(() => {
        this.$router.push('/')
      }, 150)
    },
    cerrarModales () {
      this.$refs.modalHijo.close()
      this.$refs.modal.close()
    },
    buscarReporte (numeroReporte) {
      let reporte = this.dataReportes.find(reporte => reporte.folio === numeroReporte)
      if (reporte) {
        this.reporteEncontrado = reporte
      } else {
        this.reporteEncontrado = {
          'folio': 0,
          'afectado': '',
          'area': '',
          'responsable': '',
          'clasificacion': '',
          'activo': true,
          'impacto': 0,
          'fecha-inicio': '',
          'fecha-fin': '',
          'causa': ''
        }
      }
    }
  },
  beforeMount () {
    this.dataReportes = JSON.parse(window.localStorage.getItem('reportes'))
  },
  mounted () {
    for (let causa of causas) {
      this.causas.push(causa.nombre)
    }
    for (let incidencia of incidencias) {
      this.incidencias.push(incidencia.nombre)
    }
    for (let reporte in this.dataReportes) {
      if (this.dataReportes[reporte].activo) {
        this.reportes.push(parseInt(reporte) + 1)
      }
    }
  }
}
</script>

<style lang="scss">
.reporta {
  padding: 16px;
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
