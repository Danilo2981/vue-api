<template lang="">
    <div class="container">
        <h1>Login</h1>
        <div class="card mx-auto">
            <div class="card-body">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="email" class="mb-1 text-black">Email</label>
                        <input type="email" v-model="email" class="form-control" placeholder="Ingresa tu email">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="mb-1 text-black">Password</label>
                        <input type="password" v-model="password" class="form-control" placeholder="Ingresa tu password">
                    </div>
                    <button class="btn btn-primary">Inicie sesión</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            email: '',
            password: ''
        }
    },
    methods:{
        login(){
            this.axios.post('/api/login', {
                gran_type: 'password'
            })
        }
    }    
}
</script>
<style lang="">
    
</style>