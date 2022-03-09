<template>
    <div>
        <h1>Listado de Cursos</h1>
        <div class="courses">
            <div class="list">
                <form @submit.prevent="saveCourse">
                    <!-- sincroniza con course que captura con v-model -->
                    <div>
                        <label for="title">Titulo</label>
                        <br>
                        <input v-model="course.title" type="text" id="title" placeholder="Ingrese el titulo del curso">
                    </div>
                    <div>
                        <label for="description">Descripcion</label>
                        <br>
                        <textarea v-model="course.description" name="" id="description" cols="30" rows="5" placeholder="Ingrese la descripcion del curso"></textarea>
                    </div>
                    <div>
                        <label for="category">Categoria {{ course.category_id }}</label> 
                            <select name="" id="category" v-model="course.category_id">
                                <option value="" selected disabled>Seleccione una categoria</option>
                                <!-- le antepone category- para que el key sea unico  -->
                                <option v-for="category in categories" :key="'category-' + category.id" value="" >
                                    {{ category.name }}
                                </option>
                            </select>
                    </div>
                    <br>

                    <button id="submit">Guardar</button>
                </form>
            </div>
            <div class="list">
                <ul>
                    <li v-for="course in courses" :key="'course-' + course.id">
                        <router-link :to="{ name: 'coursedetails', params: { id: course.id } }">
                            {{ course.title }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>    
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
            }
        }
    },
    // Crea el metodo una vez se haya ejecutado
    created(){
        this.getCategories();
        this.getCourses();
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
            this.axios.get('https://cursos-prueba.tk/api/courses')
                .then(response => {
                    this.courses = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        saveCourse(){
            this.axios.post('https://cursos-prueba.tk/api/courses', this.course)
                .then(response => {
                    this.courses.push(response.data);
                    // this.course = {
                    //     title: '',
                    //     description: '',
                    //     category_id: ''
                    // }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}
</script>

<style>

.courses {
    display: inline-flex;
}

.list {
    padding: 10px;
    width: 50%
}

input {
    width: 240px;
}

select{
    width: 240px;
}

</style>