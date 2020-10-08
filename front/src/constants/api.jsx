import ENV from './env'

const BASE_URL = ENV.BASE_URL;

export default {
    BASE_URL,
    V1: {
        AD: {
            INDEX: BASE_URL+'/v1/ad',
            LIST: {
                BORBIER: BASE_URL+'/v1/ad/list/borbier'
            }
        },
        FILE: BASE_URL+'/v1/file'
    }
}
