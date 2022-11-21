import * as Yup from 'yup'


export const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required().email(),
    gender: Yup.string().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string().required(),
    phoneNumber: Yup.string().required(),
    documentNumber: Yup.string().required(),
})
