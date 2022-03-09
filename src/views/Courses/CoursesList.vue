<template>
    <h1>Listado de Cursos</h1>
    <div>
        <ul>
            <li v-for="course in courses" :key="course.id">
                <router-link :to="{ name: 'coursedetails', params: { id: course.id } }">
                    {{ course.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    // Define la propiedad a extraer de la base
    data(){
        return {
            courses: []
        }
    },
    // Crea el metodo una vez se haya ejecutado
    created(){
        this.getCourses()
    },
    // Utiliza get para conseguir los datos a traves de axios
    methods: {
        getCourses(){
            this.axios.get('https://cursos-prueba.tk/api/courses')
                .then(response => {
                    this.courses = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}
</script>

<style>

</style>