import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Accidentabilidad from './views/Accidentabilidad.vue'
import Estadisticas from './views/Estadisticas.vue'
import Indicadores from './views/Indicadores.vue'
import RiesgoPlanta from './views/RiesgoPlanta.vue'
import ActividadPlanta from './views/ActividadPlanta.vue'
import VistaArea from './views/VistaArea.vue'
import VistaPersona from './views/VistaPersona.vue'
import Contacto from './views/Contacto.vue'
import Cuenta from './views/Cuenta.vue'
import Reporta from './views/Reporta.vue'
import RCA from './views/RCA.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/accidentabilidad',
      name: 'accidentabilidad',
      component: Accidentabilidad
    },
    {
      path: '/estadisticas',
      name: 'estadisticas',
      component: Estadisticas
    },
    {
      path: '/indicadores',
      name: 'indicadores',
      component: Indicadores
    },
    {
      path: '/riesgo-planta',
      name: 'riesgo-planta',
      component: RiesgoPlanta
    },
    {
      path: '/actividad-planta',
      name: 'actividad-planta',
      component: ActividadPlanta
    },
    {
      path: '/vista-area',
      name: 'vista-area',
      component: VistaArea
    },
    {
      path: '/vista-persona',
      name: 'vista-persona',
      component: VistaPersona
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: Contacto
    },
    {
      path: '/cuenta',
      name: 'cuenta',
      component: Cuenta
    },
    {
      path: '/reporta',
      name: 'reporta',
      component: Reporta
    },
    {
      path: '/rca',
      name: 'rca',
      component: RCA
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
