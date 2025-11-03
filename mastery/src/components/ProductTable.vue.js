import { ref } from 'vue';
import api from '@/services/api';
import Swal from 'sweetalert2';
const props = defineProps();
const emit = defineEmits(['refresh']);
const mostrarModal = ref(false);
const productoEditando = ref({});
const abrirModal = (producto) => {
    productoEditando.value = { ...producto };
    mostrarModal.value = true;
};
const cerrarModal = () => {
    mostrarModal.value = false;
    productoEditando.value = {};
};
const guardarCambios = async () => {
    try {
        const datosActualizados = {};
        const camposAComparar = ['nombre', 'descripcion', 'precio', 'stock'];
        for (const campo of camposAComparar) {
            const productoOriginal = props.productos.find(p => p.id === productoEditando.value.id);
            if (!productoOriginal)
                continue;
            const nuevoValor = productoEditando.value[campo];
            const valorOriginal = productoOriginal[campo];
            if (nuevoValor !== undefined && nuevoValor !== valorOriginal) {
                datosActualizados[campo] = nuevoValor;
            }
        }
        if (Object.keys(datosActualizados).length === 0) {
            await Swal.fire('ℹ️ Sin cambios', 'No se detectaron modificaciones.', 'info');
            cerrarModal();
            return;
        }
        await api.put(`/inventory/${productoEditando.value.id}`, datosActualizados);
        await Swal.fire('✅ Actualizado', 'El producto fue actualizado correctamente.', 'success');
        emit('refresh');
        cerrarModal();
    }
    catch (error) {
        console.error('❌ Error al actualizar producto:', error);
        await Swal.fire('❌ Error', 'Ocurrió un error al actualizar el producto.', 'error');
    }
};
const eliminar = async (id) => {
    const result = await Swal.fire({
        title: '¿Eliminar producto?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
    });
    if (result.isConfirmed) {
        await api.put(`/inventory/${id}/desactivar`);
        emit('refresh');
        Swal.fire('Eliminado', 'El producto fue eliminado correctamente.', 'success');
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
/** @type {__VLS_StyleScopedClasses['styled-table']} */ ;
/** @type {__VLS_StyleScopedClasses['styled-table']} */ ;
/** @type {__VLS_StyleScopedClasses['styled-table']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-edit']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-delete']} */ ;
/** @type {__VLS_StyleScopedClasses['styled-table']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-save']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-cancel']} */ ;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "table-container" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
__VLS_asFunctionalElement(__VLS_elements.table, __VLS_elements.table)({
    ...{ class: "styled-table" },
});
__VLS_asFunctionalElement(__VLS_elements.thead, __VLS_elements.thead)({});
__VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
__VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({});
for (const [p] of __VLS_getVForSourceType((__VLS_ctx.productos))) {
    // @ts-ignore
    [productos,];
    __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({
        key: (p.id),
    });
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (p.id);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (p.nombre);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (Number(p.precio).toFixed(2));
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    (p.stock);
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.abrirModal(p);
                // @ts-ignore
                [abrirModal,];
            } },
        ...{ class: "btn btn-edit" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.eliminar(p.id);
                // @ts-ignore
                [eliminar,];
            } },
        ...{ class: "btn btn-delete" },
    });
}
if (!__VLS_ctx.productos || __VLS_ctx.productos.length === 0) {
    // @ts-ignore
    [productos, productos,];
    __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({});
    __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({
        colspan: "5",
        ...{ class: "no-data" },
    });
}
if (__VLS_ctx.mostrarModal) {
    // @ts-ignore
    [mostrarModal,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ onClick: (__VLS_ctx.cerrarModal) },
        ...{ class: "modal" },
    });
    // @ts-ignore
    [cerrarModal,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "modal-content" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
    __VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
        ...{ onSubmit: (__VLS_ctx.guardarCambios) },
    });
    // @ts-ignore
    [guardarCambios,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        for: "nombre",
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        id: "nombre",
        ...{ class: "form-input" },
        placeholder: "Nombre",
        required: true,
    });
    (__VLS_ctx.productoEditando.nombre);
    // @ts-ignore
    [productoEditando,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        for: "descripcion",
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        id: "descripcion",
        ...{ class: "form-input" },
        placeholder: "Descripción",
    });
    (__VLS_ctx.productoEditando.descripcion);
    // @ts-ignore
    [productoEditando,];
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
        ...{ class: "form-input" },
        placeholder: "Precio",
        required: true,
    });
    (__VLS_ctx.productoEditando.precio);
    // @ts-ignore
    [productoEditando,];
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
        ...{ class: "form-input" },
        placeholder: "Stock",
        required: true,
    });
    (__VLS_ctx.productoEditando.stock);
    // @ts-ignore
    [productoEditando,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "modal-buttons" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        type: "submit",
        ...{ class: "btn btn-save" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.cerrarModal) },
        type: "button",
        ...{ class: "btn btn-cancel" },
    });
    // @ts-ignore
    [cerrarModal,];
}
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['styled-table']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-edit']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-delete']} */ ;
/** @type {__VLS_StyleScopedClasses['no-data']} */ ;
/** @type {__VLS_StyleScopedClasses['modal']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-save']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-cancel']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
    __typeProps: {},
});
export default {};
