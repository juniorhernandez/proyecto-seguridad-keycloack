import { ref, computed, onMounted } from "vue";
import Swal from "sweetalert2";
import Navbar from "@/components/Navbar.vue";
import api from "@/services/api";
const productos = ref([]);
const venta = ref({
    producto_id: "",
    cantidad: 1,
    usuario: "admin",
    cliente_nombre: "",
    cliente_email: "",
    cliente_telefono: "",
    cliente_direccion: "",
});
const selectedProduct = computed(() => productos.value.find((p) => p.id === venta.value.producto_id));
const isValidForm = computed(() => {
    return venta.value.producto_id !== "" && venta.value.cantidad > 0 && venta.value.cliente_nombre.trim() !== "";
});
const cargarProductos = async () => {
    try {
        const res = await api.get("/inventory");
        productos.value = res.data;
    }
    catch (error) {
        console.error("Error al cargar productos:", error);
    }
};
const registrarVenta = async () => {
    if (!isValidForm.value) {
        Swal.fire("Campos incompletos", "Debes completar todos los campos obligatorios.", "warning");
        return;
    }
    try {
        const payload = {
            producto_id: venta.value.producto_id,
            cantidad: venta.value.cantidad,
            usuario: venta.value.usuario,
            cliente_nombre: venta.value.cliente_nombre,
            cliente_email: venta.value.cliente_email || null,
            cliente_telefono: venta.value.cliente_telefono || null,
            cliente_direccion: venta.value.cliente_direccion || null,
        };
        await api.post("/sales", payload);
        Swal.fire("✅ Venta registrada", "La venta se guardó correctamente y el stock fue actualizado.", "success");
        venta.value = {
            producto_id: "",
            cantidad: 1,
            usuario: "admin",
            cliente_nombre: "",
            cliente_email: "",
            cliente_telefono: "",
            cliente_direccion: "",
        };
        cargarProductos();
    }
    catch (error) {
        console.error("Error al registrar venta:", error);
        Swal.fire("Error", "No se pudo registrar la venta.", "error");
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
/** @type {__VLS_StyleScopedClasses['form-section']} */ ;
/** @type {__VLS_StyleScopedClasses['ventas-content']} */ ;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "ventas-container" },
});
/** @type {[typeof Navbar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Navbar, new Navbar({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "ventas-content" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "form-grid" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "form-section" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
__VLS_asFunctionalElement(__VLS_elements.input)({
    placeholder: "Nombre del cliente",
});
(__VLS_ctx.venta.cliente_nombre);
// @ts-ignore
[venta,];
__VLS_asFunctionalElement(__VLS_elements.input)({
    placeholder: "Correo electrónico (opcional)",
});
(__VLS_ctx.venta.cliente_email);
// @ts-ignore
[venta,];
__VLS_asFunctionalElement(__VLS_elements.input)({
    placeholder: "Teléfono (opcional)",
});
(__VLS_ctx.venta.cliente_telefono);
// @ts-ignore
[venta,];
__VLS_asFunctionalElement(__VLS_elements.textarea, __VLS_elements.textarea)({
    value: (__VLS_ctx.venta.cliente_direccion),
    placeholder: "Dirección (opcional)",
});
// @ts-ignore
[venta,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "form-section" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    value: (__VLS_ctx.venta.producto_id),
});
// @ts-ignore
[venta,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "",
});
for (const [p] of __VLS_getVForSourceType((__VLS_ctx.productos))) {
    // @ts-ignore
    [productos,];
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        key: (p.id),
        value: (p.id),
    });
    (p.nombre);
    (p.stock);
    (Number(p.precio).toFixed(2));
}
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "number",
    placeholder: "Cantidad",
    min: "1",
    max: (__VLS_ctx.selectedProduct?.stock || 0),
});
(__VLS_ctx.venta.cantidad);
// @ts-ignore
[venta, selectedProduct,];
if (__VLS_ctx.selectedProduct) {
    // @ts-ignore
    [selectedProduct,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "total" },
    });
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    ((__VLS_ctx.selectedProduct.precio * __VLS_ctx.venta.cantidad || 0).toFixed(2));
    // @ts-ignore
    [venta, selectedProduct,];
}
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.registrarVenta) },
    disabled: (!__VLS_ctx.isValidForm),
});
// @ts-ignore
[registrarVenta, isValidForm,];
/** @type {__VLS_StyleScopedClasses['ventas-container']} */ ;
/** @type {__VLS_StyleScopedClasses['ventas-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['form-section']} */ ;
/** @type {__VLS_StyleScopedClasses['form-section']} */ ;
/** @type {__VLS_StyleScopedClasses['total']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
