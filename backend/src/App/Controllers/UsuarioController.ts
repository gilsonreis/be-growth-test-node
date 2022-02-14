import { Request, Response } from 'express'

import { getCustomRepository } from 'typeorm'
import UsuarioRepository from '@repositories/UsuarioRepository'
import Usuario from '@models/Usuario'

class UsuarioController {
  public async index (request: Request, response: Response) {
    try {
      const usuarioRepository = getCustomRepository(UsuarioRepository)

      const { search } = request.query

      const usuario = await usuarioRepository.getAll(search)
      return response.status(200).json({
        status: 'success',
        data: {
          usuario: usuario
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

  public async view (request: Request, response: Response) {
    try {
      const usuarioRepository = getCustomRepository(UsuarioRepository)
      const { id } = request.params
      const usuario = await usuarioRepository.findOne(id)

      return response.status(200).json({
        status: 'success',
        data: {
          usuario: usuario
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

  public async store (request: Request, response: Response) {
    try {
      const {
        nome,
        email,
        password,
        cpf,
        cargo,
        perfil,
        status
      } = request.body

      const usuarioRepository = getCustomRepository(UsuarioRepository)

      const usuarioExiste = await usuarioRepository.findOne({ where: { email } })

      if (typeof usuarioExiste !== 'undefined') {
        return response.status(409).json({
          status: 'fail',
          data: {
            title: 'O e-mail informado não está disponível para uso. Tente outro, por favor.'
          }
        })
      }

      let usuario = new Usuario()
      usuario.nome = nome
      usuario.email = email
      usuario.password = password
      usuario.cpf = cpf
      usuario.cargo = cargo
      usuario.perfil = perfil
      usuario.status = status
      usuario = await usuarioRepository.save(usuario)

      delete usuario.password

      return response.status(201).json({
        status: 'success',
        data: {
          title: 'Usuário cadastrado com sucesso!',
          usuario: usuario
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
        // email,
        password,
        // cpf,
        cargo,
        perfil,
        status
      } = request.body
      const { id } = request.params

      const usuarioRepository = getCustomRepository(UsuarioRepository)
      // const usuarioExiste = await usuarioRepository.findOne({ where: { email } })

      let usuario = await usuarioRepository.findOne(id)
      usuario.nome = nome
      // usuario.email = email
      usuario.password = password
      // usuario.cpf = cpf
      usuario.cargo = cargo
      usuario.perfil = perfil
      usuario.status = status
      usuario = await usuarioRepository.save(usuario)

      // delete usuario.password

      return response.status(201).json({
        status: 'success',
        data: {
          title: 'Usuario alterado com sucesso!',
          usuario: usuario
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

      const usuarioRepository = getCustomRepository(UsuarioRepository)
      const usuario = await usuarioRepository.findOne(id)
      await usuarioRepository.delete(usuario)

      return response.status(200).json({
        status: 'success',
        data: {
          title: 'Usuario deletado com sucesso!'
        }
      })
    } catch (err) {
      return response.status(404).json({
        status: 'error',
        data: {
          title: 'Usuario inexistente!'
        }
      })
    }
  }
}

export default new UsuarioController()
