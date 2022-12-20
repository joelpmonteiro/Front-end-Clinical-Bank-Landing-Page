<!-- eslint-disable prettier/prettier -->
<template>
  <section class="container container-sm container-md container-lg">
    <div class="row text-center">
      <div class="col-12 col-sm-6 col-md-12 col-lg-12">
        <span class="text-color colorBlueTransparent">Dados do Solicitante</span>
        <div class="row mt-2">
          <div class="d-flex justify-content-center" id="cardCreditDiv">
            <form id="formuser" method="post">
              <div class="col-9 col-sm-12 col-md-8 col-lg-8 d-inline-block mb-1">
                <div class="form-group mb-3">
                  <input
                    type="text"
                    v-model="email"
                    class="form-control text-center form-control-md backgroundInput fw-bold"
                    placeholder="Digite seu Email"
                  />
                </div>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control text-center form-control-md backgroundInput fw-bold"
                    placeholder="Endereço"
                    v-model="address.street"
                  />
                </div>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control text-center form-control-md backgroundInput fw-bold"
                    placeholder="CEP"
                    v-model="address.zipcode"
                  />
                </div>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control text-center form-control-md backgroundInput fw-bold"
                    placeholder="Bairro"
                    v-model="address.neighborhood"
                  />
                </div>
                <div class="form-group row">
                  <div class="col-5 mb-3">
                    <input
                      type="text"
                      class="form-control text-center form-control-md backgroundInput fw-bold"
                      placeholder="Número"
                      v-model="address.number"
                    />
                  </div>
                  <div class="col-7 mb-3">
                    <input
                      type="text"
                      class="form-control text-center form-control-md backgroundInput fw-bold"
                      placeholder="Complemento"
                      v-model="address.complement"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-12 mb-3">
                    <input
                      type="text"
                      class="form-control text-center form-control-md backgroundInput fw-bold"
                      placeholder="Telefone"
                      v-model="address.cell_number"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="mb-2">
                    <label for="country" class="text-center fs-6 fw-bold lh-1 color-black"
                      >Selecione um País</label
                    >
                    <div class="col-12">
                      <select
                        v-model="selectedCountry"
                        class="form-select form-select-md backgroundSelect backgroundInput fw-bold text-center"
                        name="country"
                        id="country"
                        @change="getAllStateFunc"
                      >
                        <option value="-1" selected disabled>Selecione um País</option>
                        <option
                          v-for="(value, index) in country"
                          :key="index"
                          :value="value.id"
                        >
                          {{ value.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-2">
                    <label for="state" class="text-center fs-6 fw-bold lh-1 color-black"
                      >Selecione um Estado</label
                    >

                    <div class="col-12">
                      <select
                        class="form-select form-select-md backgroundSelect backgroundInput fw-bold text-center"
                        name="state"
                        id="state"
                        v-model="selectedState"
                        @change="getStateByCountryFunc"
                      >
                        <option value="-1" selected disabled>Selecione um Estado</option>
                        <option
                          v-for="(value, index) in state"
                          :key="index"
                          :value="value.id"
                        >
                          {{ value.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-2">
                    <label for="city" class="text-center fs-6 fw-bold lh-1 color-black"
                      >Selecione um cidade</label
                    >
                    <div class="col-12">
                      <select
                        class="form-select form-select-md backgroundSelect backgroundInput fw-bold text-center"
                        name="city"
                        id="city"
                        v-model="selectedCity"
                      >
                        <option value="-1" selected disabled>Selecione uma Cidade</option>
                        <option
                          v-for="(value, index) in city"
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
                  class="col-2 col-sm-2 col-md-2 col-lg-3 btn btn-md backgroundBlueTransparent text-white fw-bold"
                  type="submit"
                  @click.prevent="dataUserFunction"
                >
                  <span class="spinner-border spinner-border-sm d-none"></span>
                  Próximo
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
import { toRefs, ref, reactive, computed } from "vue";
import { country } from "../../services/country.js";
// import { state } from "../../services/state.js";
// import { city } from "../../services/cities.js";
import { requestDataUser, getAllState, getStateByCountry } from "../../services/axios.js";
import { useRouter } from "vue-router";
export default {
  name: "RequestData",
  setup(props, { emit }) {
    const router = useRouter();
    let checkSavedInfor = ref("");
    const arrayDados = reactive({
      country: country,
      city: [],
      state: [],
    });
    const selectedObj = reactive({
      email: "",
      address: {
        street: "",
        zipcode: "",
        neighborhood: "",
        number: "",
        complement: "",
        cell_number: "",
      },
      selectedCountry: -1,
      selectedState: -1,
      selectedCity: -1,
      costumer_id: -1,
    });

    const dataUserFunction = async () => {
      try {
        if (
          selectedObj.email !== "" ||
          selectedObj.address.street !== "" ||
          selectedObj.address.zipcode !== "" ||
          selectedObj.address.neighborhood !== "" ||
          selectedObj.address.number !== "" ||
          selectedObj.address.complement !== "" ||
          selectedObj.address.cell_number !== "" ||
          selectedObj.selectedCountry !== -1 ||
          selectedObj.selectedState !== -1
        ) {
          checkSavedInfor.value = "display: none";

          const user_approved = JSON.parse(sessionStorage.getItem("form-neurotech"));

          const split_date = user_approved.birth_date.split("/");
          const new_format_data = `${split_date[2]}/${split_date[1]}/${split_date[0]}`;
          //console.log(new_format_data);

          const { data } = await requestDataUser({
            email: selectedObj.email,
            name: user_approved.name,
            registry_code: user_approved.registry_code,
            birth_date: new_format_data,
            address: {
              neighborhood: selectedObj.address.neighborhood,
              street: selectedObj.address.street,
              number: selectedObj.address.number,
              zipcode: selectedObj.address.zipcode,
              city: compCity.value[0].name,
              state: compState.value[0].acronym,
            },
            contacts: [
              {
                phone_type: "MOBILE",
                number: selectedObj.address.number,
              },
            ],
          });
          selectedObj.costumer_id = data.id;
          emit("emit-send-data-user", selectedObj, { checkForm: true });
        } else {
          alert("Preencha os dados corretamente!");
        }
      } catch (error) {
        if (error.response !== undefined) {
          if (error.response.status === 400 && error.response.data.code === 101) {
            alert(error.response.data.error);
            console.log("teste");

            setTimeout(() => {
              router.go(0);
            }, 1000);
          } else {
            console.log("teste");
            alert(error.response.data.error);
          }
        } else {
          console.log(error);
          alert("Erro ao cadastrar");
        }
      }
    };
    const getAllStateFunc = async () => {
      try {
        if (selectedObj.selectedCountry !== -1 || selectedObj.selectedCountry !== 0) {
          const { data, status } = await getAllState();
          if (status === 200) arrayDados.state = data;
        }
      } catch (error) {
        console.log(error);
        alert("Erro ao buscar os Estados e cidades!");
      }
    };

    const getStateByCountryFunc = async () => {
      try {
        console.log("teste State e country: aqui>  ", selectedObj.selectedState);
        const { data, status } = await getStateByCountry({
          state_id: selectedObj.selectedState,
        });
        if (status === 200) {
          arrayDados.city = data.cities;
        }
      } catch (error) {
        console.log(error);
        alert("Erro ao buscar os Estados e cidades!");
      }
    };

    const compState = computed(() => {
      return arrayDados.state.filter((value) => value.id === selectedObj.selectedState);
    });
    const compCity = computed(() => {
      return arrayDados.city.filter((value) => value.id === selectedObj.selectedCity);
    });

    return {
      ...toRefs(selectedObj),
      dataUserFunction,
      ...toRefs(arrayDados),
      compState,
      compCity,
      checkSavedInfor,
      getAllStateFunc,
      getStateByCountryFunc,
    };
  },
};
</script>
<style scoped>
.text-color {
  /* font-family: 'Inter'; */
  font-size: 38px;
  line-height: 36px;
}

.backgroundSelect {
  color: #000000 !important;
  /* font-size: 1.25rem !important; */
  font-weight: 700;
  padding: 0.375rem 0.375rem 0.375rem 0.375rem;
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

select::placeholder {
  color: #000000;
}

.form-control:focus {
  border-color: #d9d9d9 !important;
  box-shadow: 0 0 0 0.25rem rgb(173 181 189 / 50%);
}

.backgroundInput {
  background-color: #d9d9d9;
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
