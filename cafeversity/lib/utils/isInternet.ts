import dns from "dns";


async function isInternet() {
    try {
        await dns.promises.resolve("google.com");
        return true;
    } catch {
        return false;
    }
}

export default isInternet;
