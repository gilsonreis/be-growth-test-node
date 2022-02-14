import { Request, Response } from 'express'

import { getCustomRepository } from 'typeorm'
import PerfilRepository from '@repositories/PerfilRepository'
import Perfil from '@models/Perfil'

class PerfilController {
  public async index (request: Request, response: Response) {
    try {
      const perfilRepository = getCustomRepository(PerfilRepository)

      const { search } = request.query

      const perfis = await perfilRepository.getAll(search)
      return response.status(200).json({
        status: 'success',
        data: {
          perfis: perfis
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  public async view (request: Request, response: Response) {
    try {
      const perfilRepository = getCustomRepository(PerfilRepository)
      const { id } = request.params
      const perfil = await perfilRepository.findOne(id)

      return response.status(200).json({
        status: 'success',
        data: {
          perfil: perfil
        }
      })
    } catch {

    }
  }

  public async store (request: Request, response: Response) {
    try {
      const {
        nome,
        descricao
      } = request.body

      const perfilRepository = getCustomRepository(PerfilRepository)

      const perfilExiste = await perfilRepository.findOne({ where: { nome } })

      if (typeof perfilExiste !== 'undefined') {
        return response.status(409).json({
          status: 'fail',
          data: {
            title: 'Perfil com esse nome já existe no banco de dados.'
          }
        })
      }

      let perfil = new Perfil()
      perfil.nome = nome
      perfil.descricao = descricao
      perfil = await perfilRepository.save(perfil)

      return response.status(201).json({
        status: 'success',
        data: {
          title: 'Perfil cadastrado com sucesso!',
          perfil: perfil
        }
      })
    } catch (err) {
      return {
        status: 'error',
        data: {
          error: response.status(400).json(err)
        }
      }
    }
  }

  public async update (request: Request, response: Response) {
    try {
      const {
        nome,
        descricao
      } = request.body
      const { id } = request.params

      const perfilRepository = getCustomRepository(PerfilRepository)
      const perfilExiste = await perfilRepository.findOne({ where: { nome } })

      if (typeof perfilExiste !== 'undefined') {
        return response.status(409).json({
          status: 'fail',
          data: {
            title: 'Perfil com esse nome já existe no banco de dados.'
          }
        })
      }

      let perfil = await perfilRepository.findOne(id)
      perfil.nome = nome
      perfil.descricao = descricao
      perfil = await perfilRepository.save(perfil)

      return response.status(201).json({
        status: 'success',
        data: {
          title: 'Perfil alterado com sucesso!',
          perfil: perfil
        }
      })
    } catch (err) {
      return {
        status: 'error',
        data: {
          error: response.status(400).json(err)
        }
      }
    }
  }

  public async destroy (request: Request, response: Response) {
    try {
      const { id } = request.params

      const perfilRepository = getCustomRepository(PerfilRepository)
      const perfil = await perfilRepository.findOne(id)
      await perfilRepository.delete(perfil)

      return response.status(200).json({
        status: 'success',
        data: {
          title: 'Perfil deletado com sucesso!'
        }
      })
    } catch (err) {
      return response.status(404).json({
        status: 'error',
        data: {
          title: 'Perfil inexistente!'
        }
      })
    }
  }
}

export default new PerfilController()
