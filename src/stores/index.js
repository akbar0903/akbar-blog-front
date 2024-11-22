import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

/**
 * 统一管理pinia
 *
 */

const pinia = createPinia()
pinia.use(persist)

export default pinia

import { useAdminStore } from './admin.js'

export { useAdminStore }
