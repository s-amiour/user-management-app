export const putData = async (remoteUrl, userData) => {
    const userUri = `${remoteUrl}/${userData.id}`;
    try {
        // fetch(URI, dict of http data)
        const response = await fetch(userUri, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                my_key: "my_super_secret_phrase"
            },
            body: JSON.stringify(userData)
        });  // performs HTTP method operation
        if (!response.ok){
            throw new Error(`HTTP error; status: ${response.status}`);
        }
        // Separation of concerns: the function both performs network IO. 
        // better to return the result and let the caller update the UI - keep putData free of UI changes
        const data = await response.json();
        return data;
    } catch (err){
        console.error("PUT HTTP method failed:", err);
        throw err;  // rethrow so caller catches it
    }
};