import axios from "axios";

const apiKey = "a967-a201-35c0-7352-9034b";
const api = axios.create({
  baseURL: "https://cdc.clinicalbank.com.br/apiv1/",
  headers: {
    "Content-type": "application/json",
    "X-API-KEY": apiKey,
  },
});

function replaceExistDomSpan(msg, creditoAprovado) {
  if (creditoAprovado !== "" && creditoAprovado !== undefined)
    document.querySelector(
      ".sub-text-element"
    ).textContent = `${msg} ${creditoAprovado}`;
  else document.querySelector(".sub-text-element").textContent = `${msg}`;
}

function createElementSpan(msg) {
  const span = document.createElement("span");
  span.textContent = `${msg}`;
  span.classList.add("sub-text-element");
  const spaceCpf = document.querySelector(".space-cpf");
  spaceCpf.querySelector("#cpfdiv").appendChild(span);
}

// function checkIfExistClassSub_text_element(creditoAprovado) {
//   const domExist = document.body.contains(
//     document.querySelector(".sub-text-element")
//   );

//   if (!domExist) {
//     createElementSpan(`Credito Aprovado no momento: ${creditoAprovado}`);
//     //
//   } else {
//     //replace text span
//     replaceExistDomSpan(creditoAprovado);
//   }
// }

export function buttonClickGetCardCredit(elementBtn) {
  elementBtn.addEventListener("click", (el) => {
    el.preventDefault();
    try {
      const form = document.querySelector("#formCPF");
      const input = form.querySelector(".form-control.border-radius");
      const cpf = input.value;

      const data = cpf.replace(/\D/g, "");
      api
        .get(`loan/buscarPorCPF/${data}`)
        .then((result) => {
          //verifica se o element existe na tela
          const domExist = document.body.contains(
            document.querySelector(".sub-text-element")
          );

          if (result.data.sucesso && result.data.codigo === 200) {
            //Valor desestruturado
            const { valor_aprovado, valor_aprovado_string } =
              result.data.proposta;

            const creditoAprovado = valor_aprovado_string;

            if (!domExist) {
              createElementSpan(
                `Credito Aprovado no momento: ${creditoAprovado}`
              );
              //
            } else {
              //replace text span
              replaceExistDomSpan(
                "Credito Aprovado no momento:",
                creditoAprovado
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
        .catch((error) => {
          form.removeAttribute("style");
          console.log(error);
          alert("Erro ao consultar credito aprovado");
        });
    } catch (error) {
      console.log(error);
      alert("Erro ao consultar credito aprovado");
    }
  });
}
