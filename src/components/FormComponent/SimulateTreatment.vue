<!-- eslint-disable prettier/prettier -->
<template>
  <main class="container-fluid">
    <div class="row ms-lg-5 pt-4">
      <div class="col-12 col-sm-10 col-md-6 col-lg-4">
        <span class="text-color colorBlueTransparent">Simule o seu tratamento</span>
      </div>
    </div>
    <div class="row ms-lg-5 pt-2">
      <div class="col-12 col-sm-10 col-md-6 col-lg-4">
        <span class="fs-6 fw-bold lh-1 color-black">Consulte Crédito do seu CPF</span>
      </div>

    </div>

    <div class="d-flex justify-content-between row ms-lg-5 pt-2">

      <div class="col-10 col-sm-6 col-md-6 col-lg-4">
        <form id="formCPF" method="post" @submit.prevent="sendDataNeurotech">
          <div class="input-group mb-3">
            <input type="text" v-model.lazy="data_user[2].Value"
              class="form-control text-center form-control-lg backgroundInput" placeholder="digite seu nome" />
          </div>
          <div class="input-group mb-3">
            <input type="date" v-model.lazy="data_user[1].Value"
              class="form-control text-center fw-normal form-control-lg backgroundInput" placeholder="teste" />
          </div>
          <div class="input-group mb-3">
            <input style="padding-left: 0px" type="text"
              class="form-control text-center form-control-lg backgroundInput" placeholder="digite seu cpf"
              maxlength="14" v-model="data_user[0].Value" v-on:input="mascara" />
          </div>

          <div class="row ms-auto">
            <button class="col-8 btn btn-sm backgroundBlueTransparent text-white fw-bold" type="submit">
              <span class="spinner-border spinner-border-sm d-none"></span>
              Consultar
            </button>
          </div>
        </form>
      </div>
      <LayoutImgVue />


    </div>

  </main>
</template>

<script setup>
import { ref, toRaw } from "vue";
import { postDataNeurotech } from "../../services/axios";
import { formatDate } from "../../services/neurotech";
import LayoutImgVue from "../LayoutImg.vue";
const emit = defineEmits(["sendGetData"]);
const sendForm = {
  Submit: {
    Id: new Date().getTime(),
    Inputs: [],
    Policy: "CLINICAL_BANK_PRONTO",
    ResultingVariable: "FLX_PRINCIPAL",
    Version: "V2.0",
  },
  Authentication: {
    Login: import.meta.env.VITE_AuthenticationLogin,
    Password: import.meta.env.VITE_AuthenticationPassword,
    Properties: [
      {
        Key: "FILIAL_ID",
        Value: "0",
      },
    ],
  },
  Properties: [
    {
      Key: "USUARIO",
      Value: "CLINICAL_BANK_API",
    },
  ],
};
const data_user = ref([
  {
    Name: "PROP_CPF",
    Value: "434.466.418-31",
  },
  {
    Name: "PROP_DATA_NASCIMENTO",
    Value: null,
  },
  {
    Name: "PROP_NOME",
    Value: "Caique de Souza Boas",
  },
]);
const proposta = ref([]);
// const cpf = ref("");

//Starter Function
const sendDataNeurotech = async () => {
  // eslint-disable-next-line prettier/prettier
  const btn_loading = document.querySelector(".spinner-border.spinner-border-sm");
  try {
    btn_loading.classList.remove("d-none");
    const userData = toRaw(data_user.value);
    const newDate = formatDate(new Date(data_user.value[1].Value));
    userData[1].Value = newDate;
    userData[0].Value = userData[0].Value.replace(/\D/g, "");
    sendForm.Submit.Inputs = userData;

    const { data, status } = await postDataNeurotech(sendForm);

    if (status === 200 && data.Result.Result !== "REPROVADO") {
      const { Outputs: outputs } = data.Result;
      outputs.forEach((element) => {
        if (element.Key == "CALC_VALOR_CONTRATO") {
          proposta.value.push({
            name: "CALC_VALOR_CONTRATO",
            value: element.Value,
          });
        }

        if (element.Key == "CALC_VALOR_CONTRATO_FINAL") {
          proposta.value.push({
            name: "CALC_VALOR_CONTRATO_FINAL",
            value: element.Value,
          });
        }

        if (element.Key == "CALC_VALOR_PARCELA") {
          proposta.value.push({
            name: "CALC_VALOR_PARCELA",
            value: element.Value,
          });
        }

        if (element.Key == "CALC_VALOR_PARCELA_FINAL") {
          proposta.value.push({
            name: "CALC_VALOR_PARCELA_FINAL",
            value: element.Value,
          });
        }
      });

      sessionStorage.setItem("form-neurotech", JSON.stringify(data_user.value));
      emit("sendGetData", proposta, true);
    } else {
      emit("sendGetData", [], false);
    }
  } catch (error) {
    console.log(error);
    alert("Erro ao pesquisar em nossos serviços!");
  } finally {
    btn_loading.classList.add("d-none");
  }
};

function mascara() {
  //MaxLength Input
  let v = data_user.value[0].Value;
  if (isNaN(v[v.length - 1])) {
    // impede entrar outro caractere que não seja número
    data_user.value[0].Value = v.substring(0, v.length - 1);
    return;
  }
  // i.setAttribute("maxlength", "14");
  if (v.length == 3 || v.length == 7) data_user.value[0].Value += ".";
  if (v.length == 11) data_user.value[0].Value += "-";
}
//End Function
</script>

<style scoped>
.text-color {
  /* font-family: 'Inter'; */
  font-size: 32px;
  line-height: 39px;
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

.form-control:focus {
  border-color: #d9d9d9 !important;
  box-shadow: 0 0 0 0.25rem rgb(173 181 189 / 50%);
}

.backgroundInput {
  background: #d9d9d9;
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
</style>
