import qs from "query-string";
import axios from "axios";

window.onload = async () => {
  const { code, state } = qs.parseUrl(window.location.href).query;
  if (code) {
    const resultDiv = document.getElementById('result');
    try {
      const response = await axios.post(`https://authalexa.tiagoamaral4.repl.co/login`, {
        code,
        state 
      });
      const user = response.data;
      console.log(user);
      resultDiv.innerHTML = `
                            <p>${user.access_token}</p>
                            <p>${user.refresh_token}</p>
                            <p>${user.expires_in}</p>
      `;
      return user;
    } catch (err) {
      alert("ops, deu algum xabú");
      console.log("err", err);
    }
  }
}