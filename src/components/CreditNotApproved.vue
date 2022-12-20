<template>
  <section class="container container-sm container-md container-lg">
    <div class="d-flex justify-content-center row">
      <div class="col-12 col-sm-10 col-md-6 col-lg-4">
        <span class="text-color colorBlueTransparent">Crédito Não Aprovado</span>
      </div>
    </div>
    <div class="d-flex justify-content-center row pt-3">
      <div class="col-12 col-sm-12 col-md-6 col-lg-3">
        <div class="text-center">
          <span class="fs-6 fw-bold lh-1 color-black"
            >Conforme analise não foi possível realizar a sua solicitação.</span
          >
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center pt-5 mb-4">
      <div class="">
        <img
          width="321"
          height="292"
          loading="lazy"
          src="../assets/creditNotApproved.png"
        />
      </div>
    </div>
    <div class="d-flex justify-content-center pt-5">
      <button
        @click="back"
        class="col-2 col-sm-2 col-md-2 col-lg-2 btn btn-sm bt backgroundBlueTransparent text-white fw-bold"
      >
        Voltar
      </button>
    </div>
  </section>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const back = async () => {
  router.go(0);
};
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

button.backgroundBlueTransparent > span {
  display: flex;
  align-items: center;
  text-align: center;
}

.color-black {
  color: #000000 !important;
}
</style>
