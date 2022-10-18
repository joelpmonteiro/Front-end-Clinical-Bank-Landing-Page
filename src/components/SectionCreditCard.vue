<template>
  <section
    style="'display: none"
    class="container container-sm container-md container-lg my-5"
  >
    <div class="row text-center">
      <div class="col-12 col-sm-6 col-md-12 col-lg-12">
        <span class="text-color"
          >Informe os dados do seu cartão de crédito:</span
        >
        <div class="row mt-2">
          <div class="d-flex justify-content-center my-2">
            <span
              >Adicionar outro cartão ?
              <button
                class="btn btn-primary btn-sm"
                type="submit"
                style="
                  padding: 0.01rem 0.2rem;
                  border-radius: 0.2em;
                  font-size: 0.8em;
                "
              >
                +
              </button>
            </span>
          </div>
          <p style="color: red">Todos os campos são obrigatórios/necessários</p>
          <div class="mb-2">
            <p>Aceitamos os seguintes cartões</p>
            <img
              alt="card_credit"
              loading="lazy"
              src="../assets/img/card_credit.png"
            />
          </div>
          <div class="d-flex justify-content-center" id="cardCreditDiv">
            <form id="formCredit" method="post">
              <div class="col-12 col-sm-12 col-md-6 d-inline-block mb-3">
                <div class="form-group mb-3">
                  <input
                    type="text"
                    v-model="cardNumber"
                    class="form-control border-radius numero"
                    placeholder="Número do cartão"
                    aria-label="Número do cartão"
                    aria-describedby="basic-addon2"
                  />
                </div>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    v-model="cardName"
                    class="form-control border-radius nome"
                    placeholder="Nome do cartão"
                    aria-label="Nome do cartão"
                    aria-describedby="basic-addon2"
                  />
                </div>
                <div class="form-group row">
                  <div class="col-6">
                    <input
                      type="text"
                      v-model="cardDueDate"
                      class="form-control border-radius cpf"
                      placeholder="MM/AA"
                      aria-label="MM/AA"
                      aria-describedby="basic-addon2"
                    />
                  </div>
                  <div class="col-6">
                    <input
                      type="text"
                      v-model="cardcvv"
                      class="form-control border-radius cvv"
                      placeholder="CVV"
                      aria-label="CVV"
                      aria-describedby="basic-addon2"
                    />
                  </div>
                </div>
              </div>
              <div
                class="
                  col-12 col-sm-12 col-md-8
                  fs-6
                  fw-normal
                  text-muted
                  d-inline-block
                "
                style="font-size: 15px !important"
              >
                <p>
                  Ao clicar no botão “Confirmar”, você concorda com a nossa
                  política de desconto do valor ao não pagar a parcela do boleto
                  ou recorrência em questão
                </p>
                <p>
                  Confirma ter mais de 18 anos e aceita que a
                  <strong
                    >ClinicalBank renove automaticamente sua recorrência e cobre
                    o valor parcela acima confirmada e assinada em
                    contrato.</strong
                  >
                </p>
                <p>
                  O valor de entrada não será devolvido em hipótese nenhuma,
                  pois trata-se da utilização do software e serviços prestados
                  pelo produto ofertado.
                </p>
              </div>
              <div class="col-12 p-2 mb-3">
                <button
                  @click.prevent="approvedPayment"
                  class="btn txt-background text-white"
                  type="submit"
                  id="button-addon2"
                  style="margin-left: -10px; border-radius: 12px"
                >
                  <span class="spinner-border spinner-border-sm d-none"></span
                  >Confirmar Pagamento
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import { makePaymentCardCredit } from "../services/axios";
export default {
  name: "sectionCreditCard",
  props: {
    paymentProps: {
      type: Object,
    },
  },
  setup(props) {
    console.log("props que vão ser enviadas: ", props);
    // eslint-disable-next-line vue/no-setup-props-destructure
    //const datasetup = props.paymentProps;

    const paymentObj = reactive({
      cardcvv: "",
      cardDueDate: "",
      cardName: "",
      cardNumber: "",
    });
    const paymentCardCredit = async () => {
      try {
        console.log(paymentObj);
        // const response = await makePaymentCardCredit(paymentObj);
        // console.log(response);
      } catch (error) {
        console.log("teste:", error);
      }
    };

    const updateProps = computed(() => {
      return props.paymentProps;
    });
    const approvedPayment = async () => {
      try {
        if (
          paymentObj.cardDueDate !== "" ||
          paymentObj.cardName !== "" ||
          paymentObj.cardNumber !== "" ||
          paymentObj.cardcvv !== ""
        ) {
          if (sessionStorage.getItem("form-neurotech")) {
            const jsonUserApproved = JSON.parse(
              sessionStorage.getItem("form-neurotech")
            );
            const { dataCredit, userInf, neurotech } = updateProps.value;

            const valueNeurotech = neurotech.find(
              (value) => value.name === "CALC_VALOR_CONTRATO"
            );
            const calValue = dataCredit.valueTotal - valueNeurotech.value;

            const json = {
              name: jsonUserApproved.find((value) => value.Name === "PROP_NOME")
                .Value,
              cpf: jsonUserApproved.find((value) => value.Name === "PROP_CPF")
                .Value,
              email: userInf.email,
              address: { ...userInf.address },
              installments: dataCredit.selectedParcel,
              financing_amount: neurotech.find(
                (value) => value.name === "CALC_VALOR_CONTRATO"
              ).value,
              max_amount_installment: neurotech.find(
                (value) => value.name === "CALC_VALOR_PARCELA"
              ).value,
              selected_options: [
                {
                  payment_method: "credit_card",
                  value: valueNeurotech.value,
                  payment_profile: {
                    holder_name: paymentObj.cardName,
                    card_expiration: paymentObj.cardDueDate,
                    card_number: paymentObj.cardNumber,
                    card_cvv: paymentObj.cardcvv,
                  },
                },
              ],
            };

            const { data, status } = await makePaymentCardCredit(json);

            if (status === 200 && data.code === 200) {
              alert("Pagamento feito com sucesso!");
            }
          }
        } else {
          alert("Preencha os dados do cartão de credito por favor!");
        }
      } catch (error) {
        console.log(error);
        alert("Erro ao efetuar o pagamento!");
      }
    };
    //onMounted(() => {});
    return { paymentCardCredit, approvedPayment, ...toRefs(paymentObj) };
  },
};
</script>

<style>
</style>
