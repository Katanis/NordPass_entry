import { API } from '~/constants';
import getUrl from '../utils/getUrl';
const logout = async () => {
    const url = getUrl(API.Logout)

    await fetch(url, {
        headers: {
            authorization:
                `${localStorage.getItem('token')}`,
        }
    }).catch((error) => console.error(error.message))
    localStorage.removeItem('token');
};

export default logout;