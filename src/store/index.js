import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { axiosConfig } from '../main'
import router from '../router'
import Swal from "sweetalert2";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        usuario: '',
        error: ''
    },
    mutations: {
        setUsuario(state, usuario) {
            state.usuario = usuario
        },
        setError(state, error) {
            state.error = error
        }
    },
    actions: {
        async iniciarSesion({ commit }, usuario) {
            let config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            try {
                const query = await axios.post(axiosConfig.baseURL + 'auth/signin', usuario, config);
                // console.log(query)
                let userLogueado = {
                    token: query.data.token,
                    codigo: query.data.codigo
                }
                commit('setUsuario', userLogueado)
                console.log('Usuario Conectado');
                //*****************************Almacenando Usuario**************************
                localStorage.setItem('data-token', query.data.token)
                localStorage.setItem('data-codigo', query.data.codigo)
                    //*****************************Fin Usuario******************************
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (a) => {
                        a.addEventListener('mouseenter', Swal.stopTimer)
                        a.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Login Exitoso!'
                }).then(() => {
                    router.push({ name: 'Dashboard' })
                })
            } catch (err) {
                // console.log(err.response)
                let errSesion = {
                    code: err.response.status,
                    titleMessage: err.response.statusText,
                    message: err.response.data.message
                }
                if (err) commit('setError', errSesion)
                Swal.fire({
                    icon: 'error',
                    title: errSesion.titleMessage,
                    text: errSesion.message
                })
            }
        },
        async createAccount({ commit }, usuario) {
            const query = await axios.post(axiosConfig.baseURL + 'auth/register', usuario)
                // console.log(query)
                /* let newAccount = {
                    token: query.data.token,
                    codigo: query.data.codigo
                } */
                // commit('setUsuario', newAccount)
            if (query.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro',
                    text: query.data.message,
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    console.log('Cuenta Creada')
                    router.push({ name: 'Login' })
                })
            }
        },
        async cerrarSesion({ commit }) {
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem('data-token')
                },
            };
            const query = await axios.post(axiosConfig.baseURL + 'auth/logout', null, config)
                // console.log(query)
            Swal.fire({
                icon: 'success',
                title: 'Logout',
                text: query.data.message,
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                commit('setUsuario', null)
                console.log('Usuario Desconectado');
                //*****************************Almacenando Usuario**************************
                localStorage.removeItem('data-token')
                localStorage.removeItem('data-codigo')
                    //*****************************Fin Usuario******************************
                router.push({ name: 'Login' })
            })
        },
        detectarUsuario({ commit }, usuario) {
            if (usuario == null) {
                commit('setUsuario', null)
            } else {
                let user = {
                    token: localStorage.getItem('data-token'),
                    codigo: localStorage.getItem('data-codigo')
                }
                commit('setUsuario', user)
            }
        }
    },
    modules: {},
})