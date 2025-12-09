# TECCON - Guia de Conexão (Versão Produção)

Este projeto já está configurado para hospedagem em qualquer servidor web (Apache, Nginx, IIS, cPanel, Vercel, etc).

## 📦 Como Gerar os Arquivos para Hospedagem

Para obter a pasta com os arquivos finais (HTML, CSS, JS) prontos para upload:

1. **Instale as dependências** (se ainda não fez):
   ```bash
   npm install
   ```

2. **Gere o Build**:
   ```bash
   npm run build
   ```

3. **Localize os Arquivos**:
   Após o comando acima, será criada uma pasta chamada **`dist`** na raiz do projeto.

---

## 🚀 Como Colocar no Servidor

### Opção 1: Servidor de Arquivos (FTP / cPanel / Apache / Nginx)
Esta é a opção para "hospedagem externa" tradicional.

1. Abra a pasta **`dist`** que foi gerada.
2. Copie **todo o conteúdo** de dentro dela (arquivo `index.html`, `manifest.json` e a pasta `assets`).
3. Cole na pasta pública do seu servidor (geralmente chamada de `public_html`, `www` ou `htdocs`).
4. **Pronto!** O site funcionará imediatamente.
   *Nota: Graças à configuração `base: './'`, o site funcionará mesmo se você colocá-lo dentro de uma subpasta (ex: `seusite.com/manuais/teccon`).*

### Opção 2: Vercel / Netlify (Moderno)
Se preferir usar serviços de nuvem:
1. Conecte este repositório ao Vercel ou Netlify.
2. O sistema fará o build e deploy automaticamente.

---

## 📱 Funcionalidades
- **PWA**: O site pode ser instalado no celular/desktop.
- **Responsivo**: Funciona em TV, Mobile e Desktop.
- **Impressão**: Botão "Salvar PDF" gera um documento limpo em A4.
