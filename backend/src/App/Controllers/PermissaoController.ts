import { Request, Response } from 'express'

import { getCustomRepository } from 'typeorm'
import PermissaoRepository from '@repositories/PermissaoRepository'
import Permissao from '@models/Permissao'

class PermissaoController {
  public async index (request: Request, response: Response) {
    try {
      const permissaoRepository = getCustomRepository(PermissaoRepository)

      const { search } = request.query

      const permissoes = await permissaoRepository.getAll(search)
      return response.status(200).json({
        status: 'success',
        data: {
          permissoes: permissoes
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  public async view (request: Request, response: Response) {
    try {
      const permissaoRepository = getCustomRepository(PermissaoRepository)
      const { id } = request.params
      const permissao = await permissaoRepository.findOne(id)

      return response.status(200).json({
        status: 'success',
        data: {
          permissao: permissao
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

      const permissaoRepository = getCustomRepository(PermissaoRepository)

      const permissaoExiste = await permissaoRepository.findOne({ where: { nome } })

      if (typeof permissaoExiste !== 'undefined') {
        return response.status(409).json({
          status: 'error',
          data: {
            title: 'Permissão com esse nome já existe no banco de dados.'
          }
        })
      }

      let permissao = new Permissao()
      permissao.nome = nome
      permissao.descricao = descricao
      permissao = await permissaoRepository.save(permissao)

      return response.status(201).json({
        status: 'success',
        data: {
          title: 'Permissão cadastrado com sucesso!',
          permissao: permissao
        }
      })
    } catch {

    }
  }

  public async update (request: Request, response: Response) {
    try {
      const {
        nome,
        descricao
      } = request.body
      const { id } = request.params

      const permissaoRepository = getCustomRepository(PermissaoRepository)
      const permissaoExiste = await permissaoRepository.findOne({ where: { nome } })

      if (typeof permissaoExiste !== 'undefined') {
        return response.status(409).json({
          status: 'error',
          data: {
            title: 'Permissão com esse nome já existe no banco de dados.'
          }
        })
      }

      let permissao = await permissaoRepository.findOne(id)
      permissao.nome = nome
      permissao.descricao = descricao
      permissao = await permissaoRepository.save(permissao)

      return response.status(201).json({
        status: 'success',
        data: {
          title: 'Permissão alterado com sucesso!',
          permissao: permissao
        }
      })
    } catch (err) {
      return response.status(400).json(err)
    }
  }

  public async destroy (request: Request, response: Response) {
    try {
      const { id } = request.params

      const permissaoRepository = getCustomRepository(PermissaoRepository)
      const permissao = await permissaoRepository.findOne(id)
      await permissaoRepository.delete(permissao)

      return response.status(200).json({
        status: 'success',
        data: {
          title: 'Permissão deletado com sucesso!'
        }
      })
    } catch (err) {
      return response.status(404).json({
        status: 'fail',
        data: {
          title: 'Permissão inexistente!'
        }
      })
    }
  }
}

export default new PermissaoController()
