import type { RouteRecordRaw } from 'vue-router'
import Landing from '../pages/Landing.vue'
import WalletConnect from '../pages/WalletConnect.vue'
import Dashboard from '../pages/Dashboard.vue'
import Upload from '../pages/Upload.vue'
import FileDetails from '../pages/FileDetails.vue'
import Settings from '../pages/Settings.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/connect',
    name: 'WalletConnect',
    component: WalletConnect
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload,
    meta: { requiresAuth: true }
  },
  {
    path: '/file/:cid',
    name: 'FileDetails',
    component: FileDetails,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  }
]