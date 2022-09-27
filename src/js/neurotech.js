export const data = {
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

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export function formatDate(date) {
  return [
    padTo2Digits(date.getUTCDate()),
    padTo2Digits(date.getUTCMonth() + 1),
    date.getUTCFullYear(),
  ].join("/");
}

export function mascara(i) {
  //MaxLength Input
  i.setAttribute("maxlength", "14");
  i.addEventListener("input", (inputCpf) => {
    let v = i.value;
    if (isNaN(v[v.length - 1])) {
      // impede entrar outro caractere que não seja número
      i.value = v.substring(0, v.length - 1);
      return;
    }
    // i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
  });
}
