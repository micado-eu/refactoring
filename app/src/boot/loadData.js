import { setLocale } from './i18n'

export default async ({ store, Vue }) => {
    try {
        //    await store.dispatch('statistics/fetchStatistics');
        var curlang = ''
        var defaultLangString = ''
        var defaultLang = {}
        var userLang = {}
        var paLogo = ''

        //    await store.dispatch('features/fetchFeatures');
        await store.dispatch("language/fetchActiveLanguages")

        await store.dispatch('settings/fetchSettings')
            .then(settings => {
                console.log("#####################################")
                console.log(settings)
                curlang = settings.filter((setting) => { return setting.key == 'default_language' })[0]
                defaultLang = store.state.language.languages.filter(function (l) { return l.lang == curlang.value })[0]
                paLogo = settings.filter((setting) => { return setting.key == 'pa_logo' })[0]
                var migrant_tenant = settings.filter((setting) => { return setting.key == 'migrant_tenant' })[0]
                var pa_tenant = settings.filter((setting) => { return setting.key == 'pa_tenant' })[0]

                defaultLangString = defaultLang.name
                Vue.prototype.$defaultLangString = defaultLangString
                Vue.prototype.$paLogo = paLogo.value
                Vue.prototype.$defaultLang = defaultLang.lang
                // somewhere we need to set the userLang reading it dfrom the user preferences and we will override this value
                // TODO: Save this setting in db instead of local storage
                if (!localStorage.lang) {
                    localStorage.lang = defaultLang.lang
                }
                Vue.prototype.$userLang = localStorage.lang
                Vue.prototype.$migrant_tenant = parseInt(migrant_tenant.value)
                Vue.prototype.$pa_tenant = parseInt(pa_tenant.value)

                userLang = store.state.language.languages.filter(function (l) { return l.lang == localStorage.lang })[0]
                setLocale(userLang)

            })
        console.log("READ LANGUAGES SO CAN SET PROPERLY STUFF")
        console.log(curlang.value)
        console.log(defaultLangString)
        console.log(Vue.prototype.$defaultLang)
        console.log(Vue.prototype.$userLang)
        await store.dispatch('topic/fetchTopic', { defaultLang: Vue.prototype.$defaultLang, userLang: Vue.prototype.$userLang })
        await store.dispatch('user_type/fetchUserType', { defaultLang: Vue.prototype.$defaultLang, userLang: Vue.prototype.$userLang })
        await store.dispatch('tenant/fetchTenants')
        // somewhere we need to set the userLang reading it dfrom the user preferences
    } catch (err) {
        console.error('Quasar failed to load initial data with the error message: ', err)
    }
}

