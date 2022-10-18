<template>
  <div class="row">
    <div class="col-12 col-sm-12">
      <div class="d-flex flex-wrap">
        <div
          class="row pt-3 d-block"
          v-if="creditCard.values !== null && creditCard.values.length >= 1"
        >
          <span class=""
            >{{ creditCard.msg[0] }} R${{
              valueApprovedComputed.vApproved
            }}</span
          >
          <span class=""
            >{{ creditCard.msg[1] }}: R$
            {{ valueApprovedComputed.parcelas }}</span
          >
          <form id="formInput" class="d-block">
            <div class="col-4 col-sm-5">
              <label class="text-strong">Valor Total Tratamento:</label>
              <input
                class="form-control form-control-sm border-radius"
                type="text"
                name="valorTratamento"
                placeholder="Valor total do tratamento"
                v-model.lazy.trim="valueTotal"
              />
              <span
                >Valor restante: R$
                {{
                  valueTotal === null || valueTotal === ""
                    ? " "
                    : calcCom + ".00"
                }}</span
              >
            </div>
            <div class="col-4 col-sm-5 pt-2">
              <label class="text-strong">Adicionar Tipo de Pagamento:</label>
              <select
                class="form-select form-select-sm"
                v-model="selectItem"
                @change.prevent="addTypePayment(selectItem)"
              >
                <option disabled select value="-1">
                  Selecione uma opção para pagamento!
                </option>
                <option
                  :value="index"
                  v-for="(value, index) in arrayTypePayment"
                  :key="index"
                >
                  {{ value }}
                </option>
              </select>
            </div>
            <div class="col-4 col-sm-5 pt-1">
              <div class="d-flex flex-column mb-2" v-if="listHandle.length > 0">
                <div
                  class="d-flex justify-content-between"
                  v-for="(value, index) in listHandle"
                  :key="index"
                >
                  <span>{{ value }}</span>
                  <input
                    class="btn btn-secondary btn-sm mb-2"
                    type="submit"
                    @click.prevent="deleteItem(index)"
                    value="excluir"
                  />
                </div>
              </div>
            </div>
          </form>
          <div class="col-4 col-sm-5 pt-1" v-if="valueTotal > 0">
            <div class="d-flex flex-column mb-3">
              <div class="d-flex justify-content-between mb-2">
                <span>Valor das Parcelas</span>
              </div>
              <div class="d-flex">
                <select
                  class="form-select"
                  name="state"
                  id="state"
                  v-model.number="selectedParcelItem"
                >
                  <option value="-1" selected disabled>
                    Selecione as parcelas desejadas
                  </option>
                  <option
                    v-for="(value, index) in installmentsFinancial"
                    :key="index"
                    :value="value"
                  >
                    {{ value }} Parcelas | Valor:
                    {{ (valueApprovedComputed.vApproved / value).toFixed(2) }}
                  </option>
                </select>
                <!-- <div class="d-flex justify-content-between">
                  <span class="marginSpan">{{ value }} Parcelas</span>
                  <span class="marginSpan1"
                    >Valor: {{ (calcCom / value).toFixed(2) }}</span
                  >
                </div> -->
              </div>

              <!-- <div class="row">
                <div class="d-flex justify-content-between">
                  <span>6 Parcelas</span>
                  <span>Valor x</span>
                </div>
              </div>
              <div class="row">
                <div class="d-flex justify-content-between">
                  <span>9 Parcelas</span>
                  <span>Valor x</span>
                </div>
              </div>
              <div class="row">
                <div class="d-flex justify-content-between">
                  <span>12 Parcelas</span>
                  <span>Valor x</span>
                </div>
              </div> -->
            </div>
          </div>
          <div class="col-4 col-sm-5 pt-1" v-if="listHandle.length > 0">
            <div class="d-flex flex-column mb-2">
              <button
                class="btn btn-outline-secondary"
                @click.prevent="sendPayment"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
        <div class="row pt-3 d-block" v-else>
          <span class="text-strong">{{ creditCard.msg[0] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
  name: "ApprovedCreditOrNot",
  props: {
    creditCard: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const selectedParcelItem = ref(-1);
    let valor_approved = { vApproved: null, parcelas: null };
    // eslint-disable-next-line vue/no-setup-props-destructure, no-unused-vars
    const valueProps = props.creditCard;
    const totalParcel = ref([12, 18, 24, 48]); //3, 6, 9, 10, 12

    const valueTotal = ref(null);
    const selectItem = ref(-1);
    const arrayTypePayment = ref([
      "Pix",
      "Débito",
      "Transferência Bancária TED ou DOC",
      "Cartão de Crédito",
    ]);

    const listHandle = ref([]);

    const addTypePayment = () => {
      if (selectItem.value !== -1)
        if (
          listHandle.value.indexOf(arrayTypePayment.value[selectItem.value]) ===
          -1
        ) {
          listHandle.value.push(arrayTypePayment.value[selectItem.value]);
        }
    };

    const deleteItem = (index) => {
      listHandle.value.splice(index, 1);
    };
    const sendPayment = () => {
      emit("sendPaymentData", {
        valueTotal: valueTotal.value,
        methodsPay: listHandle.value,
        selectedParcel: selectedParcelItem.value,
        // parcelas: 12,
      });
    };

    //Init Compute
    const calcCom = computed(() => {
      if (valor_approved.vApproved === null || valor_approved.vApproved === 0)
        return 0;
      return valueTotal.value - valor_approved.vApproved;
    });

    const installmentsFinancial = computed(() => {
      return totalParcel.value.filter(
        (value) =>
          (valueApprovedComputed.value.vApproved / value).toFixed(2) <
          valueApprovedComputed.value.parcelas
      );
    });
    const valueApprovedComputed = computed(() => {
      let y = {};
      valueProps.values.forEach((el) => {
        if (el.name === "CALC_VALOR_CONTRATO") y.vApproved = el.value;
        if (el.name === "CALC_VALOR_PARCELA") y.parcelas = el.value;
      });
      return y;
    });
    onMounted(() => {
      if (props.creditCard.values !== null) {
        props.creditCard.values.forEach((element) => {
          if (element.name === "CALC_VALOR_CONTRATO") {
            valor_approved.vApproved = element.value;
          }
          if (element.name === "CALC_VALOR_PARCELA")
            valor_approved.parcelas = element.value;
        });
      }
    });

    return {
      selectedParcelItem,
      sendPayment,
      valueTotal,
      arrayTypePayment,
      addTypePayment,
      deleteItem,
      selectItem,
      listHandle,
      calcCom,
      totalParcel,
      valueApprovedComputed,
      installmentsFinancial,
    };
  },
};
</script>

<style scoped>
.marginSpan {
  margin: auto 1px;
}

.marginSpan1 {
  margin: auto 5px;
}
</style>
