import qs from "query-string";
import axios from "axios";

function redirectToGithub(data) {
  const GITHUB_AUTH_URL = 'https://www.amazon.com/ap/oa';
  const params = {
    response_type: 'code',
    scope: 'profile',
    client_id: "",
    redirect_uri: "https://authalexa-front.tiagoamaral4.repl.co/success.html",
    state: `${data.id}-${data.email}`,
  }

  const queryStrings = qs.stringify(params);
  const authorizationUrl = `${GITHUB_AUTH_URL}?${queryStrings}`;
  window.location.href = authorizationUrl;
}

window.onload = async () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async function (event) {
      event.preventDefault(); // Impede o envio padrão do formulário

      const form = event.target;
      const formData = new FormData(form); // Obtém os dados do formulário automaticamente
      console.log(formData);
      const response = await axios.post('https://api-newsletter.tiagoamaral4.repl.co/api/user',{
          email: formData.get('email'), // Obter o valor do campo 'email' do FormData
          password: formData.get('password') // Obter o valor do campo 'password' do FormData
      });
      if (response.data) {
        redirectToGithub(response.data);
      }
    });  
}