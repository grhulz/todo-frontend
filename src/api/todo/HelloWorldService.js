import axios from 'axios'
import {API_URL} from '../../Constants.js'

class HelloWorldService {
    executeHelloWorldService() {
        return axios.get(`${API_URL}/hello-world`)
    }
    executeHelloWorldBeanService() {
        return axios.get(`${API_URL}/hello-world-bean`)
    }
    executeHelloWorldPathVariableService(name) {
        // let username = 'in28minutes'
        // let password = 'dummy'
        // let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
        return axios.get(`${API_URL}/hello-world/path-variable/${name}`
            // ,
            // {
            //     headers:{
            //         authorization:basicAuthHeader
            //     }
            // }

            )
    }
}

export default new HelloWorldService()