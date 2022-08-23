import axios from "axios";

const apiKey = "a967-a201-35c0-7352-9034b";
const api = axios.create({
  baseURL: "https://cdc.clinicalbank.com.br/apiv1/",
  headers: {
    "Content-type": "application/json",
    "X-API-KEY": apiKey,
  },
});
// api.get("/orgs/octo-org/repos").then((result) => {
//   console.log(result);
// });
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
          const { valor_aprovado, valor_aprovado_string } =
            result.data.proposta;
          const creditoAprovado = valor_aprovado_string;
          // form.setAttribute("style", "display:none");
          const span = document.createElement("span");
          span.textContent = `Credito Aprovado no momento: ${creditoAprovado}`;
          span.classList.add("sub-text-element");
          const spaceCpf = document.querySelector(".space-cpf");
          spaceCpf.querySelector("#cpfdiv").appendChild(span);
        })
        .catch((error) => {
          form.removeAttribute("style");
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  });
  // element.addEventListener("click", (el) => {
  //   try {
  //     console.log(el);
  //     // const data = cpf.replace(/\D/g, "");
  //     // api.get(`loan/buscarPorCPF/${data}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
}
