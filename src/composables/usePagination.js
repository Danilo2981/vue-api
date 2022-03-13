// para poder cambiar las constantes se importa ref asi se comporta como una funcion y lo permite
// para poder usar propiedades computadas 
// poner watch en import para usar en el setup
import { ref, computed } from 'vue';
// para poder traer al setup las rutas
import { useRoute, useRouter } from 'vue-router';

export default function usePagination() {
    // Composition api puede ser usado en otros componentes
    // este setup se va a ejecutar antes del componente por lo cual no puede utilizar this.
    // setup tiene sus propios metodos watches etc
    const pagination = ref({});
    const route = useRoute();
    const router = useRouter();
    
    // watch(pagination, (newValue, oldValue) => {
    // })

    // Propiedades Computadas
    // dentro de la constante de la propiedad computada se coloca una funcion anonima
    // Al paginar ya no se utilizara el params, se utilizara query que captura lo que se ponga en la url
    const page = computed(() => {
        // recupera lo que diga page en la ruta y si no pasa nada es 1
        // Como no se puede recuperar la ruta con this se importa userRoute de vuerouter
        let page = route.query.page ?? 1;
        // para poder acceder a la ultima pagina cuando se borra los ultimos mensajes    
        if(page > pagination.value.last_page){
            // remplaza la url con la ultima pagina si la pagina es mayor a la ultima
            router.replace({
                query: {
                    page: pagination.value.last_page 
                }
            });
            return pagination.value.last.page
        }
        return page;   
    }); 

    // Metodos
    const setPagination = (response) => {
        pagination.value = {
            links: response.links,
            last_page: response.last_page
        };
    };
    // captura lo que pasa en la url en page
    const changePage = (url) => {
        router.replace({
            query: {
                page: url.split('page=')[1],
            }
        });
    }

    // para que el componente lo reciba hay que retornar la constante
    return {
        pagination,
        page,
        setPagination,
        changePage
    }
}