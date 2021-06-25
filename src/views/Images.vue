<template>
  <b-container class="mt-5">
    <b-row>
      <b-col lg="4" class="pb-2">
        <b-button variant="outline-success" size="lg" @click="upImage()">
          <b-icon icon="arrow-down-up" aria-hidden="true"></b-icon> &nbsp;
          Actualizar imagen</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col md="6" offset-md="4">
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

        </b-card>
      </b-col>
    </b-row>
    <b-row v-for="(img,index) in imgs" :key="index">
      <b-img-lazy
        v-bind="mainProps"
        :src="`http://localhost/img-gallery/public/images/${img.url}`"
        alt="Image 1"
      ></b-img-lazy>
      
    </b-row>
    <b-modal id="bv-modal-example" hide-footer>
      <template #modal-title> Actualizar Imagen </template>
      <div class="d-block text-center">
        <!-- <h3>Hello From This Modal!</h3> -->
        <b-form-group label-cols-sm="2" class="mb-5" label-size="lg">
          <b-form-input
            v-model="img.name"
            placeholder="Ingresa el nombre de la imagen"
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-sm="2" class="mb-5" label-size="lg">
          <b-form-textarea
            id="textarea"
            v-model="img.description"
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
            v-model="img.url"
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
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Images",
  data: function() {
    return {
      id: 0,
      img: [],
      imgs:[],
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#bbb",
        width: 600,
        height: 400,
        class: "my-5",
      },
    };
  },
  created: function() {
    this.init();
  },
  methods: {
    init: async function() {
      this.id = this.$route.params.id;
      // console.log(this.id);
      let dataStorage = JSON.parse(localStorage.getItem("dataLogin"));
      try {
        let res = await axios.get(`/images/${this.id}`, {
          headers: {
            // Accept: "application/json",
            Authorization: `Bearer ${dataStorage.data.token}`,
          },
        });
        // console.log(res)
        if (res.status == 200) {
          this.img = res.data.data
          
        }
      } catch (error) {}

      try {
        let res = await axios.get(`/imageslist/${this.id}`, {
          headers: {
            // Accept: "application/json",
            Authorization: `Bearer ${dataStorage.data.token}`,
          },
        });
        console.log('sss',res.data)
        if (res.status == 200) {
          this.imgs = res.data.data
          
        }
      } catch (error) {}
      
    },
    upImage: function() {
      this.$bvModal.show("bv-modal-example");
    },
    getImageUrl(imageId) {
      const { width, height } = this.mainProps;
      return `https://picsum.photos/${width}/${height}/?image=${imageId}`;
    },
    onChangeImage: function(event) {
      let preview = document.getElementById("seccion-preview");
      preview.style.display = "block";
      let output = document.getElementById("img-preview");
      output.src = URL.createObjectURL(event.target.files[0]);
      output.onload = function() {
        URL.revokeObjectURL(output.src); // free memory
      };
      
      this.img.url = event.target.files[0];
    },
    saveImg: async function() {
      // console.log(this.form);
      let dataStorage = JSON.parse(localStorage.getItem("dataLogin"));
      this.img.user_id = dataStorage.data.id;
      let data = new FormData();
      data.append('image',this.img.url)
      data.append('user_id',this.img.user_id)
      data.append('name',this.img.name)
      data.append('description',this.img.description);
      data.append('_method', 'patch');
      // console.log(dataStorage.data.token);
      try {
        let res = await axios.post("/images/"+this.id, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
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
