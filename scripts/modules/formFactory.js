export const formFactory = () => {
    const form = document.createElement("form");
    const labelFactory = (htmlFor, text) => {
        const label = document.createElement("label");
        label.htmlFor = htmlFor;
        label.classList.add("form-label");
        label.textContent = text;
        return label;
    }
    const inputFactory = (type, id, className, ariaDescribedby) => {
        const input = document.createElement("input");
        input.type = type;
        input.id = id;
        input.classList.add(className);
        input.ariaDescribedby = ariaDescribedby;
        return input;
    }
    
    const nameLabel = labelFactory("userName", "Name");
    const nameInput = inputFactory("text", "userName", "form-control", "namelHelp")

    const ageLabel = labelFactory("userAge", "Age");
    const ageInput = inputFactory("text", "userAge", "form-control", "namelHelp")

    const imageLabel = labelFactory("userImage", "Image");
    const imageInput = inputFactory("url", "userImage", "form-control", "namelHelp")

    const genderLabel = labelFactory("userGender", "Gender");
    const genderInput = inputFactory("text", "userGender", "form-control", "namelHelp")

    const fields = [nameLabel, nameInput, ageLabel, ageInput, imageLabel, imageInput, genderLabel, genderInput];

    fields.forEach(el => form.appendChild(el));

    return form;
}