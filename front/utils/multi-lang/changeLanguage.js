import { i18n } from '../../lib/i18n'
import cookie from 'js-cookie'
import axios from "axios"
import {COOKIE_LANG} from "../../constant"


export const changeLanguage = (lang) =>{
    cookie.set(COOKIE_LANG, lang, { path: '/' });
    axios.defaults.headers.common['locale'] = lang // for all requests
    i18n.changeLanguage(lang)
}

