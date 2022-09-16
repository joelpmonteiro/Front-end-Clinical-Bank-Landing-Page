export const data = {
  Submit: {
    Id: new Date().getTime(),
    Inputs: [],
    Policy: "CLINICAL_BANK_PRONTO",
    ResultingVariable: "FLX_PRINCIPAL",
    Version: "V2.0",
  },
  Authentication: {
    Login: env.VITE_AuthenticationLogin,
    Password: env.VITE_AuthenticationPassword,
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
