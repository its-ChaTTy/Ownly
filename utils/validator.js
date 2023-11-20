const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const nameRegex = /^[a-zA-Z ]{3,40}$/;

const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*).*$/;

const phoneRegex = /^\d{10}$/;

function createValidator(re) {
    return (candidate) => re.test(candidate);
}

export const isEmail = createValidator(emailRegex);
export const isPassword = createValidator(passwordRegex);
export const isPhone = createValidator(phoneRegex);
export const isName = createValidator(nameRegex);