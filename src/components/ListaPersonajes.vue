<template>
  <div class="hello">
    <div>
      <b-navbar type="light" variant="light">
        <b-navbar-nav>
          <b-nav-item disabled href="#">Filtrar</b-nav-item>

          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown text="Género" right>
            <b-dropdown-item href="#">Female</b-dropdown-item>
            <b-dropdown-item href="#">Male</b-dropdown-item>
            <b-dropdown-item href="#">Sin Género</b-dropdown-item>
            <b-dropdown-item href="#">Desconocido</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Estado" right>
            <b-dropdown-item href="#">Vivo</b-dropdown-item>
            <b-dropdown-item href="#">Muerto</b-dropdown-item>
            <b-dropdown-item href="#">Desconocido</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <h1 class="titulo">Lista de Personajes</h1>
    <div>
      <b-table
        striped
        hover
        bordered
        :fields="columnas"
        :items="datos"
        class="custom-table"
      >
        <template #cell(imagenPersonaje)="data">
          <BImg :src="`${data.item.image}`" rounded="circle" />
        </template>
        <template #cell(status)="data">
          {{
            `${data.item.status != "unknown" ? data.item.status : "Unknown"}`
          }}
        </template>
        <template #cell(id)="data">
          <BButton class="botonRosa" @click="send(data.item.id, currentPage)"
            >Detalles</BButton
          >
        </template>
      </b-table>
      <div class="paginaNav">
        <b-pagination
          v-model="currentPage"
          pills
          :total-rows="rows"
          size="lg"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ListaPersonajes",
  data() {
    return {
      datos: null,
      loading: true,
      errored: false,
      currentPage: 1,
      rows: 826,
      columnas: [
        {
          label: "Personaje",
          key: "imagenPersonaje",
        },
        {
          label: "Nombre",
          key: "name",
          // sortable: true
        },
        {
          label: "Especie",
          key: "species",
          // sortable: true
        },
        {
          label: "Género",
          key: "gender",
        },
        {
          label: "Estado",
          key: "status",
        },
        {
          label: "Ver más",
          key: "id",
        },
      ],
    };
  },
  mounted() {
    //se activará después de que se encuntre montado

    // var baseURL = 'https://rickandmortyapi.com/graphql';
    // var pagInicial = 1;
    this.getPagina();
  },
  watch: {
    currentPage: function () {
      this.getPagina();
    },
  },
  methods: {
    send(id, page) {
      // console.log("El boton presionado: "+id);
      //console.log(page);
      this.$router.push("/listaDetalles/" + id + "/" + page);
    },
    getPagina() {
      var queryVar = `
          query Characters {
              characters(page: ${this.currentPage}) {
                  results {
                      id
                      image
                      name
                      species
                      gender
                      status
                  }
              }
          }
        `;
      //console.log("Query: "+queryVar);
      this.getInfo(queryVar);
    },
    getInfo(queryVar) {
      var baseURL = "https://rickandmortyapi.com/graphql";
      axios
        .post(baseURL, {
          query: queryVar,
        })
        .then((response) => {
          this.datos = response.data.data.characters.results;
          //console.log(response.data.data.characters.results)
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

img {
  width: 160px; /* Ancho deseado */
  height: auto; /* Altura automática para mantener la proporción */
}
.custom-table {
  background-color: lightgray; /* Cambia lightgray por el color que desees */
}
.b-table {
  text-align: center; /* Centrado horizontal */
  vertical-align: middle; /* Centrado vertical */
}
.titulo {
  color: rgb(251, 149, 166);
  font-weight: bold;
  padding: 10px;
  margin: 20px;
  background: rgb(250, 250, 250);
}
.botonRosa {
  background: rgb(250, 159, 175);
  border: solid rgb(255, 255, 255);
}

.paginaNav {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
}
</style>
