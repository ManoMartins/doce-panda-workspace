import {useCallback} from "react";
import { camelCase } from "lodash";
import {useFlash} from "../contexts/useFlash";

export interface Validate {
    tag: string
    field: string
    value: string
    message: string
}

export interface BaseError {
    message: string
    action: string
    statusCode: number
    validate: Validate[]
}

function useError() {
    const flash = useFlash()

    function handle(e: any) {
        let parserValidate

        const message = e.response.data.message || 'Parece que algo deu errado, tente novamente!'

        flash.onOpen({ title: `Ops... ${message}`, variant: "danger" })

        if (e.response.status === 422) {
            parserValidate = validate((e.response.data as BaseError).validate)
        }

        return {
            responseError: e.response.data as BaseError,
            validate: parserValidate
        }
    }


    const validate = useCallback((errors: Validate[]) => {
        return errors.map(error => {
            switch (error.tag) {
                case 'oneof':
                    return {
                        ...error,
                        field: camelCase(error.field),
                        message: `Opções disponíveis ${error.value}`
                    }
                case 'min':
                    return {
                        ...error,
                        field: camelCase(error.field),
                        message: `O campo deve ter no mínimo ${error.value} caracteres`
                    }
                case 'len':
                    return {
                        ...error,
                        field: camelCase(error.field),
                        message: `O campo deve ter ${error.value} caracteres`
                    }
                default:
                    return {
                        ...error,
                        field: camelCase(error.field),
                        message: 'Por favor preencha o campo corretamente'
                    }
            }
        })
    }, [])

    return { handle }
}

export { useError }