<template>
  <div class="hello">
    <h1 class="titulo">Detalles de personaje</h1>
    <div>
      <!-- <div>
        <b-alert show variant="dark">
          <h4 class="alert-heading">Upss!</h4>
          <p>
            No existe el personaje número {{`${this.$route.params.id}`}}.
          </p>
          <hr>
          <p class="mb-0">
            Regresa a la lista de personajes y elige uno para ver sus detalles.
          </p>
        </b-alert>
      </div> -->
      <b-table stacked  :fields="columnas" :items="datos" class="custom-table">
        <template #cell(image)="data">
          <BImg :src="`${data.item.image}`" />
        </template>
        <template #cell(origin)="data">
          {{`${data.item.origin.type}`}}: {{`${data.item.origin.name}`}} <br> {{`${data.item.origin.dimension}`}}
        </template>
        <template #cell(location)="data">
          {{`${data.item.location.type}`}}: {{`${data.item.location.name}`}} <br> {{`${ (data.item.location.dimension != 'unknown') ? data.item.location.dimension : '' }`}}
        </template>
        <template #cell(episode)="data">
          <ul v-for="(ep, id) in data.item.episode" :key="id">
            <li>
              {{ ep.id }}. {{ ep.name }}
            </li>
          </ul>
        </template>
      </b-table>
        <div class="posicionIzq">
            <BButton size="lg" class="botonRosa" @click="regresar(this.$route.params.page)" >Volver a Lista de Personajes</BButton>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ListaDetalles",
  data() {
    return {
      id: 1,
      datos: null,
      loading: true,
      errored: false,
      columnas: [
        {
          label: "Personaje",
          key: "id",
        },
        {
          label: "Nombre",
          key: "name"
        },
        {
          label: "Imagen",
          key: "image",
        },
        {
          label: "Especie",
          key: "species"
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
          label: "Origen",
          key: "origin",
        },
        {
          label: "Última locación conocida",
          key: "location",
        },
        {
          label: "Episodios",
          key: "episode",
        }
      ]
    };
  },
  methods: {
    regresar(){
      this.$router.push('/');
    }
  },
  mounted() {
      //se activará después de que se encuntre montado

      // Accede al objeto $route para obtener información sobre la ruta actual
      // console.log('Ruta actual:', this.$route.path);
      // console.log('ID de Usuario:', this.$route.params.id);

      var queryVar = `
              query CharactersByIds {
                  charactersByIds(ids: "${this.$route.params.id}") {
                      name
                      species
                      id
                      status
                      gender
                      origin {
                          name
                          type
                          dimension
                      }
                      location {
                          name
                          type
                          dimension
                      }
                      image
                      episode {
                          name
                          id
                      }
                  }
              }
          `;

      //console.log("la query es: "+queryVar);
      axios
        .post("https://rickandmortyapi.com/graphql", {
          query: queryVar,
        })
        .then((response) => {
          // console.log(response);
          // console.log(response.data.data.charactersByIds[0]);
          this.datos = response.data.data.charactersByIds;
          // console.log(this.datos);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
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
a {
  color: #42b983;
}

img {
  width: 400px; /* Ancho deseado */
  height: auto; /* Altura automática para mantener la proporción */
  border-radius: 10px;
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

</style>
