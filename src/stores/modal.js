import { ref } from "vue";
import { defineStore } from "pinia";
import { useManageStore } from "../stores/manage.js";

export const useModalStore = defineStore("modal", () => {
    const manageStore = useManageStore();

    const show = ref(false);
    const functionType = ref("");

    function showModal(type, id) {
        show.value = true;
        switch (type) {
            case "Create":
                inputReset();
                manageStore.isEdit = false;
                break;
            case "Edit":
                manageStore.getRecordDetail(id);
                manageStore.isEdit = true;
                break;
            default:
                break;
        }
    }

    function closeModal() {
        show.value = false;
    }

    function inputReset(){
        manageStore.recordDate = "";
        manageStore.recordConsumeType = "";
        manageStore.recordPayType = "";
        manageStore.recordMoney = "";
        manageStore.recordMemo = "";
    }
    return{show, showModal, closeModal}
})