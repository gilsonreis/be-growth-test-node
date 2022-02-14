import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UsuarioRepository from "@repositories/UsuarioRepository";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";

class AuthController {
  public async logar (request: Request, response: Response) {
    try {
      const {
        email,
        password
      } = request.body;

      console.log(request.body);

      const usuarioRepository = getCustomRepository(UsuarioRepository);

      const usuario = await usuarioRepository.getByEmail(email);

      let error = null;
      if (typeof usuario === "undefined") {
        return response.status(401).send({
          status: "fail",
          data: {
            title: "Dados de acessos estão incorretos!"
          }
        });
      }

      const passwordOk = compareSync(password, usuario.password);

      if (!passwordOk) {

        return response.status(401).send({
          status: "fail",
          data: {
            title: "Dados de acessos estão incorretos!"
          }
        });
      }

      const permissoes = await usuarioRepository.getPermissoesByUserPerfil(usuario.perfil.id);

      delete usuario.password;

      const token = sign({
        usuario,
        permissoes
      }, process.env.JWT_SECRET_TOKEN, {
        subject: usuario.id,
        expiresIn: "1d"
      });

      return response.status(200).json({
        status: "success",
        data: {
          usuario,
          permissoes,
          token
        }
      });
    } catch (err) {
      return response.status(400).json({
        status: "error",
        data: {
          error: err.message
        }
      });
    }
  }
}

export default new AuthController();
