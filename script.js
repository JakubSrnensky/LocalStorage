
$(function() {

    let fieldSet = $("fieldset");
    let submit = $(".btn"); 
    //validation empty fields
    function checkEmpty(){
		let hasError = false;

        fieldSet.each(function (){
            let inputField = $(this).find("input");
            let error = $(this).find(".error");
           

            if(inputField.val() == 0){
                hasError = true;
                inputField.addClass("red").removeClass("green");    
                error.addClass("visible"); 
            } else if(inputField.val() != 0){
                inputField.addClass("green").removeClass("red");
                error.removeClass("visible"); 
            }   

        })
         
        if (hasError) {
        	return false;
        }
        else {
        	return true;
        }

    }
       
        
    //validation that you are not robot
    function robotValidation(){
        let hasErrorRobot = false;
        let checkValidationField = $(".check-validation");
        let checkValidation = {
            frame: $("<div/>", { class: "check-validation frame" ,}),
            info: $("<div/>", { class: "description" ,}),
            close: $("<div/>", { class: "close" ,}),
        }

        if( checkValidationField.val() != 2){
            checkValidationField.removeClass("green").addClass("red");
            checkValidation.frame.appendTo("body");
            checkValidation.close.appendTo(checkValidation.frame);
            checkValidation.info.text("Prosím ověř, že nejsi robot").appendTo(checkValidation.frame);
            submit.prop('disabled', true);
            hasErrorRobot = true;
        } 
    
        checkValidation.close.on("click", function(){
            checkValidation.frame.remove();
            submit.prop('disabled', false);
        })

        if (hasErrorRobot) {
        	return false;
        }
        else {
        	return true;
        }

    }

    //submiting form
    function submitForm(){
      if(checkEmpty() && robotValidation()){
        location.href = "form_finished.html";
      }

      localStoragetSet();
      event.preventDefault();
    }

    submit.on("click",function(event){
	    submitForm();
    });

    let firstName = $(".firstName");
    let lastName = $(".lastName");    

    //localStorage set
    function localStoragetSet(){

        let firstNameSet = $(".name").val();
        let lastNameSet = $(".surname").val();

        localStorage.setItem("firstName", firstNameSet);
        localStorage.setItem("lastName", lastNameSet);
    }


    //localStorage get
    function localStoragetGet(){
    
        let firstNameGet = localStorage.getItem("firstName");
        let lastNameGet = localStorage.getItem("lastName");

        firstName.text(firstNameGet);
        lastName.text(lastNameGet);
    }
    
    localStoragetGet();

});