<!-- eslint-disable prettier/prettier -->
<template>
  <section class="container-fluid">
    <div class="d-flex justify-content-center row pt-3">
      <div class="col-12 col-sm-6 col-md-12 col-lg-5">
        <div class="text-center">
          <span class="text-color colorBlueTransparent">Crédito Aprovado</span>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center row pt-3">
      <div class="col-12 col-sm-12 col-md-6 col-lg-12">
        <div class="text-center">
          <span class="fw-bold lh-1 color-black">A solicitação foi aprovada!</span>
          <p class="fw-bold lh-1 color-black">
            Valor disponibilizado para a realização do tratamento:
          </p>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <form class="">
        <div class="d-flex justify-content-evenly">
          <div class="col-9 col-sm-12 col-md-8 col-lg-2 mb-1">
            <div class="form-group mb-3">
              <label for="" class="fw-bolder">Valor de Crédito Aprovado:</label>
              <input type="text" disabled class="form-control text-center form-control-sm backgroundInput fw-bold"
                placeholder="R$ xxxx,xx" @keyup="mascaraMoney" :value="valueApprovedComputed.amount" />
            </div>
            <div class="form-group mb-3">
              <label for="" class="fw-bolder">Limite Max. Parcela:</label>
              <input type="text" disabled class="form-control text-center form-control-sm backgroundInput fw-bold"
                placeholder="R$ xx,xx" :value="valueApprovedComputed.installments" />
            </div>
            <div class="form-group mb-3">
              <label for="" class="fw-bolder">Valor Total do Tratamento:</label>
              <input type="text" class="form-control text-center form-control-sm backgroundInput fw-bold"
                placeholder="R$ " v-model="valueTotal" @keyup="mascaraMoney" />
            </div>
            <div class="form-group mb-3">
              <label for="" class="fw-bolder">Diferença a Pagar:</label>
              <input type="text" disabled class="form-control text-center form-control-sm backgroundInput fw-bold"
                placeholder="R$ " v-model="calcRemaining" />
            </div>
          </div>
          <div class="col-9 col-sm-12 col-md-8 col-lg-2 mb-1">
            <!-- <div class="form-group mb-3">
              <label class="text-center fw-bolder" for="">Meio de Pagamento:</label>
              <select v-model.lazy="selectItem"
                class="form-select form-select-sm backgroundSelect backgroundInput fw-bold text-center" name="payment"
                id="payment">
                <option value="-1" selected disabled>Forma de pagamento</option>
                <option :value="index" v-for="(value, index) in arrayTypePayment" :key="index">
                  {{ value }}
                </option>
              </select>
            </div> -->

            <div class="input-group mb-3" v-for="(value, index) in installmentsFinancial" :key="index">
              <button class="btn w-25 btn-outline-secondary buttonGroup fw-bolder" type="button"
                @click.prevent="selectItemParcel(value)">
                {{ value.installments }}x
              </button>
              <input disabled type="text" class="form-control text-center form-control-md backgroundInput fw-bold"
                placeholder="R$ " :value="value.amount" />
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center text-center">
          <button class="btn btn-md backgroundBlueTransparent text-white fw-bold" type="submit"
            @click.prevent="nextStepPayment" name="Credito">
            Próximo
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
<script>
import { toRefs, ref, reactive, onMounted, computed, watch } from "vue";
import { formatNumber } from "../../util/formatMoney.js";
import { creditSimulation } from "../../services/axios.js";

export default {
  name: "CreditApproved",
  props: {
    creditCard: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const valueProps = props.creditCard;
    const listValueTypePayment = reactive({
      pix: "",
      debito: "",
      tedOrDoc: "",
      cardCredit: "",
    });
    const selectedParcelItem = ref({});
    let valor_approved = { vApproved: null, parcelas: null };

    const installmentsFinancial = ref([]);
    const calcRemaining = ref(null);
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

    const selectItemParcel = (item) => {
      console.log(item);
      selectedParcelItem.value = item;
    };
    const nextStepPayment = () => {
      if (
        selectedParcelItem.value.amount > 0 &&
        selectedParcelItem.value.installments > 0 &&
        parseFloat(valueTotal.value.replace(".", "").replace(",", ".")) > 0
      ) {
        // const pay = arrayTypePayment.value.find((value, index) => {
        //   return index === selectItem.value;
        // });

        emit("sendPaymentData", {
          valueTotal: valueTotal.value,
          // methodsPay: pay,
          selectedParcel: selectedParcelItem.value,
          checkForm: true,
        });
      } else {
        alert("verifique os dados, ou selecione o numero de parcelas");
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

    watch(valueTotal, () => {
      console.log("watch:", valueApprovedComputed.value.amount);
      const formaValue = valueTotal.value.replace(".", "").replace(",", ".");
      calcRemaining.value = Math.abs(
        formaValue - valueApprovedComputed.value.amount
      ).toFixed(2);
    });

    const valueApprovedComputed = computed(() => {
      let valueCredi = {};
      if (valueProps.values.length >= 1) {
        let [y] = valueProps.values;
        valueCredi = {
          amount: y.value.amount,
          installments: y.value.maxInstallmentValue,
        };
      }

      return valueCredi;
    });
    //
    onMounted(() => {
      creditSimulation({
        amount: valueApprovedComputed.value.amount,
        maxInstallmentValue: valueApprovedComputed.value.installments,
      })
        .then((result) => {
          console.log("resultado final: ", result);
          const { data } = result.data;
          installmentsFinancial.value = data;
        })
        .catch((err) => {
          alert("Erro ao simular o valor total e as parcelas!");
          console.log(err);
        });
    });

    return {
      selectedParcelItem,
      valueTotal,
      arrayTypePayment,
      selectItem,
      listHandle,
      // calcCom,
      valueApprovedComputed,
      installmentsFinancial,
      selectItemParcel,
      ...toRefs(objFunction),
      ...toRefs(listValueTypePayment),
      calcRemaining,
      nextStepPayment,
    };
  },
};
</script>
<style scoped>
.text-color {
  /* font-family: 'Inter'; */
  font-size: 2.5rem;
  line-height: 3rem;
}

.buttonGroup {
  background-color: #b5b5b5;
  color: black;
}

.backgroundSelect {
  color: #000000 !important;
  /* font-size: 1.25rem !important; */
  font-weight: 700;
  padding: 0.375rem 0.375rem 0.375rem 0.375rem;
}

.backgroundBlueTransparent {
  background-color: #00c5c7 !important;
  border-radius: 10px;
}

input[type="date"] {
  color: #000000;
}

input::placeholder {
  color: #000000;
}

select::placeholder {
  color: #000000;
}

.form-control:focus {
  border-color: #d9d9d9 !important;
  box-shadow: 0 0 0 0.25rem rgb(173 181 189 / 50%);
}

.backgroundInput {
  background-color: #d9d9d9;
  border-radius: 10px;
}

button.backgroundBlueTransparent>span {
  display: flex;
  align-items: center;
  text-align: center;
}

.color-black {
  color: #000000 !important;
}
</style>
