import { useState } from "react";

const useForm = (initialState, validator = null) => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const changingInput = { [e.target.name]: e.target.value };

    setState({
      ...state,
      ...changingInput,
    });
  };

  const handleCheckedChange = (e) => {
    const changingInput = { [e.target.name]: e.target.checked };

    setState({
      ...state,
      ...changingInput,
    });
  };

  const reinitialiserState = () => setState(initialState);

  // Methods for a multi-step form : will go to the next or previous step and generate the according button
  // proceed to the next step
  const nextStep = () => {
    const { currentStep } = state;
    // If the form constraints are validated, move on to the next step
    if (validator()) {
      setState({         
        ...state,
        currentStep: currentStep + 1 
      });
    }
  }
  // go back to previous step
  const prevStep = () => {
      const { currentStep } = state;
      setState({ 
        ...state,
        currentStep: currentStep - 1 
      });
  }

  // The "next" and "previous" button functions
  const previousButton = () => {
      let currentStep = state.currentStep;
      // If the current step is not 1, then render the "previous" button
      if(currentStep !==1){
      return (
          <p
              className="btnSteps"
              onClick={prevStep}
          >
              Précédent
          </p>
      )
      }
      // ...else return nothing
      return null;
  }

  const nextButton = (numberOfSteps) => {
    let currentStep = state.currentStep;
    // If the current step is not 3, then render the "next" button
    if(currentStep < numberOfSteps){
      return (
        <p
            className="btnSteps float-right"
            onClick={nextStep}
        >
            Suivant
        </p> 
      )      
    }
    // If we arrive at the end of the form, render the validate button
    else if (currentStep === numberOfSteps) {
      return (
        <button
            type="submit" 
            className="btnSteps float-right"
        >
            Valider
        </button> 
      )      
    }
    // ...else render nothing
    return null;
  }

  return {
    state,
    setState,
    errors,
    setErrors,
    handleInputChange,
    handleCheckedChange,
    reinitialiserState,
    previousButton,
    nextButton,
  };
};

export default useForm;
