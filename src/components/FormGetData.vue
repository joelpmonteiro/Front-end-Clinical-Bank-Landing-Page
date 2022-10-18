<template>
  <div class="row">
    <div class="col-12 col-sm-10 col-md-6 col-lg-10">
      <span class="text-color">Consulte o Crédito do seu CPF</span>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-sm-12 col-md-6 col-lg-10">
      <div class="text-width pt-3">
        <span class="sub-text"> Simule o seu tratamento</span>
      </div>
    </div>
  </div>
  <div class="row space-cpf">
    <div class="col-10 col-sm-6 col-md-6 col-lg-8" id="cpfdiv">
      <form id="formCPF" method="post" @submit.prevent="sendDataNeurotech">
        <div class="input-group mb-3">
          <input
            type="text"
            v-model.lazy="data_user[2].Value"
            class="form-control border-radius nome"
            placeholder="Digite seu nome"
            aria-label="digite seu nome"
            aria-describedby="basic-addon2"
          />
        </div>
        <div class="input-group mb-3">
          <input
            type="date"
            v-model.lazy="data_user[1].Value"
            class="form-control border-radius data"
            placeholder="DD/MM/YYYY"
            aria-label="digite data de nascimento"
            aria-describedby="basic-addon2"
          />
        </div>
        <div class="input-group mb-3">
          <input
            type="text"
            v-model="data_user[0].Value"
            class="form-control border-radius cpf"
            placeholder="Digite seu cpf"
            aria-label="digite seu cpf"
            maxlength="14"
            v-on:input="mascara"
          />
        </div>

        <div class="p-2 mb-3">
          <button
            class="btn txt-background text-white"
            type="submit"
            id="button-addon2"
            style="margin-left: -10px; border-radius: 12px"
          >
            <span class="spinner-border spinner-border-sm d-none"></span>
            Consultar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, toRaw } from "vue";
import { postDataNeurotech } from "../services/axios";
import { formatDate } from "../services/neurotech";
export default defineComponent({
  name: "FormGetDataNeurotech",
  emits: ["sendGetData"],

  // eslint-disable-next-line vue/no-setup-props-destructure
  setup(props, { emit }) {
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
        Value: "",
      },
      {
        Name: "PROP_DATA_NASCIMENTO",
        Value: null,
      },
      {
        Name: "PROP_NOME",
        Value: null,
      },
    ]);
    const proposta = ref([]);
    const sendDataNeurotech = async () => {
      const btn_loading = document.querySelector(
        ".spinner-border.spinner-border-sm"
      );
      try {
        btn_loading.classList.remove("d-none");
        const userData = toRaw(data_user.value);
        const newDate = formatDate(new Date(data_user.value[1].Value));
        userData[1].Value = newDate;
        userData[0].Value = userData[0].Value.replace(/\D/g, "");
        console.log("cpf: ", userData[0].Value.replace(/\D/g, ""));
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

          sessionStorage.setItem(
            "form-neurotech",
            JSON.stringify(data_user.value)
          );
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

    const cpf = ref("");
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
    return { sendDataNeurotech, data_user, proposta, cpf, mascara };
  },
});
</script>

<style></style>
