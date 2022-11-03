import Dates from "./class/Dates.js";
import UI from "./class/UI.js";

import { petInput, ownerInput, cellphoneInput, dayInput, hourInput, symptomsInput, form } from "./selectors.js"

const manageDates = new Dates();
const ui = new UI(manageDates);

let editing;

const dateObj = {
    petName: "",
    owner: "",
    cellphone: "",
    day: "",
    hour: "",
    symptoms: ""
}

export function dateFiles(e) {
    dateObj[e.target.name] = e.target.value;
}

//Validate form files and add appointments
export function newDate(e) {
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

export function resetObj() {
    dateObj.petName = "",
    dateObj.owner = "",
    dateObj.cellphone = "",
    dateObj.day = "",
    dateObj.hour = "",
    dateObj.symptoms = ""
}

export function deleteDates (id) {
    //Delete date
    manageDates.deleteDate(id);

    ui.showAlert("The date has been deleted successfully");

    ui.printDates(manageDates);

    console.log(manageDates);

}

export function editDates(date) {
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