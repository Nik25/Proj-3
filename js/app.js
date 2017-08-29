  
 /***********************************
  GLOBAL VARIABLES & HTML ELEMENTS
*************************************/

    //Field input elements ( name, email, credit card info)
    const nameInput = document.getElementById("name"); 
    const emailInput = document.getElementById("mail"); 
    const ccInput = document.getElementById("cc-num"); 
    const zipInput = document.getElementById("zip"); 
    const cvvInput = document.getElementById("cvv"); 

    //Elements to hide the 'other' jobe role

    const jobTitle = document.getElementById("title"); 
    const otherJobTitle = document.querySelector("[value=other]"); 
    const otherFieldInput = document.getElementById("other-title"); 

    /*T-shirt INFO*/    
    //Drop down elements for T-shirt

    const tShirtDesignTheme = document.getElementById("design");
    const jsPunsTheme = tShirtDesignTheme.querySelector('[value="js puns"]'); 
    const jsHeartTheme = tShirtDesignTheme.querySelector('[value="heart js"]');

    //Color label & color drop down related variables

    const colorLabel = document.querySelector('[for="color"]');
    const tShirtColorChoice = document.getElementById("color"); 

     /*PAYMENT INFO*/
    //Payment related variables

    const paymentMethodSelected = document.getElementById("payment"); 
    const creditCard = document.querySelector('[value="credit card"]');
    const creditCardInfo = document.getElementById("credit-card");
    const paypal = document.querySelector('[value="paypal"]');
    const paypalDiv = creditCardInfo.nextElementSibling;
    const bitcoin = document.querySelector('[value="bitcoin"]');
    const bitcoinDiv = paypalDiv.nextElementSibling;

    //Variables for access to workshop activites on the page

    const activities = document.querySelector(".activities");

    //Variables to get workshops labels

    const activitiesChildren = activities.children;
    const labels = document.querySelectorAll(".activities > label");

    //Variables related to total cost for workshop activities

    const totalAmount = document.createElement("span");
    totalAmount.textContent = "Total: $0";
    const priceSpan = document.createElement("span");
    activities.appendChild(totalAmount);
    activities.appendChild(priceSpan);  

    //Button for registration

    const buttonRegister = document.querySelector("button"); 

    //These are variables relating to name, email, and 'other' job role errors

    const firstFieldset = document.querySelector("form").firstElementChild;
    const basicInfoLabel = document.querySelector("form").firstElementChild.querySelector("legend");
    const nameError = document.createElement("span");
    basicInfoLabel.appendChild(nameError);
    const emailError = document.createElement("span");
    basicInfoLabel.appendChild(emailError)
    const jobError = document.createElement("span");
    firstFieldset.appendChild(jobError);

    //T-shirt error variables

    const shirtLabel = document.querySelector(".shirt").firstElementChild;
    const shirtError = document.createElement("span");
    shirtLabel.appendChild(shirtError);

    //Activity error variables

    const legend = activities.firstElementChild;
    const activityError = document.createElement("span");
    legend.appendChild(activityError);

    //These are variables relating to payment, credit card no., zip code & cvv errors

    const ccParent = paymentMethodSelected.parentNode;
    const paymentError = document.createElement("span");
    ccParent.insertBefore(paymentError, creditCardInfo);
    const ccError = document.createElement("span");
    ccParent.insertBefore(ccError, creditCardInfo);
    const zipError = document.createElement("span");
    ccParent.insertBefore(zipError, creditCardInfo);
    const cvvError = document.createElement("span");
    ccParent.insertBefore(cvvError, creditCardInfo);

   //For Email validation
   const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

 /****************************
  DOM CONTENT LOADED
****************************/
//The code is placed under DOMContentLoaded and it launches only after the page is loaded
document.addEventListener("DOMContentLoaded", (e) => {

  /****************************
     FUNCTIONS
  ****************************/
     
    //Hides the 'other' job title input field 

    const hideOtherFieldInput = () => {   
        otherFieldInput.style.display = "none";
    };

    //Here the color label and T-shirt color drop down is revealed

    const revealColorLabel_TShirtColor = () => {
        tShirtColorChoice.style.display = "inline";
        colorLabel.style.display = "block";
    };

    //This is to hide the color label & T-shirt color drop down

    const hideColorLabel_TShirtColor = () => {
        tShirtColorChoice.style.display = "none";
        colorLabel.style.display = "none";
    };

    //As hiding doesn't work in safari, so  innerHTML is used to show the js heart colored shirts 

    const showJSHeartColors = () => {
        tShirtColorChoice.innerHTML = '<option value = "tomato">Tomato (I &#9829; JS shirt only)</option>';
        tShirtColorChoice.innerHTML += '<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>';
        tShirtColorChoice.innerHTML += '<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>';
        document.querySelector('["value=tomato"]').selected = true;
    };

    //As hiding doesn't work in safari,so innerHTML is used to show the js pun colored shirts 

    const showJSPunColors = () => {
        tShirtColorChoice.innerHTML = '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>';
        tShirtColorChoice.innerHTML += '<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>';
        tShirtColorChoice.innerHTML += '<option value="gold">Gold (JS Puns shirt only)</option>';
        document.querySelector('["value=cornflowerblue"]').selected = true;
    };

    //This is to check whether any workshops are selected 
    const activitySelected = () => {
        let result = false;
        for (let i = 0; i < labels.length; i += 1) {
            if (labels[i].querySelector("input").checked) {
                result = true;
                break;
            } 
        }
        return result;
    };

    //Payment information for the chosen option is shown here

    const showPaymentInfo = (paymentOption) => {
        if (paymentOption.selected === creditCard.selected) {
            creditCardInfo.style.display = "inline-block";
            bitcoinDiv.style.display = "none";
            paypalDiv.style.display = "none";
        }
        if (paymentOption.selected === paypal.selected) {
            creditCardInfo.style.display = "none";
            bitcoinDiv.style.display = "none";
            paypalDiv.style.display = "inline-block";
        }
        if (paymentOption.selected === bitcoin.selected) {
            creditCardInfo.style.display = "none";
            bitcoinDiv.style.display = "inline-block";
            paypalDiv.style.display = "none";
        }
    };

    //This is for email address validation

    const validateEmail = (emailAddress) => {
        return regex.test(emailAddress);
    };

    //Error messages styling

    const errorStyling = (errorName) => {
        errorName.style.fontWeight = "bold";
        errorName.style.fontStyle = "italic"; // trial
        errorName.style.fontSize = "medium";
        errorName.style.color = "#f21010";
        errorName.style.display = "block";
    };

    const hideError = (errorName) => {
        errorName.style.display = "none";
    };

    /**********************************************
    This part contains the functionality
    ***********************************************/
    /*req 1. Focus on the first field
        1.1 On page load, the cursor appears in the "Name" field, ready for a user to type.*/

    //On page load focus on the first field -'name field' 

    document.getElementById("name").focus();

     //This hides the other job input field

    hideOtherFieldInput();

    //This hides the color label & T-shirt selector

    hideColorLabel_TShirtColor();
   
    //This sets the credit card selector to the default & show credit card info
    (function() {
        document.querySelector('[value="credit card"]').selected = true;
        showPaymentInfo(creditCard);
    })();

    //As the year 2016 is over, so remove from expiration year drop down
   (function() {
        document.querySelector('[value="2016"]').remove();
    })(); 

    /****************************************************************************************************************
    req 2.  A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
        Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field. 

     -WHEN 'OTHER' IS SELECTED THEN SHOW THE 'YOUR JOB ROLE' FIELD 
    *****************************************************************************************************************/

    jobTitle.addEventListener("change", (e) => {
        if (otherJobTitle.selected) {
            otherFieldInput.style.display = "block";
            otherFieldInput.style.removeProperty("border");
        } else {
            hideOtherFieldInput();
            hideError(jobError);
        }
    });

    /**********************************************************************************************************************
    req 3.  For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu.

     -DISPLAYS COLOR OPTIONS CORRESPONDING TO THE SELECTED SHIRT
     -HIDES THE COLOR LABEL AND COLOR OPTIONS, IF NO SHIRT IS SELECTED, 
    ***********************************************************************************************************************/

    tShirtDesignTheme.addEventListener("change", (e) => {
        hideError(shirtError);
        if (jsHeartTheme.selected) {
            revealColorLabel_TShirtColor();
            showJSHeartColors();
        } else if (jsPunsTheme.selected) {
            revealColorLabel_TShirtColor();
            showJSPunColors();
        } else {
            hideColorLabel_TShirtColor();
        }
    });

     /********************************************************************************************************************
    req 4.  Some events are at the same time as others. If the user selects a workshop, don't allow selection of a workshop
            at the same date and time -- 

    - CONFLICTING WORKSHOPS SHOULD BE DISABLED AND CAN'T BE SELECTED
    - CONFLICTING WORKSHOP IS ENABLED, WHEN A WORKSHOP IS UNCHECKED 
    *************************************************************************************************************************/

    activities.addEventListener("change", (e) => { 
         //To get activities that have overlapping timeframes
         const jsFrameworks = document.querySelector('input[name="js-frameworks"]');
         const jsLibraries = document.querySelector('input[name="js-libs"]');
         const express = document.querySelector('input[name="express"]');
         const nodeJS = document.querySelector('input[name="node"]');

         jsFrameworks.checked ? express.disabled = true : express.disabled = false;
         express.checked ? jsFrameworks.disabled = true : jsFrameworks.disabled = false;
         jsLibraries.checked ? nodeJS.disabled = true : nodeJS.disabled = false;
         nodeJS.checked ? jsLibraries.disabled = true : jsLibraries.disabled = false;
    });

    /******************************************************************
     >>> TOTAL COST GETS MODIFIED AS USER SELECTS ONE OR MORE WORKSHOPS
    ********************************************************************/

    activities.addEventListener("change", (e) => {

        let price = 0;
       totalAmount.textContent = "Total: $";
       totalAmount.style.fontWeight = 'bold'; 
       totalAmount.style.color = 'Purple';        
        hideError(activityError);
        for (let i =0; i < labels.length; i += 1) {
             if (labels[i].querySelector("input").checked) {
                price += parseInt(labels[i].textContent.split("$").pop());
              } 
        }
       priceSpan.textContent = price;
       priceSpan.style.fontWeight = 'bold';
       priceSpan.style.color = 'Purple'; 
     });
          
    /***************************************************************************************************************************************************
     req 5.  Display payment sections based on the payment option chosen in the select menu.
            The "Credit Card" payment option should be selected by default, display the #credit-card div, and hide the "Paypal" and "Bitcoin information.

     -BASED ON DROP DOWN SELECTION, CORRESPONDING PAYMENT SECTION INFO GETS DISPLAYED
    *****************************************************************************************************************************************************/
    
    paymentMethodSelected.addEventListener("change", (e) => { 
        if (creditCard.selected) {
            showPaymentInfo(creditCard);
            ccInput.style.removeProperty("border");
            zipInput.style.removeProperty("border");
            cvvInput.style.removeProperty("border");
            hideError(paymentError);
        } else if (paypal.selected) {
            showPaymentInfo(paypal);
            hideError(ccError);
            hideError(cvvError);
            hideError(zipError);
            hideError(paymentError);
        } else if (bitcoin.selected) {
            showPaymentInfo(bitcoin);
            hideError(ccError);
            hideError(cvvError);
            hideError(zipError);
            hideError(paymentError);
        } else {
            hideError(ccError);
            hideError(cvvError);
            hideError(zipError);
            creditCardInfo.style.display = "none";
            bitcoinDiv.style.display = "none";
            paypalDiv.style.display = "none";
        }
    });
                
    /*****************************************************************************************************************************************************************************
     req 6. If any of the following validation errors exist, prevent the user from submitting the form:
            Name field can't be blank
            Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like
             one: dave@teamtreehouse.com for example.-
            Must select at least one checkbox under the "Register for Activities" section of the form.
            If the selected payment option is "Credit Card," make sure the user has supplied a credit card number, a zipCode code, and a 3 number CVV value before 
            the form can be submitted.
            Credit card field should only accept a number between 13 and 16 digits
            The zipcode field should accept a 5-digit number
            The CVV should only accept a number that is exactly 3 digits long

     req 7. Provide some kind of indication when there’s a validation error. 
            The field’s borders could turn red, for example, or a message could appear near the field or at the top of the form.
             There should be an error indication for the name field, email field, “Register for Activities” checkboxes, credit card number, zipCode code, and CVV
            If the selected payment option is "Credit Card," make sure the user has supplied a credit card number, a zip code, and a 3 number CVV value before the form can be submitted.       

      Program at least one of your error messages so that more information is provided depending on the error.
                --> DONE, for Payment form registration validation

    - REGISTRATION VALIDATION
    ***************************************************************************************************************************************************************************/

    buttonRegister.addEventListener("click", (e) => {
        // gets the name field value
        const name = nameInput.value;

        // gets the email address field value
        const emailAddress = emailInput.value;

        //gets the Credit Card number provided by user
        const ccNumber = ccInput.value;

        //gets the zip code provided by user 
        const zipCode = zipInput.value;

        //gets the cvv value provided by the user
        const cvv = cvvInput.value;

            //ensure name field isn't left empty
            if (name === "") {
                e.preventDefault();
                nameInput.style.borderColor = "#f21010";
                errorStyling(nameError);
                nameError.textContent = "Fill in your name.";  
            } else if (name !== "") {
                nameInput.style.removeProperty("border");
                hideError(nameError);
            }

            //ensure email address validations
            if (!validateEmail(emailAddress)) {
                e.preventDefault();
                emailInput.style.borderColor = "#f21010";
                errorStyling(emailError);
                emailError.textContent = "Fill in your valid email address.";
            } else if (validateEmail(emailAddress)) {
                emailField.style.removeProperty("border");
                hideError(emailError);
            }

            //In case 'other' job role is selected, ensure that the 'other' job field is filled out 
            if (otherJobTitle.selected) {
                if (otherFieldInput.value === ""){
                    e.preventDefault();
                    otherFieldInput.style.borderColor = "#f21010";
                    errorStyling(jobError);
                    jobError.textContent = "Fill in your job title.";
                } else {
                    otherFieldInput.style.removeProperty("border");
                    hideError(jobError);
                }
            }

            // ensure that a shirt design is selected
            if (!jsHeartTheme.selected && !jsPunsTheme.selected) {
                e.preventDefault();
                errorStyling(shirtError);
                shirtError.textContent = "Select T-shirt design.";
            } else if (jsHeartTheme.selected || jsPunsTheme.selected) {
                hideError(shirtError);
            }

            // Ensure if an activity is chosen only then it will submit
            if (!activitySelected()) {
                e.preventDefault();
                errorStyling(activityError);
                activityError.textContent = "Select one activity at least.";
            } else if (activitySelected()) {
                hideError(activityError);
            }

            // The payment section is verified
            if (!paypal.selected && !bitcoin.selected && !creditCard.selected) {
                e.preventDefault();
                errorStyling(paymentError);
                paymentError.textContent = "Select payment method.";
            } else {
                    hideError(paymentError);

                    //Credit card selection verification
                    if (creditCard.selected) {

                        // Verification for whether CC number is between 13 & 16 digits
                        if (isNaN(ccNumber)) {
                            e.preventDefault();
                            errorStyling(ccError);
                            ccInput.style.borderColor = "#f21010";
                            ccError.textContent = "Credit cards can only have digits.";
                        }  else if (ccNumber.length > 16 || ccNumber.length < 13) {
                            e.preventDefault();
                            ccInput.style.borderColor = "#f21010";
                            errorStyling(ccError);
                            if (ccNumber.length > 16) {
                                ccError.textContent = "Credit card number cannot be more than 16 digits.";
                            } else if (ccNumber === "") {
                                ccError.textContent = "Fill in your credit card number.";
                            } else if (ccNumber.length < 13) {
                                ccError.textContent = "Credit card number must at least be 13 digits long.";
                            }
                            
                        } else if (ccNumber.length >= 13 && ccNumber.length <= 16) {
                            ccInput.style.removeProperty("border");
                            hideError(ccError);
                        }

                        /* Verification for whether zip code is : A) a number and/or; B) the right length- 5 digits number  */
                        if (isNaN(parseInt(zipCode)) || zipCode.length !== 5) {
                            e.preventDefault();
                            zipInput.style.borderColor = "#f21010";
                            errorStyling(zipError);
                            /*zipError.textContent = "Invalid zip code.";*/
                            if (zipCode === "") {
                                zipError.textContent = "Fill in your zip code.";
                            } else if (isNaN(parseInt(zipCode))) {
                                zipError.textContent = "Zip code has to be a number.";
                            } else if (zipCode.length > 0) {
                                zipError.textContent = "Zip code has to be a 5 digit number.";
                            }
                        } else {
                            hideError(zipError);
                            zipInput.style.removeProperty("border");
                        }

                        // Verify to see that CVV is exactly 3 digits long
                        if (cvv.length !== 3 || isNaN(parseInt(cvv))) {
                            e.preventDefault();
                            cvvInput.style.borderColor = "#f21010";
                            errorStyling(cvvError);
                            if (cvv === "") {
                                cvvError.textContent = "Fill in your CVV code.";
                            } else if (isNaN(parseInt(cvv))) {
                                cvvError.textContent = "CVV code has to be a number.";
                            } else if (cvv.length < 3 || cvv.length > 3) {
                                cvvError.textContent = "CVV code has to be a 3 digit number.";
                            }
                        } else {
                            cvvInput.style.removeProperty("border");
                            hideError(cvvError);
                        }
                    }
                }
             });
    });
