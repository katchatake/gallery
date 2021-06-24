<template>
  <div>
    <b-container class="pt-5">
      <b-row class="pt-5">
        <b-col class="pt-5" md="6" offset-md="4">
          <b-card title="Registro Gallery" style="max-width: 25rem;">
            <b-form @submit="onSubmit">
              <b-form-group id="input-group-1" label-for="input-1" class="mb-2">
                <b-form-input
                  id="input-1"
                  v-model="form.name"
                  placeholder="Ingresa tu nombre"
                  required
                ></b-form-input>
              </b-form-group>

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
              <b-form-group id="input-group-2" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="form.c_password"
                  placeholder="Ingresa nuevamente tu contraseña"
                  required
                  type="password"
                  class="mb-2"
                ></b-form-input>
              </b-form-group>
                              
                <b-button type="submit" variant="primary"
                  >Registrarse</b-button
                >             
            </b-form>
            <b-row>
                <router-link to="/">Login</router-link>
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
  name: "Registro",
  data: function() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        c_password: "",
      },
    };
  },
  methods: {
    onSubmit: async function(event) {
      event.preventDefault();
       try {
          let res = await axios.post('register',this.form);
          console.log(res)
          if (res.data.success) {
              location.href = "/";
          }
      } catch (error) {
          console.log(error)
      }
    },
  },
};
</script>
