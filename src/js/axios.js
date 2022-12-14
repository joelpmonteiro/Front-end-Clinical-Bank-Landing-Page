import axios from "axios";
import { data, formatDate } from "./neurotech";

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
  // {
  //   Name: "PROP_CPF_BOAVISTA",
  //   Value: "01183363125",
  // },
];
//13767294826
const api = axios.create({
  baseURL: "https://dr-clinicalbank-prd.neurotech.com.br/",
  headers: {
    "Content-type": "application/json",
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
  //DivGeral
  const spaceCpf = document.querySelector(".space-cpf");
  //Div
  const divElement = document.createElement("div");
  divElement.setAttribute("class", "user-approvedOrNot");
  divElement.appendChild(createElement(msg[0] === "" ? "0.00" : msg[0]));
  divElement.appendChild(document.createElement("br"));
  //
  spaceCpf.querySelector("#cpfdiv").appendChild(divElement);

  if (msg[1] !== "" && msg[1] !== undefined) {
    divElement.appendChild(createElement(msg[1] === "" ? "0.00" : msg[1]));
    divElement.appendChild(document.createElement("br"));
    spaceCpf.querySelector("#cpfdiv").appendChild(divElement);
  }
}

function removeElementDom() {
  document.querySelector(".user-approvedOrNot").remove();
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
      const sectionId = document.querySelector("#cardCredit");

      if (
        inputCPF.value !== "" &&
        inputData.value !== "" &&
        inputNome.value !== ""
      ) {
        data_user[0].Value = inputCPF.value.replace(/\D/g, "");
        data_user[1].Value = nDate;
        data_user[2].Value = inputNome.value;
        data.Submit.Inputs = [...data_user];

        api
          .post("services/rest/workflow/submit", data)
          .then((result) => {
            const domExist = document.body.contains(
              document.querySelector(".sub-text-element")
            );
            if (
              result.status === 200 &&
              result.data.Result.Result !== "REPROVADO"
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
                  `Credito Aprovado no momento: R$${proposta[0].value}`,
                  `Valor das parcelas: R$${proposta[2].value}`,
                ]);
              } else {
                const containsDiv = document.body.contains(
                  document.querySelector(".user-approvedOrNot")
                );

                if (containsDiv) {
                  removeElementDom();
                  createElementSpan([
                    `Credito Aprovado no momento: R$${proposta[0].value}`,
                    `Valor das parcelas: R$${proposta[2].value}`,
                  ]);
                } else {
                  //replace text span
                  replaceExistDomSpan(
                    "Credito Aprovado no momento: R$",
                    proposta[0].value
                  );
                }
              }

              //sectionId.setAttribute("style", "display:flex");
            } else {
              //sectionId.setAttribute("style", "display:none");

              if (!domExist) {
                createElementSpan([
                  "Conforme analise n??o foi poss??vel realizar a solicita????o",
                ]);
              } else {
                const existDiv = document.querySelectorAll(".sub-text-element");
                if (existDiv.length >= 2) {
                  removeElementDom();
                  createElementSpan([
                    "Conforme analise n??o foi poss??vel realizar a solicita????o",
                  ]);
                } else {
                  replaceExistDomSpan([
                    "Conforme analise n??o foi poss??vel realizar a solicita????o",
                  ]);
                }
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
