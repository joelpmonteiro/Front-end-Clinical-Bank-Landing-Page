import "../css/style.css";
//import javascriptLogo from "/javascript.svg";
import logo from "/img/logo.png";
import doctorWidth from "/img/doctor-svgrepo-com.svg";
import ambulance from "/img/ambulance-svgrepo-com.svg";
import healthCareHospital from "/img/health-care-hospital-svgrepo-com.svg";
import healthCare from "/img/health-care-svgrepo-com-face.svg";
import healthCare2 from "/img/health-care-svgrepo-com.svg";
import healthClinicHealth from "/img/health-clinic-health-care-svgrepo-com.svg";
import healthClinicSyringe from "/img/health-clinic-syringe-svgrepo-com.svg";
import cardCredit from "../public/img/Screenshot_18.png";
import { buttonClickGetCardCredit } from "./axios";
import { mascara } from "./neurotech";
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
    <section class='container container-sm container-md container-lg my-5' >
        <div class="row">
          <div class="col-sm-6" style='display: grid;place-content: center;'>
            <div class='row'>
              <div class='col-12 col-sm-10 col-md-6 col-lg-10'>
                <span class='text-color'>Consulte o Crédito do seu CPF</span>
              </div>
            </div>
            <div class='row'>
              <div class='col-12 col-sm-12 col-md-6 col-lg-10'>
                <div class='text-width pt-3'>  
                  <span class='sub-text'>
                    Simule o seu tratamento</span>
                </div>
              </div>
            </div>
            <div class='row space-cpf'>
              <div class="col-10 col-sm-6 col-md-6 col-lg-8" id='cpfdiv'>
                  <form id="formCPF" method="post" >
                    <div class="input-group  mb-3">
                      <input type="text" value='' class='form-control border-radius nome' placeholder='Digite seu nome' aria-label="digite seu nome" aria-describedby="basic-addon2">
                    </div>
                    <div class="input-group  mb-3">
                      <input type="date"  value='' class='form-control border-radius data' placeholder='DD/MM/YYYY' aria-label="digite data de nascimento" aria-describedby="basic-addon2">
                    </div>  
                    <div class="input-group  mb-3">
                      <input type="text" value='' class='form-control border-radius cpf' placeholder='Digite seu cpf' aria-label="digite seu cpf" aria-describedby="basic-addon2">
                    </div>

                    <div class='p-2 mb-3'>
                      <button class="btn txt-background text-white" type="submit" id="button-addon2" style='margin-left: -10px;border-radius:12px'>
                       <span class="spinner-border spinner-border-sm d-none"></span> Consultar</button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-12 col-sm-12">
                <div class='d-flex flex-wrap ' >
                  <div class='row pt-3 d-none' id='paymentFormat'>
                    <span class=''>Credito Aprovado no momento: R$1092.00</span>
                    <span class=''>Valor das parcelas: R$78.00</span>
                    <form id='formInput' class='d-none'>
                      <div class='col-4 col-sm-5'>
                        <label class='text-strong'>Valor Total Tratamento:</label>
                        <input class='form-control form-control-sm border-radius' type='text' name='valorTratamento' placeholder='Valor total do tratamento'/>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
    </section>
    <section class='container container-sm container-md container-lg my-5' style='display:none;'>

    </section>
    <section id='cardCredit' class='container container-sm container-md container-lg my-5' style='display:none;'>
      <div class='row text-center'>
        <div class="col-12 col-sm-6 col-md-12 col-lg-12">
          <span class='text-color'>Informe os dados do seu cartão de crédito:</span>
          <div class='row mt-2'>
            <div class="d-flex justify-content-center my-2">
              <span>Adicionar outro cartão ?
                <button class="btn btn-primary btn-sm" type="submit" style='padding: 0.01rem 0.2rem;border-radius: 0.2em;font-size: .8em;'>
                  +
                </button>
              </span>
            </div>
            <p style='color:red;'>Todos os campos são obrigatórios/necessários</p>
            <div class='mb-2'>
              <p>Aceitamos os seguintes cartões</p>
              <img alt='card_credit' src='${cardCredit}'/>
            </div>
            <div class="d-flex justify-content-center" id='cardCreditDiv'>
                <form id="formCredit" method="post" >
                  <div class='col-12 col-sm-12 col-md-6 d-inline-block mb-3'>
                  <div class="form-group mb-3">
                    <input type="text" value='' class='form-control border-radius numero' placeholder='Número do cartão' aria-label="Número do cartão" aria-describedby="basic-addon2">
                  </div>
                  <div class="form-group mb-3">
                    <input type="text"  value='' class='form-control border-radius nome' placeholder='Nome do cartão' aria-label="Nome do cartão" aria-describedby="basic-addon2">
                  </div>  
                  <div class="form-group row ">
                    <div class='col-6'>
                      <input type="text" value=''  class='form-control border-radius cpf' placeholder='MM/AA' aria-label="MM/AA" aria-describedby="basic-addon2">
                    </div> 
                    <div class='col-6'>
                      <input type="text" value=''  class='form-control border-radius cvv' placeholder='CVV' aria-label="CVV" aria-describedby="basic-addon2">
                    </div>    
                  </div>
                  </div>
                  <div class="col-12 col-sm-12 col-md-8 fs-6 fw-normal text-muted d-inline-block" style='font-size: 15px !important;'>    
                    <p>
                      Ao clicar no botão “Confirmar”, você concorda com a nossa política de desconto do valor ao não pagar a parcela do boleto ou recorrência em questão
                    </p>
                    <p>
                      Confirma ter mais de 18 anos e aceita que a <strong>ClinicalBank renove automaticamente sua recorrência e cobre o valor parcela acima confirmada e assinada em contrato.</strong>
                    </p>
                    <p>
                      O valor de entrada não será devolvido em hipótese nenhuma, pois trata-se da utilização do software e serviços prestados pelo produto ofertado.
                    </p>
                  </div>
                  <div class='col-12 p-2 mb-3'>
                    <button class="btn txt-background text-white" type="submit" id="button-addon2" style='margin-left: -10px;border-radius:12px'>
                      <span class="spinner-border spinner-border-sm d-none"></span>Confirmar</button>
                  </div>
                  
                </form>

              </div>
              
          </div>
        </div>
      </div>
    </section>


    <footer class="footer mt-auto py-3 ">
      <div class="container">
        <span class="text-muted">&copy; Clinical Bank 2022</span>
      </div>
    </footer>

`;

buttonClickGetCardCredit(document.querySelector("#button-addon2"));
mascara(document.querySelector(".form-control.border-radius.cpf"));
