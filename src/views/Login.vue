<template>
  <div>
    <b-container class="pt-5">
      <b-row class="pt-5">
        <b-col class="pt-5" md="6" offset-md="4">
          <b-card title="Login Gallery" style="max-width: 25rem;">
            <b-form @submit="onSubmit">
              <b-form-group id="input-group-1" label-for="input-1" class="mb-2">
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  placeholder="Ingresa tu email"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="form.password"
                  placeholder="Ingresa tu contraseña"
                  required
                  type="password"
                  class="mb-2"
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary">Entrar</b-button>
            </b-form>
            <b-row>
                <router-link to="/registro">Registrate</router-link>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Login",
  data: function() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit: async function(event) {
      event.preventDefault();
      try {
          let res = await axios.post('login',this.form);
          if (res.data.success) {
              location.href = "home";
          }
          localStorage.setItem('dataLogin', JSON.stringify(res.data))
      } catch (error) {
          console.log(error)
      }
    },
  },
};
</script>
