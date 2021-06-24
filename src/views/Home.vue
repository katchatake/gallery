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
            :sub-title="img.date"
            :img-src="img.url"
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
          <b-form-file
            id="file-large"
            size="lg"
            @change="onChangeImage($event)"
            v-model="img"
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

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data: function() {
    return {
      img: null,
      images: [
        {
          id: 1,
          name: "Hola",
          url: "https://picsum.photos/600/300/?image=25",
          description: "Lorem impsu",
          date: "2020-06-15",
        },
        {
          id: 1,
          name: "Hola como",
          url: "https://picsum.photos/600/300/?image=65",
          description: "Lorem impsu",
          date: "2020-06-15",
        },
        {
          id: 1,
          name: "Hola como estas",
          url: "https://picsum.photos/600/300/?image=25",
          description: "Lorem impsu",
          date: "2020-06-15",
        },
        {
          id: 1,
          name: "Hola kjsdhgfkjsd",
          url: "https://picsum.photos/600/300/?image=95",
          description: "Lorem impsu",
          date: "2020-06-15",
        },
        {
          id: 1,
          name: "Holdfsfsdfda",
          url: "https://picsum.photos/600/300/?image=5",
          description: "Lorem impsu",
          date: "2020-06-15",
        },
        {
          id: 1,
          name: "Hosdfsdfla",
          url: "https://picsum.photos/600/300/?image=125",
          description: "Lorem impsu",
          date: "2020-06-15",
        },
      ],
    };
  },
  methods: {
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
    },
    saveImg: function() {
      console.log(this.img);
    },
  },
};
</script>
