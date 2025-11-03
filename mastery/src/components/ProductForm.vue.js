import { ref } from 'vue';
import api from '@/services/api';
import Swal from 'sweetalert2';
const emit = defineEmits(['refresh']);
const form = ref({
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    usuario: 'admin',
});
const guardar = async () => {
    try {
        await api.post('/inventory', form.value);
        form.value = { nombre: '', descripcion: '', precio: 0, stock: 0, usuario: 'admin' };
        emit('refresh');
        await Swal.fire({
            title: '✅ Producto guardado',
            text: 'El producto se ha registrado correctamente.',
            icon: 'success',
            confirmButtonColor: '#1abc9c',
            confirmButtonText: 'Aceptar',
        });
    }
    catch (error) {
        console.error('❌ Error al guardar producto:', error);
        await Swal.fire({
            title: '❌ Error',
            text: 'Ocurrió un error al guardar el producto. Verifica los datos e intenta nuevamente.',
            icon: 'error',
            confirmButtonColor: '#e74c3c',
            confirmButtonText: 'Entendido',
        });
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['btn-guardar']} */ ;
/** @type {__VLS_StyleScopedClasses['form-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-guardar']} */ ;
__VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
    ...{ onSubmit: (__VLS_ctx.guardar) },
    ...{ class: "form-container" },
});
// @ts-ignore
[guardar,];
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "form-grid" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    for: "nombre",
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: "nombre",
    placeholder: "Ej. Tornillo galvanizado",
    required: true,
});
(__VLS_ctx.form.nombre);
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    for: "descripcion",
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: "descripcion",
    placeholder: "Ej. Tornillo de acero 3cm",
});
(__VLS_ctx.form.descripcion);
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    for: "precio",
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: "precio",
    type: "number",
    step: "0.01",
    min: "0",
    required: true,
    placeholder: "0.00",
});
(__VLS_ctx.form.precio);
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    for: "stock",
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: "stock",
    type: "number",
    min: "0",
    required: true,
    placeholder: "0",
});
(__VLS_ctx.form.stock);
// @ts-ignore
[form,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    type: "submit",
    ...{ class: "btn-guardar" },
});
/** @type {__VLS_StyleScopedClasses['form-container']} */ ;
/** @type {__VLS_StyleScopedClasses['form-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-guardar']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
});
export default {};
