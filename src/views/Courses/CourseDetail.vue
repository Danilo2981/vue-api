<template>
    <div>
         <h1>{{ course.title }}</h1>
        <p>{{ course.description }}</p>
        <p>
            <b>Categoria: </b>
            {{ course.category }}
        </p>
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