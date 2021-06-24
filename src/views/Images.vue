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

          <b-button href="#" variant="danger">
            <b-icon icon="trash" aria-hidden="true"></b-icon> &nbsp;
            Eliminar</b-button
          >
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-img-lazy
        v-bind="mainProps"
        :src="getImageUrl(80)"
        alt="Image 1"
      ></b-img-lazy>
      <b-img-lazy
        v-bind="mainProps"
        :src="getImageUrl(82)"
        alt="Image 2"
      ></b-img-lazy>
      <b-img-lazy
        v-bind="mainProps"
        :src="getImageUrl(84)"
        alt="Image 3"
      ></b-img-lazy>
      <b-img-lazy
        v-bind="mainProps"
        :src="getImageUrl(85)"
        alt="Image 4"
      ></b-img-lazy>
      <b-img-lazy
        v-bind="mainProps"
        :src="getImageUrl(88)"
        alt="Image 5"
      ></b-img-lazy>
      <b-img-lazy
        v-bind="mainProps"
        :src="getImageUrl(90)"
        alt="Image 6"
      ></b-img-lazy>
      <b-img-lazy
        v-bind="mainProps"
        :src="getImageUrl(92)"
        alt="Image 7"
      ></b-img-lazy>
      <b-img-lazy
        v-bind="mainProps"
        :src="getImageUrl(94)"
        alt="Image 8"
      ></b-img-lazy>
    </b-row>
    <b-modal id="bv-modal-example" hide-footer>
      <template #modal-title> Actualizar Imagen </template>
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
  </b-container>
</template>

<script>
export default {
  name: "Images",
  data: function() {
    return {
      id: 0,
      img: [],
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
    init: function() {
      this.id = this.$route.params.id;
      console.log(this.id);
      this.img = {
        id: 1,
        name: "Hola",
        url: "https://picsum.photos/600/300/?image=25",
        description: "Lorem impsu",
        date: "2020-06-15",
      };
    },
    upImage: function() {
      this.$bvModal.show("bv-modal-example");
    },
    getImageUrl(imageId) {
      const { width, height } = this.mainProps;
      return `https://picsum.photos/${width}/${height}/?image=${imageId}`;
    },
  },
};
</script>
