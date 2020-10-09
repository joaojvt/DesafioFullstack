# Rotas

- POST /login - rota para autenticação de usuário login e senha. retorna token.
- GET /me - rota que retorna dados do usuário com base o token.
- GET /user/:user_id - rota que retorna dados de um usuário especifico.
- GET /users - rota que retorna todos os usuários.
- POST /user - rota para adicionar usuário novo.
- PATCH /user/:user_id - rota para atualização de usuário.
- DELETE /user/:user_id - rota para deletar usuário.
- GET /user/:filter - rota para pesquisa realizada com filtro por nome.