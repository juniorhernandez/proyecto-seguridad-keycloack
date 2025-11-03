import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();
const ready = ref(false);
const authenticated = ref(false);
onMounted(() => {
    // Esperar hasta que Keycloak esté listo y autenticado
    const interval = setInterval(() => {
        if (authStore.keycloak) {
            authenticated.value = authStore.authenticated;
            ready.value = true;
            clearInterval(interval);
        }
    }, 300);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
if (!__VLS_ctx.ready) {
    // @ts-ignore
    [ready,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "loading-screen" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "main-container" },
    });
    __VLS_asFunctionalElement(__VLS_elements.main, __VLS_elements.main)({
        ...{ class: "main-content" },
    });
    const __VLS_0 = {}.RouterView;
    /** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
    // @ts-ignore
    RouterView;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
/** @type {__VLS_StyleScopedClasses['loading-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['main-container']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
