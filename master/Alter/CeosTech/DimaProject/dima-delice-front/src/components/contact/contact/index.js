import React, { useRef } from "react";
import ContactForm from "../form";

import "./contact.css";
import ContactDetails from "./Details";

const Contact = () => {
  const contact_div = useRef(null);

  return (
    <div className="traiteur-contact__container" id='contact' ref={contact_div}>
      <div className='contact' >
        <div className='contact__header'> 
            <h2 className='contact_title'>Une question ? Une demande précise ?</h2>        
            <p className='contact__text'>Pour toute demande d’information concernant <span>le restaurant</span>, <span>nos prestations traiteurs</span> ou notre <span>service de brunch</span>, vous pouvez nous contacter soit par <span>mail</span>, soit par <span>téléphone</span> ou bien remplir le <span>formulaire de contact</span> :)
            </p>
        </div>  
                  
        <div className='contact__container'>            
          <ContactDetails />
          <ContactForm />
        </div>
         
      </div>
    </div>
  );
};

export default Contact;
