<!-- eslint-disable prettier/prettier -->
<script setup>
import HeaderComponent from "../components/HeaderComponent/Header.vue";
import SimulateTreatment from "../components/FormComponent/SimulateTreatment.vue";
import RequestData from "../components/FormComponent/RequestData.vue";
import CreditNotApproved from "../components/CreditNotApproved.vue";
import RequestCreditData from "../components/FormComponent/RequestCreditData.vue";
import CreditApproved from "../components/FormComponent/CreditApproved.vue";
import { ref, reactive, computed } from "vue";

const check = ref(false);
const objPassEmit = reactive({
  addressUserInf: {},
  approvedCredit: {},
  neurotech: [],
  checkForm1: false,
  checkForm2: false,
});

const computedAddress = computed(() => {
  return {
    userInf: objPassEmit.addressUserInf,
    dataCredit: objPassEmit.approvedCredit,
    neurotech: objPassEmit.neurotech,
    checkForm1: objPassEmit.checkForm1,
    checkForm2: objPassEmit.checkForm2,
  };
});

const dataNeuro = reactive({
  credit: {
    values: [],
    msg: [],
    bool: false,
  },
});

//function
const getDataNeurotech = (data, boolChek) => {
  if (boolChek && data !== null) {
    objPassEmit.neurotech = data;
    dataNeuro.credit.values = data;
    dataNeuro.credit.bool = true;
    // dataNeuro.credit.msg = ["Credito Aprovado no momento", "Valor das parcelas"];
  } else {
    dataNeuro.credit.values = data;
    dataNeuro.credit.msg[0] = "Conforme analise não foi possível realizar a solicitação";
    dataNeuro.credit.bool = true;
  }
};

const approvedPaymentData = (data) => {
  objPassEmit.approvedCredit = data;
  objPassEmit.checkForm1 = data.checkForm;
};

const requestData = (data, { checkForm }) => {
  objPassEmit.addressUserInf = data;
  objPassEmit.checkForm2 = checkForm;
};
</script>

<template>
  <HeaderComponent></HeaderComponent>

  <SimulateTreatment
    v-if="!dataNeuro.credit.bool"
    @sendGetData="getDataNeurotech"
  ></SimulateTreatment>

  <CreditApproved
    v-if="dataNeuro.credit.bool && !objPassEmit.checkForm1"
    :creditCard="dataNeuro.credit"
    @sendPaymentData="approvedPaymentData"
  >
  </CreditApproved>

  <RequestData
    v-if="objPassEmit.checkForm1 && !objPassEmit.checkForm2"
    @emit-send-data-user="requestData"
  >
  </RequestData>

  <RequestCreditData
    v-if="objPassEmit.checkForm2"
    :paymentProps="computedAddress"
  ></RequestCreditData>

  <CreditNotApproved v-if="check"></CreditNotApproved>
</template>
