import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import ProductForm from '@/components/ProductForm.vue';
import ProductTable from '@/components/ProductTable.vue';
import api from '@/services/api';
const productos = ref([]);
const cargarProductos = async () => {
    try {
        const res = await api.get('/inventory');
        productos.value = res.data;
    }
    catch (error) {
        console.error('❌ Error al cargar productos:', error);
    }
};
onMounted(cargarProductos);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "productos-container" },
});
/** @type {[typeof Navbar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Navbar, new Navbar({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "content" },
});
/** @type {[typeof ProductForm, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(ProductForm, new ProductForm({
    ...{ 'onRefresh': {} },
}));
const __VLS_5 = __VLS_4({
    ...{ 'onRefresh': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
let __VLS_7;
let __VLS_8;
const __VLS_9 = ({ refresh: {} },
    { onRefresh: (__VLS_ctx.cargarProductos) });
// @ts-ignore
[cargarProductos,];
var __VLS_6;
/** @type {[typeof ProductTable, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(ProductTable, new ProductTable({
    ...{ 'onRefresh': {} },
    productos: (__VLS_ctx.productos),
}));
const __VLS_12 = __VLS_11({
    ...{ 'onRefresh': {} },
    productos: (__VLS_ctx.productos),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
let __VLS_14;
let __VLS_15;
const __VLS_16 = ({ refresh: {} },
    { onRefresh: (__VLS_ctx.cargarProductos) });
// @ts-ignore
[cargarProductos, productos,];
var __VLS_13;
/** @type {__VLS_StyleScopedClasses['productos-container']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
