<template>
    <div>
         <h1>{{ course.title }}</h1>
        <p>{{ course.description }}</p>
        <p>
            <b>Categoria: </b>
            {{ course.category.name }}
        </p>

        <!-- Como segundo parametro le pasamos el id del curso para editar ese id -->
        <router-link :to="{ name:'courseedit', 
            params:{
                id: course.id 
        }}">
            Editar curso
        </router-link>
    </div>
</template>

<script>
export default {
    data(){
        return {
            course: {}
        }
    },
    created(){
        this.getCourse();
    },
    methods:{
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
        }
    }
}
</script>

<style>

</style>