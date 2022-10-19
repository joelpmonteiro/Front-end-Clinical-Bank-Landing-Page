<template>
  <section
    class="container container-sm container-md container-lg"
    style="display: none"
    :style="checkSavedInfor"
  >
    <div class="row text-center">
      <div class="col-12 col-sm-6 col-md-12 col-lg-12">
        <span class="text-color">Informe os dados do usuário</span>
        <div class="row mt-2">
          <div class="d-flex justify-content-center" id="cardCreditDiv">
            <form id="formuser" method="post">
              <div class="col-12 col-sm-12 col-md-8 d-inline-block mb-3">
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control border-radius"
                    placeholder="Digite seu Email"
                    v-model="email"
                  />
                </div>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control border-radius"
                    placeholder="Endereço"
                    v-model="address.street"
                  />
                </div>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control border-radius"
                    placeholder="CEP"
                    v-model="address.zipcode"
                  />
                </div>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control border-radius"
                    placeholder="Bairro"
                    v-model="address.neighborhood"
                  />
                </div>
                <div class="form-group row">
                  <div class="col-6 mb-3">
                    <input
                      type="text"
                      class="form-control border-radius"
                      placeholder="Número"
                      v-model="address.number"
                    />
                  </div>
                  <div class="col-6 mb-3">
                    <input
                      type="text"
                      class="form-control border-radius"
                      placeholder="Complemento (Opcional)"
                      v-model="address.complement"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="mb-2">
                    <label for="country" class="d-flex"
                      >Selecione um País</label
                    >
                    <div class="col-12">
                      <select
                        class="form-select form-select-md"
                        name="country"
                        id="country"
                        v-model="selectedCountry"
                      >
                        <option value="-1" selected disabled>
                          Selecione um País
                        </option>
                        <option
                          v-for="(value, index) in country"
                          :key="index"
                          :value="value.sortname"
                        >
                          {{ value.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-2" v-if="selectedCountry !== -1">
                    <label for="state" class="d-flex"
                      >Selecione um Estado</label
                    >

                    <div class="col-12">
                      <select
                        class="form-select form-select-md"
                        name="state"
                        id="state"
                        v-model.number="selectedState"
                      >
                        <option value="-1" selected disabled>
                          Selecione um Estado
                        </option>
                        <option
                          v-for="(value, index) in compState"
                          :key="index"
                          :value="value.id"
                        >
                          {{ value.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-2" v-if="selectedState !== -1">
                    <label for="city" class="d-flex">Selecione um cidade</label>
                    <div class="col-12">
                      <select
                        class="form-select form-select-md"
                        name="city"
                        id="city"
                        v-model.number="selectedCity"
                      >
                        <option value="-1" selected disabled>
                          Selecione uma cidade
                        </option>
                        <option
                          v-for="(value, index) in compCity"
                          :key="index"
                          :value="value.id"
                        >
                          {{ value.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="">
                <button
                  @click.prevent="dataUserFunction"
                  class="btn btn-primary btn-lg txt-background text-white"
                  type="submit"
                  style="margin-left: -10px; border-radius: 12px"
                >
                  <span class="spinner-border spinner-border-sm d-none"></span>
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive, toRefs, computed, ref } from "vue";
import { country } from "../services/country.js";
import { state } from "../services/state.js";
import { city } from "../services/cities.js";
export default {
  // props: {
  //   paymentProps: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  setup(props, { emit }) {
    let checkSavedInfor = ref("");
    const arrayDados = reactive({
      country: country,
      city: city,
      state: state,
    });
    const selectedObj = reactive({
      email: "",
      address: {
        street: "",
        zipcode: "",
        neighborhood: "",
        number: "",
        complement: "",
      },
      selectedCountry: -1,
      selectedState: -1,
      selectedCity: -1,
    });

    const dataUserFunction = () => {
      if (
        selectedObj.email !== "" ||
        selectedObj.address.street !== "" ||
        selectedObj.address.zipcode !== "" ||
        selectedObj.address.neighborhood !== "" ||
        selectedObj.address.number !== "" ||
        selectedObj.address.complement !== "" ||
        selectedObj.selectedCity !== -1 ||
        selectedObj.selectedCountry !== -1 ||
        selectedObj.selectedState !== -1
      ) {
        checkSavedInfor.value = "display: none";
        emit("emit-send-data-user", selectedObj, { checkForm: true });
      } else {
        alert("Preencha os dados corretamente!");
      }
    };

    //computed
    const compCountrySelected = computed(() => {
      return arrayDados.country.filter(
        (value) => value.sortname === selectedObj.selectedCountry
      );
    });

    const compState = computed(() => {
      const [country] = compCountrySelected.value;
      return arrayDados.state.filter((value) =>
        selectedObj.selectedCountry === -1
          ? value.country_id
          : parseInt(value.country_id) === country.id
      );
    });
    const compCity = computed(() => {
      console.log(selectedObj.selectedState);
      return arrayDados.city.filter((value) =>
        selectedObj.selectedState === -1
          ? value.state_id
          : parseInt(value.state_id) === selectedObj.selectedState
      );
    });

    return {
      ...toRefs(selectedObj),
      dataUserFunction,
      ...toRefs(arrayDados),
      compState,
      compCity,
      checkSavedInfor,
    };
  },
};
</script>

<style></style>
