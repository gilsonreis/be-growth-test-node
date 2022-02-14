import { NextFunction, Request, Response } from 'express'
import * as Yup from 'yup'
import { pt } from 'yup-locale-pt'
import { validateCPF } from 'validations-br'

Yup.setLocale(pt)

export default async (request: Request, response: Response, next: NextFunction) => {
  try {
    const schema = Yup.object().shape({
      nome: Yup.string().required().trim(),
      email: Yup.string().email().required().trim(),
      password: Yup.string().min(6).required().trim(),
      password_check: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Senhas precisam ser iguais'),
      cpf: Yup.string().required().trim().test('is-cnpj',
        'CPF não é válido!',
        (value) => validateCPF(value)),
      cargo: Yup.string().trim(),
      perfil: Yup.string().required().uuid().trim(),
      status: Yup.string().trim()
    })

    await schema.validate(request.body, { abortEarly: false })
    return next()
  } catch (err) {
    return response.status(400).json({
      status: 'error',
      message: err.inner
    })
  }
}
