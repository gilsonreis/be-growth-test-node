import { NextFunction, Request, Response } from 'express'
import * as Yup from 'yup'
import { pt } from 'yup-locale-pt'

Yup.setLocale(pt)

export default async (request: Request, response: Response, next: NextFunction) => {
  try {
    const schema = Yup.object().shape({
      nome: Yup.string().required().trim(),
      password: Yup.string().trim().test(
        'empty-or-6-characters-check',
        'Senha precisa ter pelo menos 6 caracteres',
        password => !password || password.length >= 6
      ),
      password_check: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Senhas precisam ser iguais'),
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
