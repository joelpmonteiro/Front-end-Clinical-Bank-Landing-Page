<template>
  <HeaderNav></HeaderNav>
  <hr class="separator" />
  <section class="container container-sm container-md container-lg my-5">
    <div class="row">
      <div class="col-sm-6" style="display: grid; place-content: center">
        <FormGetData @sendGetData="getDataNeurotech"></FormGetData>
      </div>
      <div class="col-sm-6">
        <ApprovedCreditOrNot
          @sendPaymentData="dataApprovedCredit"
          v-if="credit.bool"
          :creditCard="credit"
        ></ApprovedCreditOrNot>
        <LayoutImg v-else></LayoutImg>
      </div>
    </div>
    <!-- <RouterView v-bind:style="changeStyle" /> -->
  </section>
  <ExtraSection
    v-if="computedAddress.dataCredit.checkForm"
    v-bind:style="changeStyle"
    @emit-send-data-user="addressUser"
  ></ExtraSection>
  <SectionCreditCard
    :paymentProps="computedAddress"
    v-bind:style="changeStyle"
  ></SectionCreditCard>

  <FooterSection></FooterSection>
</template>

<script>
import HeaderNav from "./components/HeaderNav.vue";
import FormGetData from "./components/FormGetData.vue";
import ApprovedCreditOrNot from "./components/ApprovedCreditOrNot.vue";
import ExtraSection from "./components/ExtraSection.vue";
import SectionCreditCard from "./components/SectionCreditCard.vue";
import FooterSection from "./components/Footer.vue";
import { computed, reactive, toRefs } from "vue";
import LayoutImg from "./components/LayoutImg.vue";
export default {
  components: {
    HeaderNav,
    FormGetData,
    ApprovedCreditOrNot,
    ExtraSection,
    SectionCreditCard,
    FooterSection,
    LayoutImg,
  },
  setup() {
    const objPassEmit = reactive({
      addressUserInf: {},
      approvedCredit: {},
      neurotech: [],
      checkForm: false,
    });
    const dataNeuro = reactive({
      credit: {
        values: [],
        msg: [],
        bool: false,
      },
    });
    const getDataNeurotech = (data, boolChek) => {
      if (boolChek && data !== null) {
        objPassEmit.neurotech = data;
        dataNeuro.credit.values = data;
        dataNeuro.credit.bool = true;
        dataNeuro.credit.msg = [
          "Credito Aprovado no momento",
          "Valor das parcelas",
        ];
      } else {
        dataNeuro.credit.values = data;
        dataNeuro.credit.msg[0] =
          "Conforme analise não foi possível realizar a solicitação";
        dataNeuro.credit.bool = true;
      }
    };

    //function
    const addressUser = (address, { checkForm }) => {
      console.log(checkForm);
      objPassEmit.addressUserInf = address;
      objPassEmit.checkForm = checkForm;
    };
    const dataApprovedCredit = (data) => {
      objPassEmit.approvedCredit = data;
    };
    ///

    const changeStyle = computed(() => {
      return dataNeuro.credit.values.length >= 1
        ? "display:block"
        : "display:none";
    });
    const computedAddress = computed(() => {
      return {
        userInf: objPassEmit.addressUserInf,
        dataCredit: objPassEmit.approvedCredit,
        neurotech: objPassEmit.neurotech,
        checkForm: objPassEmit.checkForm,
      };
    });
    return {
      getDataNeurotech,
      ...toRefs(dataNeuro),
      changeStyle,
      addressUser,
      computedAddress,
      dataApprovedCredit,
    };
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
