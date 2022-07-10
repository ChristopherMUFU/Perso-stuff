import React, { useState } from 'react';

import './styles.css';

import Step1 from "./Step1";
import Step2 from "./Step2";
import Paiement from "../Paiement";

import useForm from "../../../../hooks/useForm"; //Form has already in Hooks


// !!! Adhérer partage les mêmes styles que Don !!!

// Step form :
// Var currentStep will decide which step is displayed
// Buttons to increment or decrement this variable
  
const Don = () => { 
    // When the form is finished, paiement page will be displayed
    const [payment, setPayment] = useState(false);

    // initial values
    const initial = {
        currentStep: 1, // default => so we land on the first step of the form
        donation: '',
        amount: '',
        address: '',
        firstName: '',
        lastName: '',
        postalCode: '',
        city: '',
        phone: '',
        country: '',
        mail: '',
        newsletter: false, // Default
    };  
    
    // Validator
    // We use switch cases depending on which step of the form we are at
    const isValid = (fieldValues = state) => {
        const validator = {};
        switch (state.currentStep) {
            case 1 : 
                if ("donation" in fieldValues)
                    validator.donation = state.donation ? null : "Veuillez choisir un type de donation";
                if(fieldValues.donation === "Autre"){  
                    validator.amount = /^[0-9]+$/.test(state.amount) ? null : "Veuillez renseigner un chiffre";
                    state.donation = amount !== undefined ? amount : '';
                }
                break;

            case 2 :  
                if ("mail" in fieldValues)                    
                    validator.mail = /([a-zA-Z0-9-_.+]{4,})@.+\..+/.test(state.mail)
                    ? null
                    : "L'email n'est pas valide";                  
                if ("firstName" in fieldValues)
                    validator.firstName = state.firstName ? null : "Veuillez renseigner un prénom";  
                if ("lastName" in fieldValues)
                    validator.lastName = state.lastName ? null : "Veuillez renseigner un nom";   
                if ("address" in fieldValues)
                    validator.address = state.address ? null : "Veuillez renseigner une adresse"; 
                if ("postalCode" in fieldValues)
                    validator.postalCode = /\d+/.test(state.postalCode)
                    ? null
                    : "Code postale n'est pas valide";  
                if ("city" in fieldValues)
                    validator.city = state.city ? null : "Veuillez renseigner une ville";   
                if ("phone" in fieldValues)
                    validator.phone =
                    /(?:(\+(\d{1,2})?)[ -]?)?\(?(?<first>\d{3})\)?[-\s]?(\d{3})[- ]?(\d{4})/.test(state.phone)
                    ? null
                    : "Le numéro de téléphone n'est pas valide";   
                if ("country" in fieldValues)
                    validator.country = state.country ? null : "Veuillez renseigner un pays";  
                 break; 
            default:
                // do nothing
        }
        
        setErrors({ ...validator });
    
        // return boolean if and only if we pass a parameter for the function
        if (fieldValues === state) {
          return Object.values(validator).every((el) => !el);
        }
    };

    // Hook useForm 
    const { state, setState, handleInputChange, handleCheckedChange, errors, setErrors, previousButton, nextButton } = useForm(initial, isValid);

    const { currentStep, donation, amount, address, firstName, lastName, postalCode, city, phone, country, mail, newsletter } = state;

       
    const handleSubmit = async (e) => {
        e.preventDefault();        
        if (isValid() && currentStep === 2) {
            setPayment(true)
        }
    };  
    
    // Datas that will be sent in the request to register a donation
    // We pass them now to the component Paiement that will send this request.
    const dataToSend = {
        donneur: {
            nom: state.lastName,
            prenom: state.firstName,
            email: state.mail,
            telephone: state.phone,
            adresse: state.address,
            ville: state.city,
            code_postale: state.postalCode,
            news_letter: state.newsletter,
        },
        montant: parseInt(state.donation),
    };

    return (
        <div id="don-page">
            {!payment && (
                <div className="step-one-don-form">
                    <form onSubmit={handleSubmit}>    
                        <div className="steps-form-donation">
                            <Step1 
                                currentStep={currentStep} 
                                handleChange={handleInputChange}
                                state={state}
                                errors={errors}
                            />
                            <Step2 
                                currentStep={currentStep} 
                                handleChange={handleInputChange}
                                handleCheckedChange={handleCheckedChange}
                                state={state}
                                errors={errors}
                            />     
                        </div>
                        
                        
                        <div className="buttons-don-page">
                            {previousButton()}
                            {nextButton(2)}
                        </div>
                       
                    </form>

                    <div className="don-complementary-infos">
                            <h2>A SAVOIR</h2>
                            <p>
                                En vertu des articles 200 et 238 bis du Code général des impôts, l’APMF est habilitée à faire bénéficier ses donateurs d’une réduction d’impôts de 66 % de la somme versée, dans la limite de 20 % du revenu imposable pour un particulier et de 60 % dans la limite de 5 ‰ du chiffre d’affaires pour une entreprise. L’APMF adresse un reçu de don à chacun de ses donateurs.
                            </p>
                    </div>
                </div>
            )}

            {payment && ( 
                <Paiement 
                    dataUser={state}
                    urlRegister="dons/create-don/"
                    urlStripe="dons/create-client-secret/"
                    dataRegister={dataToSend}
                    setState={setState}
                    setPayment={setPayment}
                />
            )}
            

        </div>
    )
}

export default Don;