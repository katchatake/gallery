<template>
  <div>
    <b-container class="mt-5">
      <b-row>
        <b-col lg="4" class="pb-2">
          <b-button variant="outline-success" size="lg" @click="addImg()">
            <b-icon icon="plus-circle" aria-hidden="true"></b-icon> &nbsp;
            Agregar imagen</b-button
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col
          v-for="(img, index) in images"
          :key="index"
          col
          md="4"
          class="mt-5"
        >
          <b-card
            :title="img.name"
            :sub-title="img.created_at"
            :img-src="`http://localhost/img-gallery/public/images/${img.url}`"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              {{ img.description }}
            </b-card-text>

            <router-link
              :to="{ path: `images/${img.id}` }"
              class="btn btn-outline-primary"
              >Ver historial</router-link
            >
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-modal id="bv-modal-example" hide-footer>
      <template #modal-title> Agregar Imagen </template>
      <div class="d-block text-center">
        <!-- <h3>Hello From This Modal!</h3> -->
        <b-form-group label-cols-sm="2" class="mb-5" label-size="lg">
          <b-form-input
            v-model="form.name"
            placeholder="Ingresa el nombre de la imagen"
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-sm="2" class="mb-5" label-size="lg">
          <b-form-textarea
            id="textarea"
            v-model="form.description"
            placeholder="Ingresa la descripcion de la imagen"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group label-cols-sm="2" class="mb-5" label-size="lg">
          <b-form-file
            id="file-large"
            size="lg"
            @change="onChangeImage($event)"
            
          ></b-form-file>
        </b-form-group>
        <b-row id="seccion-preview" style="display:none">
          <b-img src="#" id="img-preview" fluid alt="Responsive image"></b-img>
        </b-row>
      </div>
      <b-container>
        <b-row>
          <b-button
            class="mt-3"
            variant="outline-success"
            block
            @click="saveImg()"
            >Guardar</b-button
          >
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data: function() {
    return {
      form: {
        img: null,
        name: "",
        description: "",
        user_id: 0,
      },
      images: [],
    };
  },
  created:function(){
    this.init();
  },
  methods: {
    init: async function(){
      let dataStorage = JSON.parse(localStorage.getItem("dataLogin"));
      try {
        let res = await axios.get("/images", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${dataStorage.data.token}`,
          },
        });
        // console.log(res)
        if (res.status == 200) {
          this.images = res.data.data
        }
      } catch (error) {}
    },
    addImg: function() {
      this.$bvModal.show("bv-modal-example");
    },
    onChangeImage: function(event) {
      let preview = document.getElementById("seccion-preview");
      preview.style.display = "block";
      let output = document.getElementById("img-preview");
      output.src = URL.createObjectURL(event.target.files[0]);
      output.onload = function() {
        URL.revokeObjectURL(output.src); // free memory
      };
      this.form.img = event.target.files[0];
    },
    saveImg: async function() {
      // console.log(this.form);
      let dataStorage = JSON.parse(localStorage.getItem("dataLogin"));
      this.form.user_id = dataStorage.data.id;
      let data = new FormData();
      data.append('image',this.form.img)
      data.append('user_id',this.form.user_id)
      data.append('name',this.form.name)
      data.append('description',this.form.description)
      // console.log(dataStorage.data.token);
      try {
        let res = await axios.post("/images", data, {
          headers: {
            // Accept: "application/json",
            Authorization: `Bearer ${dataStorage.data.token}`,
          },
        });
        // console.log(res)
        if (res.status == 200) {
          this.init();
          this.$bvModal.hide("bv-modal-example");
        }
      } catch (error) {}
    },
  },
};
</script>
