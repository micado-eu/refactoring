import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
//import axios from 'axios'

export default async ({ Vue, router, store, app }) => {
    console.log("boot keycloak before async tockerinterceptor")
    async function tokenInterceptor () {
        Vue.prototype.$axios.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`
            return config
        }, error => {
            return Promise.reject(error)
        })
    }

    return new Promise(resolve => {
        console.log("boot keycloak before vue use")
        Vue.use(VueKeyCloak, {
            init: {
                onLoad: 'check-sso', // or 'check-sso'
                flow: 'standard',
                pkceMethod: 'S256',
                silentCheckSsoRedirectUri: window.location.origin + '/statics/silent-check-sso.html',
                checkLoginIframe: false // otherwise it would reload the window every so seconds
            },
            config: {
                url: 'http://keycloak:8080/auth',
                realm: 'migrants',
                clientId: 'migrant_app'
            },
            onReady: (keycloak) => {
                tokenInterceptor()
                resolve()
            }
        })
    })
}