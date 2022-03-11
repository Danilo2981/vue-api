<template lang="">
    <div>
        <h1>Aca podras editar el curso</h1>
        <ul v-if="errors.length > 0">
            <li v-for="error in errors" :key="error.id">
                {{error}}
            </li>
        </ul>
        <form @submit.prevent="updateCourse">
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
                <label for="category">Categoria</label> 
                    <select name="" id="category" v-model="course.category_id">
                        <option value="" selected disabled>Seleccione una categoria</option>
                        <!-- le antepone category- para que el key sea unico  -->
                        <option v-for="category in categories" :key="'category-' + category.id" :value="category.id" >
                            {{ category.name }}
                        </option>
                    </select>
            </div>
            <br>                    
            <button type="submit">Guardar</button>
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            categories: [],
            course: {},
            errors: []
        }
    },
    created(){
        this.getCourse();
        this.getCategories();
    },
    methods:{
        getCategories(){
            this.axios.get('https://cursos-prueba.tk/api/categories')
                .then(response => {
                    this.categories = response.data;
                })
                .catch(error => {
                    console.log(error);
                })    
        },
        getCourse(){
            // obtiene con params el id del curso
            // included permite relacionar la categoria en otra tabla
            this.axios.get('https://cursos-prueba.tk/api/courses/' + this.$route.params.id + '?included=category')
                .then(response => {
                    this.course = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        updateCourse(){
            // obtiene con params el id del curso
            // included permite relacionar la categoria en otra tabla
            // en update hay quepasarle el course como segundo parametro
            this.axios.put('https://cursos-prueba.tk/api/courses/' + this.$route.params.id, this.course)
                .then( () => {
                    // reenviamos a la ruta de detalles una vez actualizado y y le paso el id editado
                    this.$router.push({ name: 'coursedetails', params: { id: this.$route.params.id } });
                    this.errors = [];
                })
                .catch(error => {
                    // error aparece como obejto hay que transformarlo a un array
                    let errors = Object.values(error.response.data.errors).flat();
                    // una vez convertido en arraya se pasa la funcion flat para que elimine los arrays
                    this.errors = errors;
                })
        }
    }
    
}
</script>
<style lang="">
    
</style>