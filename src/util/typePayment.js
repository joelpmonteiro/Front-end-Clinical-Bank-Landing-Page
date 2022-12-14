export const typePayment = (
  type,
  { holder_name, card_cvv, card_expiration, card_number }
) => {
  console.log(type);
  if (type.name === "Pix")
    return { payment_method: "bank_slip_yapay", value: type.neurotech.value };
  if (type.name === "Débito")
    return { payment_method: "bank_slip_yapay", value: type.neurotech.value };
  if (type.name === "Transferência Bancária TED ou DOC")
    return { payment_method: "bank_slip_yapay", value: type.neurotech.value };
  if (type.name === "Cartão de Crédito") {
    return {
      payment_method: "credit_card",
      value: type.neurotech.value,
      payment_profile: {
        holder_name: holder_name,
        card_expiration: card_expiration,
        card_number: card_number,
        card_cvv: card_cvv,
      },
    };
  }
};
