<template>
    
    <div>
        <h1>Listado de Cursos</h1>
        <div class="courses">
            <div class="list">
                <ul v-if="errors.length > 0">
                    <li v-for="error in errors" :key="error.id">
                        {{error}}
                    </li>
                </ul>
                <form @submit.prevent="saveCourse" class="mb-4">
                    <!-- sincroniza con course que captura con v-model -->
                    <div class="mb-2">
                        <label for="title">Titulo</label>
                        <br>
                        <input v-model="course.title" type="text" id="title" placeholder="Ingrese el titulo del curso">
                    </div>
                    <div>
                        <label for="description">Descripcion</label>
                        <br>
                        <textarea v-model="course.description" name="" id="description" cols="30" rows="5" placeholder="Ingrese la descripcion del curso"></textarea>
                    </div>
                    <div class="mb-2">
                        <label for="category">Categoria</label> 
                            <select name="" id="category" v-model="course.category_id">
                                <option value="" selected disabled>Seleccione una categoria</option>
                                <!-- le antepone category- para que el key sea unico  -->
                                <option v-for="category in categories" :key="'category-' + category.id" :value="category.id" >
                                    {{ category.name }}
                                </option>
                            </select>
                    </div>           
                    <button type="submit" class="btn btn-primary btn-sm">Guardar</button>
                </form>
            </div>
            <div class="list">
                <ul>
                    <li v-for="course in courses" :key="'course-' + course.id" class="mb-2">
                        <router-link :to="{ name: 'coursedetails', params: { id: course.id } }">
                            {{ course.title }}
                        </router-link>

                         -
                        <button @click="deleteCourse(course.id)" class="btn btn-danger btn-sm">
                            Eliminar
                        </button>
                    </li>
                </ul>
                <div class="d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <!-- desabilita los botones previous en pagina 1 y next en pagina ultima con class: -->
                            <li v-for="pagination_link in pagination_links" 
                            :key="'pagination_link-' + pagination_link.label" class="page-item"                            
                            :class="{
                                'disabled' : pagination_link.url == null,
                                'active': pagination_link.active
                            }">
                                <!-- el clik del boton le pasa la url que esta navegando -->
                                <!-- v-html pasa el codigo de la paginacion en html -->
                                <a class="page-link" 
                                    @click="changePage(pagination_link.url)"
                                    v-html="pagination_link.label" 
                                    style="cursor: pointer">                                
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>    
    {{page}}
</template>

<script>
export default {
    // Define la propiedad a extraer de la base
    data(){
        return {
            categories: [],
            courses: [],
            // aca captura los datos obtenidos de la api dentro de un objeto
            course: {
                title: '',
                description: '',
                category_id: ''
            },
            errors: [],
            pagination_links: [],
        }
    },
    // Crea el metodo una vez se haya ejecutado
    created(){
        this.getCategories();
        this.getCourses();
    },
    // Al paginar ya no se utilizara el params, se utilizara query que captura lo que se ponga en la url
    computed: {
        page(){
            // recupera lo que diga page en la ruta y si no pasa nada es 1
            return this.$route.query.page ?? 1;
        }
    },
    // Utiliza get para conseguir los datos a traves de axios
    methods: {
        getCategories(){
            this.axios.get('https://cursos-prueba.tk/api/categories')
                .then(response => {
                    this.categories = response.data;
                })
                .catch(error => {
                    console.log(error);
                })    
        },
        getCourses(){
            // per_page=10 pagina de 10 en  10
            // &page= asigna el numero de pagina en el que se encuentra 
            this.axios.get('https://cursos-prueba.tk/api/courses?per_page=10' + '&page=' + this.page )
                .then(response => {
                    // res consigue lo que esta en data per page
                    let res = response.data;
                    // le pasamaos el res para que coja solo lo paginado
                    this.courses = res.data;
                    // recuperamos los links de pagination de la api
                    this.pagination_links = res.links;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        saveCourse(){
            // trae la informacion del objeto course y lo pasa como informacion en el segundo parametro
            this.axios.post('https://cursos-prueba.tk/api/courses', this.course)
                .then(response => {
                    // Recupero con response la data y lo pongo en courses con push para ponerle 
                    // en el array courses
                    this.courses.push(response.data);
                    // Aca se limpia el formulario para que quede en blanco
                    this.course = {
                        title: '',
                        description: '',
                        category_id: ''
                    }
                    // Reseteamos los errores a 0
                    this.errors = [];
                })
                .catch(error => {
                    // error aparece como obejto hay que transformarlo a un array
                    let errors = Object.values(error.response.data.errors).flat();
                    // una vez convertido en arraya se pasa la funcion flat para que elimine los arrays
                    this.errors = errors;
                })
        },
        deleteCourse(id){
            // Concatenar con el ID para poder borrar el curso
            this.axios.delete('https://cursos-prueba.tk/api/courses/' + id)
                .then( () => {
                    // Filtra los cursos que no tienen el mismo id para mostrarlos en la lista
                    this.courses = this.courses.filter(course => course.id != id);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        changePage(url){
            let page = url.split('page=')[1];

            this.$router.replace({
                query:
            });
        }
    }
}
</script>

<style>

.courses {
    display: inline-flex;
}

.list {
    width: 50%
}

input {
    width: 240px;
}

select{
    width: 240px;
}

</style>