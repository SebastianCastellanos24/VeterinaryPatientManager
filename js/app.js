const petInput = document.querySelector("#petName");
const ownerInput = document.querySelector("#owner");
const cellphoneInput = document.querySelector("#cellphone");
const dayInput = document.querySelector("#day");
const hourInput = document.querySelector("#hour");
const symptomsInput = document.querySelector("#symptoms");

const form = document.querySelector("#new-date");

const dateBox = document.querySelector("#dates");

let editing;

class Dates {
    constructor() {
        this.dates = [];
    }

    addDate(date) { 
        this.dates = [...this.dates, date];
    }

    deleteDate(id){
        this.dates = this.dates.filter( date => date.id !== id )
    }

    editDate(dateEdited) {
        this.dates = this.dates.map( date => date.id === dateEdited.id ? dateEdited : date )
    }

}

class UI {

    showAlert(message, type) {
        if(type === "error") {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message,
                showConfirmButton: false,
                timer: 2000,
            })
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: message,
                showConfirmButton: false,
                timer: 2000,
            })
        }
    }

    printDates({dates}) {
        
        this.cleanHTML();

        dates.map( date => {

            const { petName, owner, cellphone, day, hour, symptoms, id } = date;
            const divDate = document.createElement("div");
            divDate.classList.add("date", "p-3");
            divDate.dataset.id = id;

            const petParagraph = document.createElement("h2");
            petParagraph.classList.add("card-title", "font-weight-bolder");
            petParagraph.textContent = petName;

            const ownerParagraph = document.createElement("p");
            ownerParagraph.innerHTML = `
                <span class="font-weight-bolder">Owner: </span> ${owner}
            `

            const cellphoneParagraph = document.createElement("p");
            cellphoneParagraph.innerHTML = `
                <span class="font-weight-bolder">Cellphone: </span> ${cellphone}
            `

            const dayParagraph = document.createElement("p");
            dayParagraph.innerHTML = `
                <span class="font-weight-bolder">Date: </span> ${day}
            `
            const hourParagraph = document.createElement("p");
            hourParagraph.innerHTML = `
                <span class="font-weight-bolder">Hour: </span> ${hour}
            `

            const symptomsParagraph = document.createElement("p");
            symptomsParagraph.innerHTML = `
                <span class="font-weight-bolder">Symptoms: </span> ${symptoms}
            `

            const btnDelete = document.createElement("buttom");
            btnDelete.classList.add("btn", "btn-danger", "mt-2", "mr-2");
            btnDelete.innerHTML = 'Delete <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';

            btnDelete.onclick = () => deleteDates(id);

            const btnEdit = document.createElement("buttom");
            btnEdit.classList.add("btn", "btn-info", "mt-2");
            btnEdit.innerHTML = 'Edit <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>'

            btnEdit.onclick = () => editDates(date);

            divDate.appendChild(petParagraph);
            divDate.appendChild(ownerParagraph);
            divDate.appendChild(cellphoneParagraph);
            divDate.appendChild(dayParagraph);
            divDate.appendChild(hourParagraph);
            divDate.appendChild(symptomsParagraph);
            divDate.appendChild(btnDelete);
            divDate.appendChild(btnEdit);


            dateBox.appendChild(divDate);
        })

    }

    cleanHTML(){
        while(dateBox.firstChild){
            dateBox.removeChild(dateBox.firstChild);
        }
    }

}

const ui = new UI();
const manageDates = new Dates();

eventListeners();
function eventListeners() {
    petInput.addEventListener("blur", dateFiles);
    ownerInput.addEventListener("blur", dateFiles);
    cellphoneInput.addEventListener("blur", dateFiles);
    dayInput.addEventListener("blur", dateFiles);
    hourInput.addEventListener("blur", dateFiles);
    symptomsInput.addEventListener("blur", dateFiles);

    form.addEventListener("submit", newDate);
}

const dateObj = {
    petName: "",
    owner: "",
    cellphone: "",
    day: "",
    hour: "",
    symptoms: ""
}

function dateFiles(e) {
    dateObj[e.target.name] = e.target.value;
}

//Validate form files and add appointments
function newDate(e) {
    e.preventDefault();

    const { petName, owner, cellphone, day, hour, symptoms } = dateObj;

    if( petName === "" || owner === "" || cellphone === "" || day === "" || hour === "" || symptoms === "" ) {
        ui.showAlert("All files are required", "error");
        console.log(dateObj);
        return;
    }

    if(editing) {
        ui.showAlert("The date was edited successfully");

        manageDates.editDate({...dateObj})
        
        form.querySelector('button[type="submit"]').textContent = "Create date";

        editing = false;

    } else {
        dateObj.id = Date.now();

        manageDates.addDate({...dateObj});
        
        ui.showAlert("The date was added successfully");
    }

    //Reset Obj
    resetObj();

    //Reset form
    form.reset();

    //Show HTML
    ui.printDates(manageDates);

}

function resetObj() {
    dateObj.petName = "",
    dateObj.owner = "",
    dateObj.cellphone = "",
    dateObj.day = "",
    dateObj.hour = "",
    dateObj.symptoms = ""
}

function deleteDates (id) {
    //Delete date
    manageDates.deleteDate(id);

    ui.showAlert("The date has been deleted successfully");

    ui.printDates(manageDates);

    console.log(manageDates);

}

function editDates(date) {
    const { petName, owner, cellphone, day, hour, symptoms, id } = date;

    petInput.value = petName;
    ownerInput.value = owner;
    cellphoneInput.value = cellphone;
    dayInput.value = day;
    hourInput.value = hour;
    symptomsInput.value = symptoms;

    //Add info form the global obj
    dateObj.petName = petName;
    dateObj.owner = owner;
    dateObj.cellphone = cellphone;
    dateObj.day = day;
    dateObj.hour = hour;
    dateObj.symptoms = symptoms;
    dateObj.id = id;

    form.querySelector('button[type="submit"]').textContent = "Save changes";

    editing = true;

}