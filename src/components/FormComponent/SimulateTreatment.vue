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
            <input type="text" v-model.lazy="data_user.name"
              class="form-control text-center form-control-lg backgroundInput" placeholder="digite seu nome" />
          </div>
          <div class="input-group mb-3">
            <input type="date" v-model.lazy="data_user.birth_date"
              class="form-control text-center fw-normal form-control-lg backgroundInput" placeholder="" />
          </div>
          <div class="input-group mb-3">
            <input style="padding-left: 0px" type="text"
              class="form-control text-center form-control-lg backgroundInput" placeholder="digite seu cpf"
              maxlength="14" v-model="data_user.registry_code" v-on:input="mascara" />
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
import { postDataNeurotech } from "../../services/axios.js";
import { formatDate } from "../../services/neurotech.js";
import LayoutImgVue from "../LayoutImg.vue";
const emit = defineEmits(["sendGetData"]);

const data_user = ref({
  registry_code: "434.466.418-31",
  birth_date: null,
  name: "Caique de Souza Boas",
});
const proposta = ref([]);

//Starter Function
const sendDataNeurotech = async () => {
  // eslint-disable-next-line prettier/prettier
  const btn_loading = document.querySelector(".spinner-border.spinner-border-sm");
  try {
    btn_loading.classList.remove("d-none");
    const userData = toRaw(data_user.value);
    const newDate = formatDate(new Date(data_user.value.birth_date));
    userData.birth_date = newDate;
    userData.registry_code = userData.registry_code.replace(/\D/g, "");
    //sendForm.Submit.Inputs = userData;

    const { data, status } = await postDataNeurotech(userData);
    console.log({ data, status });
    if (status === 200 && data.result === "APROVADO") {
      proposta.value.push({
        name: "Credito_Aprovado",
        value: data,
      });
      sessionStorage.setItem("form-neurotech", JSON.stringify(data_user.value));
      emit("sendGetData", proposta, true);
    } else {
      console.log('entrou')
      emit("sendGetData", [], false);
    }
  } catch (error) {
    console.log(error);
    //alert("Erro ao pesquisar em nossos serviços!");
  } finally {
    btn_loading.classList.add("d-none");
  }
};

function mascara() {
  //MaxLength Input
  let v = data_user.value.registry_code;
  if (isNaN(v[v.length - 1])) {
    // impede entrar outro caractere que não seja número
    data_user.value.registry_code = v.substring(0, v.length - 1);
    return;
  }
  // i.setAttribute("maxlength", "14");
  if (v.length == 3 || v.length == 7) data_user.value.registry_code += ".";
  if (v.length == 11) data_user.value.registry_code += "-";
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
