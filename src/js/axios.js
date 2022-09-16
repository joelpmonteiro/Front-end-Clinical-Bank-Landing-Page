import axios from "axios";
import { data, formatDate } from "./neurotech";
import Swal from "sweetalert2";

const data_user = [
  {
    Name: "PROP_CPF",
    Value: null,
  },
  {
    Name: "PROP_DATA_NASCIMENTO",
    Value: null,
  },
  {
    Name: "PROP_NOME",
    Value: null,
  },
];

console.log("neurotechDados: ", data);

//const apiKey = "a967-a201-35c0-7352-9034b";
const api = axios.create({
  baseURL: "https://dr-clinicalbank-prd.neurotech.com.br/",
  headers: {
    "Content-type": "application/json",
    // "X-API-KEY": apiKey,
  },
});

function replaceExistDomSpan(msg, creditoAprovado) {
  if (creditoAprovado !== "" && creditoAprovado !== undefined)
    document.querySelector(
      ".sub-text-element"
    ).textContent = `${msg} ${creditoAprovado}`;
  else document.querySelector(".sub-text-element").textContent = `${msg}`;
}

function createElement(msg) {
  const span = document.createElement("span");
  span.textContent = `${msg}`;
  span.classList.add("sub-text-element");
  return span;
}

function createElementSpan(msg) {
  //const breakElement = document.createElement("br");
  const spaceCpf = document.querySelector(".space-cpf");
  spaceCpf
    .querySelector("#cpfdiv")
    .appendChild(createElement(msg[0] === "" ? "0.00" : msg[0]));
  spaceCpf.querySelector("#cpfdiv").appendChild(document.createElement("br"));
  spaceCpf
    .querySelector("#cpfdiv")
    .appendChild(createElement(msg[1] === "" ? "0.00" : msg[1]));
  spaceCpf.querySelector("#cpfdiv").appendChild(document.createElement("br"));
  //spaceCpf.querySelector("#cpfdiv").appendChild(createElement(msg[2]));
}

//Função para enviar os dados da consulta em nosso banco de dados ?
async function sendGetCardCreditDataUser({ data }) {
  try {
    const dataCreditCard = await api.post("endpointx", data);
  } catch (error) {
    console.log(error);
    alert("Erro ao enviar os dados para nosso banco e dados!");
  }
}

export function buttonClickGetCardCredit(elementBtn) {
  elementBtn.addEventListener("click", (el) => {
    el.preventDefault();
    const btn_loading = elementBtn.querySelector(
      ".spinner-border.spinner-border-sm"
    );
    //remove d-none
    btn_loading.classList.remove("d-none");
    try {
      const form = document.querySelector("#formCPF");
      const inputNome = form.querySelector(".form-control.border-radius.nome");
      const inputData = form.querySelector(".form-control.border-radius.data");
      const inputCPF = form.querySelector(".form-control.border-radius.cpf");
      const nDate = formatDate(new Date(inputData.value));
      if (
        inputCPF.value !== "" &&
        inputData.value !== "" &&
        inputNome.value !== ""
      ) {
        data_user[0].Value = inputCPF.value.replace(/\D/g, "");
        data_user[1].Value = inputData.value;
        data_user[2].Value = inputNome.value;
        data.Submit.Inputs = [...data_user];

        api
          .post("services/rest/workflow/submit", data)
          .then((result) => {
            const domExist = document.body.contains(
              document.querySelector(".sub-text-element")
            );
            console.log(domExist);
            if (
              result.status === 200 /*&&
              result.data.Result.Result !== "REPROVADO"*/
            ) {
              const { Outputs: outputs } = result.data.Result;
              const proposta = [];
              outputs.forEach((element) => {
                if (element.Key == "CALC_VALOR_CONTRATO") {
                  proposta.push({
                    name: "CALC_VALOR_CONTRATO",
                    value: element.Value,
                  });
                }

                if (element.Key == "CALC_VALOR_CONTRATO_FINAL") {
                  proposta.push({
                    name: "CALC_VALOR_CONTRATO_FINAL",
                    value: element.Value,
                  });
                }

                if (element.Key == "CALC_VALOR_PARCELA") {
                  proposta.push({
                    name: "CALC_VALOR_PARCELA",
                    value: element.Value,
                  });
                }

                if (element.Key == "CALC_VALOR_PARCELA_FINAL") {
                  proposta.push({
                    name: "CALC_VALOR_PARCELA_FINAL",
                    value: element.Value,
                  });
                }
              });

              if (!domExist) {
                createElementSpan([
                  `Credito Aprovado no momento: ${proposta[0].value}`,
                  `Valor das parcelas: ${proposta[2].value}`,
                ]);
                console.log("teste");
              } else {
                console.log("entoru aqui ");
                //replace text span
                replaceExistDomSpan(
                  "Credito Aprovado no momento:",
                  proposta[0].value
                );
              }
            } else {
              if (!domExist) {
                createElementSpan(`Não existe credito aprovado para seu cpf`);
              } else {
                replaceExistDomSpan("Não existe credito aprovado para seu cpf");
              }
              //caso exista um elemento span eu so dou um replace na msg
              //
            }
          })
          .catch((err) => {
            alert("Erro ao pesquisar dados");
            console.log(err);
            form.removeAttribute("style");
          })
          .finally(() => {
            btn_loading.classList.add("d-none");
          });
      } else {
        alert("Preencha os campos corretamente!");
      }
    } catch (error) {
      console.log(error);
      alert("Erro ao consultar credito aprovado");
    }
  });
}
