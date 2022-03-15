<template>
    <div>
         <h1>{{ course.title }}</h1>
        <p>{{ course.description }}</p>
        <p>
            <b>Categoria: </b>
            {{ category.name }}
        </p>

        <!-- Como segundo parametro le pasamos el id del curso para editar ese id -->
        <!-- pasa el id del parametro por que aun no obtiene el id de la funcion -->
        <router-link :to="{ name:'courseedit', 
            params:{
                id: this.$route.params.id
        }}">
            Editar curso
        </router-link>
    </div>
</template>

<script>
export default {
    data(){
        return {
            course: {},
            // arregla error de carga 
            category: {}
        }
    },
    created(){
        this.getCourse();
    },
    methods:{
        getCourse(){
            // obtiene con params el id del curso
            // included permite relacionar la categoria en otra tabla
            this.axios.get('/api/courses/' + this.$route.params.id + '?included=category')
                .then(response => {
                    this.course = response.data;
                    this.category = response.data.category;
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