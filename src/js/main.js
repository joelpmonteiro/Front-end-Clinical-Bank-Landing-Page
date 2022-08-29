import "../css/style.css";
import javascriptLogo from "../public/javascript.svg";
import logo from "../public/img/logo.png";
import doctorWidth from "../public/img/doctor-svgrepo-com.svg";
import ambulance from "../public/img/ambulance-svgrepo-com.svg";
import healthCareHospital from "../public/img/health-care-hospital-svgrepo-com.svg";
import healthCare from "../public/img/health-care-svgrepo-com-face.svg";
import healthCare2 from "../public/img/health-care-svgrepo-com.svg";
import healthClinicHealth from "../public/img/health-clinic-health-care-svgrepo-com.svg";
import healthClinicSyringe from "../public/img/health-clinic-syringe-svgrepo-com.svg";

import { buttonClickGetCardCredit } from "./axios.js";

document.querySelector("#app").innerHTML = `
    <nav class='navbar container p-2'>
      <div class='col-sm-2 logo'>
        <div class='header-right'>
          <img alt='logo' class='img-width' src="${logo}" />
        </div>
      </div>
      <div class='d-flex flex-row-reverse'>
          <a href='${window.location.origin}' class="btn btn-md btn-outline-primary">
            <i class="bi bi-arrow-left"></i> 
              Voltar
            </a>
    
        </div>
    </nav>
    <hr class='separator '/>
    <main class='container container-sm container-md container-lg my-5' >
        <div class="row">
          <div class="col-sm-6" style='display: grid;place-content: center;'>
            <div class='row'>
              <div class='col-12 col-sm-10 col-md-6 col-lg-10'>
                <span class='text-color'>Consulte o crédito do seu cpf</span>
              </div>
            </div>
            <div class='row'>
              <div class='col-12 col-sm-12 col-md-6 col-lg-10'>
                <div class='text-width pt-3'>  
                  <span class='sub-text'>
                    Para verificar seu saldo disponivel insira seu cpf abaixo</span>
                </div>
              </div>
            </div>
            <div class='row space-cpf'>
              <div class="col-10 col-sm-6 col-md-6 col-lg-8" id='cpfdiv'>
                  <form id="formCPF" method="post" >
                    <div class="input-group  mb-3">
                      <input type="text" value='' class='form-control border-radius' placeholder='Digite seu cpf' aria-label="digite seu cpf" aria-describedby="basic-addon2">
                       <button class="btn txt-background text-white" type="submit" id="button-addon2" style='margin-left: -10px;border-radius:12px'>Consultar</button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-12 col-sm-12">
                <div class='d-flex flex-wrap ' >
                    <div class="col-auto col-sm-2 col-md-2 align-self-center">
                      <div class='col col-sm col-md p-2'>
                        <img src='${ambulance}' />
                      </div>
                      <div class='col col-sm col-md p-2'>
                        <img src='${healthCareHospital}' />
                      </div>
                      <div class='col col-sm col-md p-2 '>
                        <img src='${healthCare}' />
                      </div>
                    </div>
                    <div class="col-12 col-sm-8 col-md-8 align-self-center">
                      <div class="flex-md-fill flex-xl-fill width-img">
                        <img src='${doctorWidth}' />
                      </div>
                    </div>
                    <div class="col-auto col-sm-2 col-md-2 align-self-center">
                      <div class='col col-sm col-md p-2'>
                        <img src='${healthCare2}' />
                      </div>
                      <div class='col col-sm col-md p-2 '>
                        <img src='${healthClinicHealth}' />
                      </div>
                      <div class='col col-sm col-md p-2 '>
                        <img src='${healthClinicSyringe}' />
                      </div>
                    </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
    </main>

    <footer class="footer mt-auto py-3 ">
      <div class="container">
        <span class="text-muted">&copy; Clinical Bank 2022</span>
      </div>
    </footer>

`;

buttonClickGetCardCredit(document.querySelector("#button-addon2"));

// <footer class="text-center">
//   <div>
//     <strong>&copy; Copyright 2022 Fuston Services.</strong> Todos os
//     Direitos Reservados.
//   </div>
// </footer>;
