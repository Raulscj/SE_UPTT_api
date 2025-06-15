# SE_UPTT_api

# Comandos de instalacion del proyecto
- npm init -y
- yarn init
- yarn add express morgan cors
- yarn add --dev @types/node

- yarn add typeorm 
- yarn add reflect-metadata
- yarn add sqlite3
- yarn add dotenv
- yarn add jsonwebtoken
- yarn add bcrypt

# Pautas para correr el servidor 
- Se debe crear en la raiz del proyecto un archivo .env 
- Tomar del .env.example los datos que se deben completar en el archivo .env, 
los datos se pueden modificar a gusto, cabe destacar que la constante DATABASE representara
el nombre de la base de datos. Una vez completado se debe ejecutar:
- yarn install
- yarn dev
Ya con esos datos el servidor estaria ejecutandose, en el terminal debes ver el mensaje 
[Running successfully] como indicador de que todo esta ok.
- De momento la unica ruta activa es:
get[http://localhost:3306/admin] 
post[http://localhost:3306/admin/login] 