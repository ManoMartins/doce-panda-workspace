import * as Yup from 'yup'


export const schema = Yup.object().shape({
    name: Yup.string().required(),
    gender: Yup.string().required(),
    email: Yup.string().required().email(),
    phoneNumber: Yup.string().required(),
    documentNumber: Yup.string().required(),
})
