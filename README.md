Essa API foi criada usando Express e Typescript. Para o banco de dados, foi utilizado o PostgreSQL hospedado no Supabase.

Ela possui 1 endpoint responsável por 4 operações:

- [X] : `GET` -> `/tasks` - Esse método retorna todas as notas já criadas no sistema.

- [X] : `POST` -> `/tasks` - Esse método é responsável peça criação de uma nova nota. Recebe no corpo JSON 4 informações na exata mesma ordem: "title", "description", "color", "favorite"

- [X] : `PATCH` -> `/tasks` - Esse método é o endpoint usado para realizar a edição das notas, incluindo também a troca de cores e também a adição ou remoção dos favoritos. Portanto, ele precisa receber um corpo JSON com pelo menos uma das 4 informações citadas no endpoint do tipo`POST`

- [X] : `DELETE` -> `/tasks` - Esse é o método que deleta uma nota tanto do front end quant do back end do sistema. 

A API pode ser usada pela seguinte URL: https://todo-api-jijk.onrender.com/
