# kanleitosFront

Para compilar o projeto você precisará do **node.js, bower e gulp**
Após o download do **node.js** basta executar os comandos abaixo, no diretório do projeto, para instalação dos pacotes bower e gulp: 
	- **npm install -g bower**
	- **npm install --global gulp-cli**
	
	
**Compilando**
Para compilar o projeto, após tudo instalado, execute os comandos abaixo no diretório do projeto:

	- **npm install**
	- **bower install**
	- **gulp**
	

Quando executar o gulp a **pasta dist** deverá ser criada no diretório. 
**Obsercações:** Após executar o comando gulp você não deve fechar o terminal pois ele fica monitorando as alteração dos arquivos da past src, havendo alterações ele atualiza a pasta dist. 
Para ver a atualização na aplicação basta recarregar o navegador. 

**Executando a aplicação**

Agora é só executar um servidor web a partir da pasta dist do projeto. 
Se preferir pode usar o pacote HTTP-SERVER. 
Para instalar, execute o compando **npm install http-server -g** no diretório do projeto. 
Após a instalação é só abrir outro terminal na pasta dist do projeto e executar **http-server -c-1** e abrir a url "localhost:8080". 


