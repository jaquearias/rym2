import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', // Direccion a la que se va a dirigir 
    name: 'inicio', // Para identificar de manera individual la ruta y poder manipularla desde el lado de los componentes y las vistas
    component: HomeView // Componente al que está relacionado
  },
  // {
  //   path: '/:page', 
  //   name: 'paginado', 
  //   component: () => import("../views/HomeView.vue")
  // },
  {
    path: '/about', 
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue') //Esta forma de colocar los componentes es con una funcion flecha hace que solamente se importe la vista cuando es necesaria, cuando se entra a la ruta que depende de esa vista: lazy loud (carga perezosa)
  },
  {
    path: '/listaDetalles/:id/:currentPage', 
    name: 'listaDetalles', 
    component: () => import("../views/DetalleView.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
