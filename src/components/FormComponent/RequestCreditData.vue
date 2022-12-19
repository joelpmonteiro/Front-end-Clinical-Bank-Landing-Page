<!-- eslint-disable prettier/prettier -->
<template>
  <section class="container-fluid">
    <div class="d-flex justify-content-center row pt-3">
      <div class="col-12 col-sm-6 col-md-12 col-lg-5">
        <div class="text-center">
          <span class="text-color colorBlueTransparent">Dados do Solicitante Cartão de Crédito</span>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center row pt-3">
      <div class="col-12 col-sm-12 col-md-6 col-lg-3">
        <div class="text-center">
          <span class="fw-bold lh-1 color-black">Aceitamos os seguintes cartões:</span>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center row pt-3">
      <div class="col-12 col-sm-12 col-md-6 col-lg-3">
        <div class="text-center">
          <img width="300" loading="lazy" src="../../assets/paymentCard.svg" alt="clinical_crediCard" />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center row pt-3 text-center">
      <div class="col-12 col-sm-6 col-md-12 col-lg-7">
        <form id="formuser" method="post">
          <div class="col-9 col-sm-12 col-md-8 col-lg-8 d-inline-block mb-1">
            <div class="form-group mb-3">
              <input type="text" v-model="cardNumber"
                class="form-control text-center form-control-md backgroundInput fw-bold"
                placeholder="Número do Cartão" />
            </div>
          </div>

          <div class="col-9 col-sm-12 col-md-8 col-lg-8 d-inline-block mb-1">
            <div class="form-group mb-3">
              <input type="text" v-model="cardName"
                class="form-control text-center form-control-md backgroundInput fw-bold"
                placeholder="Nome do Solicitante no Cartão" />
            </div>
          </div>
          <div class="col-9 col-sm-12 col-md-8 col-lg-8 d-inline-block mb-1">
            <div class="form-group mb-3">
              <input type="text" v-model="cardDueDate"
                class="form-control text-center form-control-md backgroundInput fw-bold"
                placeholder="Data de Validade (MM/AA)" />
            </div>
          </div>
          <div class="col-9 col-sm-12 col-md-8 col-lg-8 d-inline-block mb-2">
            <div class="form-group mb-3">
              <input type="text" class="form-control text-center form-control-md backgroundInput fw-bold"
                placeholder="Código de Segurança (CVV)" v-model.lazy="cardcvv" />
            </div>
          </div>
          <div class="col-9 col-sm-12 col-md-8 col-lg-8 d-inline-block mb-2" style="text-align: initial">
            <p>
              Ao clicar no botão “Confirmar”, você concorda com a nossa política de
              desconto do valor ao não pagar a parcela do boleto ou recorrência em questão
            </p>
            <p>
              Confirma ter mais de 18 anos e aceita que a ClinicalBank renove
              automaticamente sua recorrência e cobre o valor parcela acima confirmada e
              assinada em contrato. >
            </p>
            <p>
              O valor de entrada não será devolvido em hipótese nenhuma, pois trata-se da
              utilização do software e serviços prestados pelo produto ofertado.
            </p>
          </div>
          <div class="mb-3">
            <button @click.prevent="approvedPayment"
              class="col-2 col-sm-2 col-md-2 col-lg-3 btn btn-md backgroundBlueTransparent text-white fw-bold"
              id="confirmedPayment" type="submit">
              <span class="spinner-border spinner-border-sm d-none"></span>
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import { computed, reactive, toRefs } from "vue";
import { makePaymentCardCredit } from "../../services/axios.js";

export default {
  name: "RequestCreditData",
  props: {
    paymentProps: {
      type: Object,
    },
  },
  setup(props) {
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
      const btn_loading = document.querySelector("#confirmedPayment");
      btn_loading.querySelector("span").classList.remove("d-none");
      try {
        if (
          paymentObj.cardDueDate !== "" ||
          paymentObj.cardName !== "" ||
          paymentObj.cardNumber !== "" ||
          paymentObj.cardcvv !== ""
        ) {
          if (sessionStorage.getItem("form-neurotech")) {
            // const jsonUserApproved = JSON.parse(
            //   sessionStorage.getItem("form-neurotech")
            // );
            const { dataCredit, userInf } = updateProps.value;


            //console.log(json);

            const { status } = await makePaymentCardCredit({
              installments: dataCredit.selectedParcel.installments,
              amount: dataCredit.selectedParcel.amount,
              installmentValue: dataCredit.selectedParcel.installmentValue,
              hash: dataCredit.selectedParcel.hash,
              valueClinicalBank: dataCredit.selectedParcel.valueClinicalBank,
              customer_id: userInf.costumer_id,
              company_id: "b00cd1fd-b20f-49f1-97a2-88407d36c7fd",
              user_id: "31b86d3e-9790-4b88-9846-c337f16f385c",
              card: {
                holder_name: paymentObj.cardName,
                card_expiration: paymentObj.cardDueDate,
                card_number: paymentObj.cardNumber,
                card_cvv: paymentObj.cardcvv,
                payment_method_code: "credit_card",
              },
            });

            if (status === 201) {
              alert("Pagamento feito com sucesso!");
            }
          }
        } else {
          alert("Preencha os dados do cartão de credito por favor!");
        }
      } catch (error) {
        console.log(error);
        alert("Erro ao efetuar o pagamento!");
      } finally {
        btn_loading.querySelector("span").classList.add("d-none");
      }
    };
    //onMounted(() => {});
    return { paymentCardCredit, approvedPayment, ...toRefs(paymentObj) };
  },
};
</script>
<style scoped>
.text-color {
  /* font-family: 'Inter'; */
  font-size: 3rem;
  line-height: 3rem;
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

/* button.backgroundBlueTransparent > span {
  display: flex;
  align-items: center;
  text-align: center;
} */

.color-black {
  color: #000000 !important;
}

p {
  align-items: center;
  text-align: justify;
  font-size: 0.8em;
  font-weight: 700;
  line-height: 0.95em;
}
</style>
