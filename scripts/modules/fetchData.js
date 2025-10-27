export const fetchData = async (url) => {  // arrow function
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "my_key":"my_super_secret_phrase"
            }
        });  // fetch url
        if (!response.ok){
            throw new Error(`HTTP error. status: ${response.status}`);  // catch error
        }
        // use `` for formatted strings, not "" nor ''
        const data = await response.json()
        return data
    } catch (error){
        console.log(error);
        throw error;
    }
}