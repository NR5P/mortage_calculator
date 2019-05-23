// variables for text input fields
const apr = document.getElementById("apr");
const loanTerm = document.getElementById("term");
const amount = document.getElementById("amount");

// read only payment output
const monthlyPaymentOutput = document.getElementById("payment");

/* form validation //////////////////////////////////////////////////
apr - must allow floating point values between 0 and 25.00%
lanTerm - must be > than 0 and <= 40
*///////////////////////////////////////////////////////////////////
function validateApr() {
    if (isNaN(apr.value)) {
        // error must be a number
        document.getElementsByClassName("apr-error")[0].innerHTML = "<p>must enter number only</p>";
        apr.style.borderColor = "red";
        apr.focus();
        return false;
    } 
    else if (apr.value < 0 || apr.value > 25 || apr.value == "") {
        // error must be between 0 and 25.00
        document.getElementsByClassName("apr-error")[0].innerHTML = "<p>number must be between 0 and 25.00</p>";
        apr.style.borderColor = "red";
        apr.focus();
        return false;
    }
    else {
        apr.style.borderColor = "green"
        if (document.getElementsByClassName("apr-error")[0].innerHTML != "");
        {
            document.getElementsByClassName("apr-error")[0].innerHTML = "";
        }
        return true;
    }
}

function validateLoanTerm() {
    if (isNaN(loanTerm.value)) {
        document.getElementsByClassName("loan-term-error")[0].innerHTML = "<p>must enter number only</p>";
        loanTerm.style.borderColor = "red";
        loanTerm.focus();
        return false;
    }
    else if (loanTerm.value < 0 || loanTerm.value > 40 || loanTerm.value == "") {
        // error must be between 0 and equal to 40
        document.getElementsByClassName("loan-term-error")[0].innerHTML = "<p>number must be between 0 and 40</p>";
        loanTerm.style.borderColor = "red";
        loanTerm.focus();
        return false;
    }
    else {
        loanTerm.style.borderColor = "green";
        if (document.getElementsByClassName("loan-term-error")[0].innerHTML != "");
        {
            document.getElementsByClassName("loan-term-error")[0].innerHTML = "";
        }
        return true;
    }
}

function validateLoanAmount() {
    if (isNaN(amount.value)) {
        document.getElementsByClassName("loan-amt-error")[0].innerHTML = "<p>must enter number only</p>";
        amount.style.borderColor = "red";
        amount.focus();
        return false;
    }
    else if (amount.value == "") {
        document.getElementsByClassName("loan-amt-error")[0].innerHTML = "<p>must enter an amount</p>";
        amount.style.borderColor = "red";
        amount.focus();
        return false;
    }
    else {
        amount.style.borderColor = "green";
        if (document.getElementsByClassName("loan-amt-error")[0].innerHTML != "");
        {
            document.getElementsByClassName("loan-amt-error")[0].innerHTML = "";
        }
        return true;
    }
}
////////////////////end validation code////////////////////////////////

////////////////////Payment calculation//////////////////////////////

function calculateMonthlyPayment() {
    let c = apr.value / 12; //monthly ihttp://www.cs.uregina.ca/Links/class-info/210/Recursion/nterest rate
    let n = loanTerm.value * 12;
    let d = 1 + c;
    return amount.value * ((c * Math.pow(d,n))/(Math.pow(d,n)-1));
}


///////////////////event listeners/////////////////////////////////////
// clear form
document.getElementById("clear").addEventListener("click", function() {
    apr.value = "";
    amount.value = "";
    loanTerm.value = "";
    monthlyPaymentOutput.value = "";

    // change all borders to black
    apr.style.borderColor = "black";
    amount.style.borderColor = "black";
    loanTerm.style.borderColor = "black";

    // get rid of the error messages
    if (document.getElementsByClassName("apr-error")[0].innerHTML != "");
    {
        document.getElementsByClassName("apr-error")[0].innerHTML = "";
    }
    if (document.getElementsByClassName("loan-term-error")[0].innerHTML != "");
    {
        document.getElementsByClassName("loan-term-error")[0].innerHTML = "";
    }
    if (document.getElementsByClassName("loan-amt-error")[0].innerHTML != "");
    {
        document.getElementsByClassName("loan-amt-error")[0].innerHTML = "";
    }
    
    monthlyPaymentOutput.innerHTML = "";

    apr.focus();
})

document.getElementById("calculate").addEventListener("click", function() {
    if (validateApr() && validateLoanTerm() && validateLoanAmount()) {
        // computes the monthly payment and update monthly payment field
        if (monthlyPaymentOutput.style.color == "red") {
            monthlyPaymentOutput.style.color = "black";
        }
        let result = calculateMonthlyPayment().toFixed(2); 
        monthlyPaymentOutput.innerHTML = `$${result}`;
    }
    else {
        monthlyPaymentOutput.innerHTML = "Please fix errors";
        monthlyPaymentOutput.style.color = "red";
    }
})

////////////////////end event listeners/////////////////////////////


