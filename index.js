// Form validation

let userForm = document.getElementById("userform");

// Retrive Entries
const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if(entries){
        entries = JSON.parse(entries);
    }else {
        entries = [];
    }
    return entries;
}

let userEntries = retrieveEntries();


// Display 

const displayEntries = () => {
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td>${entry.name}</td>`;
        const emailCell = `<td>${entry.email}</td>`;
        const passwordCell = `<td>${entry.password}</td>`;
        const dobCell = `<td>${entry.dob}</td>`;
        const termsCell = `<td>${entry.terms}</td>`;

        const row = `<tr>${nameCell}  ${emailCell} ${passwordCell} ${dobCell} ${termsCell}</tr>`;
        return row;
    }).join("\n");

    const rows = tableEntries;
    let details = document.getElementById("details");
    details.innerHTML = rows;
}




const saveForm = (event) => {
    event.preventDefault();
    
    let value = (id) => document.getElementById(id).value;
    let name = value("name"),
    email = value("email"),
    password = value("password"),
    dob = value("dob");

    let terms = document.getElementById("terms").checked;


    // Dob validation When Submit
    element=document.getElementById("dob");
    validate(element);


    if(validate(element)){
        const entry = {
            name,
            email,
            password,
            dob,
            terms
        }
    
        userEntries.push(entry);
    
        localStorage.setItem("user-entries",JSON.stringify(userEntries));
        displayEntries();
        userForm.reset();
    }
    


    
}


userForm.addEventListener("submit",saveForm);
displayEntries();




// Clear custom validity message when the user updates the date input

document.getElementById("dob").addEventListener("input", (event) => {
    event.target.setCustomValidity("");
});



// Age calculation from dob

calculateAge = (dob) => {
    const ageDifMs = Date.now() - new Date(dob).getTime();
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
}


// Dob validation 

function validate(element){
    element.setCustomValidity("");
    dob=element.value;
    age = calculateAge(dob);

    if(age < 18 ){
        
        element.setCustomValidity("Age must be greater than 18");
        element.reportValidity();
        return false;
        

    }
   
    else if( age > 55){
        
        element.setCustomValidity("Age must be less than 55");
        element.reportValidity();
        return false;
    }
    else{
        element.setCustomValidity("");
        return true;
    }
   
    
    
}
