import { NextFunction, Request, Response } from 'express'
import * as Yup from 'yup'
import { pt } from 'yup-locale-pt'

Yup.setLocale(pt)

export default async (request: Request, response: Response, next: NextFunction) => {
  try {
    const schema = Yup.object().shape({
      beer_type: Yup.string().min(4).required().trim(),
      min_temp: Yup.number().required(),
      max_temp: Yup.number().required()
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
