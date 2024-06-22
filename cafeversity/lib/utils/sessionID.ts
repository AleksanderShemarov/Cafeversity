import { v4 as uuidv4 } from 'uuid';


function createSessionsIdAndCookies() {
    return uuidv4();
}

export default createSessionsIdAndCookies;
