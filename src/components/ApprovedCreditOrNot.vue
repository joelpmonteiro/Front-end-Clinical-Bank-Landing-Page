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
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text">R$</span>
                <input
                  type="text"
                  class="form-control form-control-sm border-radius"
                  name="valorTratamento"
                  placeholder="Valor total do tratamento"
                  v-model="valueTotal"
                  @keyup="mascaraMoney"
                />
              </div>
              <!-- <input
                class="form-control form-control-sm border-radius"
                type="text"
                name="valorTratamento"
                placeholder="Valor total do tratamento"
                v-model="valueTotal"
                @keyup="mascaraMoney"
              /> -->
              <span
                >Valor restante: R$
                {{
                  valueTotal === null || valueTotal === ""
                    ? " "
                    : formatNumberMoney(calcCom)
                }}</span
              >
            </div>
            <div class="col-4 col-sm-5 pt-2">
              <label class="text-strong">Adicionar meio de pagamento:</label>
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
                Salvar
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
  <div
    class="modal fade"
    id="ModalValue"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click.prevent="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3" v-for="(value, index) in listHandle" :key="index">
              <label for="recipient-name" class="col-form-label"
                >Digite o valor para {{ value }}:</label
              >
              <input
                type="text"
                class="form-control"
                v-if="value === 'Pix'"
                v-model="pix"
              />

              <input
                type="text"
                class="form-control"
                v-if="value === 'Débito'"
                v-model="debito"
              />
              <input
                type="text"
                class="form-control"
                v-if="value === 'Transferência Bancária TED ou DOC'"
                v-model="tedOrDoc"
              />
              <input
                type="text"
                class="form-control"
                v-if="value === 'Cartão de Crédito'"
                v-model="cardCredit"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click.prevent="closeModal"
          >
            Fechar
          </button>
          <button
            type="button"
            @click="confirmedValuePayment"
            class="btn btn-primary"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, reactive, toRefs, watch } from "vue";
import { formatNumber } from "../util/formatMoney";
export default {
  name: "ApprovedCreditOrNot",
  props: {
    creditCard: {
      type: Object,
    },
  },
  emits: ["sendPaymentData"],
  setup(props, { emit }) {
    const listValueTypePayment = reactive({
      pix: "",
      debito: "",
      tedOrDoc: "",
      cardCredit: "",
    });
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

    const objFunction = reactive({
      mascaraMoney: () => {
        if (valueTotal.value) {
          var valor = valueTotal.value;

          valor = valor + "";
          valor = parseInt(valor.replace(/[\D]+/g, ""));
          valor = valor + "";
          valor = valor.replace(/([0-9]{2})$/g, ",$1");

          if (valor.length > 6) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
          }

          valueTotal.value = valor;
          if (valor == "NaN") valueTotal.value = "";
        }
      },
      formatNumberMoney: (value) => {
        return formatNumber(value);
      },
    });

    const closeModal = () => {
      const modal = document.querySelector("#ModalValue");
      modal.classList.remove("show");
      modal.removeAttribute("style", "display:block");
    };

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

    const confirmedValuePayment = () => {
      console.log("teste: ");
      const valuePayment = listHandle.value.map((value) => {
        if (value === "Pix")
          return { value: listValueTypePayment.pix, name: value };
        if (value === "Débito")
          return { value: listValueTypePayment.debito, name: value };
        if (value === "Transferência Bancária TED ou DOC")
          return { value: listValueTypePayment.tedOrDoc, name: value };
        if (value === "Cartão de Crédito")
          return { value: listValueTypePayment.cardCredit, name: value };
      });
      emit("sendPaymentData", {
        valueTotal: valueTotal.value,
        methodsPay: valuePayment,
        selectedParcel: selectedParcelItem.value,
        // parcelas: 12,
      });
    };
    const sendPayment = () => {
      if (listHandle.value.length > 1) {
        console.log(listHandle.value);
        const modal = document.querySelector("#ModalValue");
        // eslint-disable-next-line no-undef
        modal.classList.add("show");
        modal.setAttribute("style", "display:block");
      } else {
        emit("sendPaymentData", {
          valueTotal: valueTotal.value,
          methodsPay: listHandle.value,
          selectedParcel: selectedParcelItem.value,
          // parcelas: 12,
        });
      }
    };

    //wwatch
    watch(
      () => listValueTypePayment,
      (newValue) => {
        if (
          parseFloat(newValue.cardCredit) >
          parseFloat(valueApprovedComputed.value.vApproved)
        ) {
          alert(
            "Digite um valor valido ou Menor do que " + valor_approved.vApproved
          );
          listValueTypePayment.cardCredit = "";
        }
        if (
          parseFloat(newValue.debito) >
          parseFloat(valueApprovedComputed.value.vApproved)
        ) {
          alert(
            "Digite um valor valido ou Menor do que " + valor_approved.vApproved
          );
          listValueTypePayment.debito = "";
        }
        if (
          parseFloat(newValue.pix) >
          parseFloat(valueApprovedComputed.value.vApproved)
        ) {
          alert(
            "Digite um valor valido ou Menor do que " + valor_approved.vApproved
          );
          listValueTypePayment.pix = "";
        }
        if (
          parseFloat(newValue.tedOrDoc) >
          parseFloat(valueApprovedComputed.value.vApproved)
        ) {
          alert(
            "Digite um valor valido ou Menor do que " + valor_approved.vApproved
          );
          listValueTypePayment.tedOrDoc = "";
        }
      },
      { deep: true }
    );
    //
    //Init Compute
    const calcCom = computed(() => {
      if (valor_approved.vApproved === null || valor_approved.vApproved === 0)
        return 0;
      const formaValue = valueTotal.value.replace(".", "").replace(",", ".");
      return Math.abs(formaValue - valor_approved.vApproved).toFixed(2);
      //return Math.abs(valueTotal.value - valor_approved.vApproved).toFixed(2);
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
    //
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
      ...toRefs(objFunction),
      ...toRefs(listValueTypePayment),
      closeModal,
      confirmedValuePayment,
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
