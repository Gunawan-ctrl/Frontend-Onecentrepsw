import Vue from 'vue'
import VueRouter from 'vue-router'
import baseRoutes from './routes'
import * as role from '../helper/ListRole'
let routes = baseRoutes
Vue.use(VueRouter)

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute (route, parentLayout = "default") {
	route.meta = route.meta || {};
	route.meta.layout = route.layout || parentLayout;

	if (route.children) {
		route.children = route.children.map((childRoute) => addLayoutToRoute(childRoute, route.meta.layout));
	}
	return route;
}

routes = routes.map((route) => addLayoutToRoute(route));

const router = new VueRouter({
	mode: 'history',
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior (to, from, savedPosition) {
		if (to.hash) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
		return {
			x: 0,
			y: 0,
			behavior: 'smooth',
		}
	}
})

router.beforeEach((to, from, next) => {
	const dataUser = Vue.prototype.$getProfile()
	const noSession = dataUser === null || dataUser === 'undefined'
	const loginPage = 'loginPage'
	if (to.matched.some(r => r.meta.bupati)) {
		if (noSession) {
			next({ name: loginPage })
		} else {
			if (dataUser.role === role.bupati.name) {
				next()
			} else {
				next({
					name: loginPage
				})
			}
		}
	} else {
		if (noSession) {
			next()
		} else {
			const userRole = dataUser.role
			if (userRole === role.bupati.name) {
				next({
					name: role.bupati.index
				})
			}
		}
	}
})

export default router
