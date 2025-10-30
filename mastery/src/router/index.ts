import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import MenuView from '@/views/MenuView.vue';
import ProductosView from '@/views/ProductosView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/menu', name: 'menu', component: MenuView },
  { path: '/productos', name: 'productos', component: ProductosView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
