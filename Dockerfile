# Use uma imagem com um servidor web
FROM nginx

# Copie os arquivos para o diretório do servidor web
COPY . /usr/share/nginx/html

# Expõe a porta padrão do Nginx para o mundo externo (porta:80)
EXPOSE 80

# Comando para iniciar o servidor web
CMD ["nginx", "-g", "daemon off;"]