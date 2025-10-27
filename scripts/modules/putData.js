export const putData = async (remoteUrl, userData) => {
    const userUri = `${remoteUrl}/${userData.id}`;
    try {
        // fetch(URI, dict of http data)
        const response = await fetch(userUri, {
            method: "PUT",
            header: {
                "Content-Type": "application/json",
                my_key: "my_super_secret_phrase"
            },
            body: JSON.stringify(userData)
        });  // performs HTTP method operation
        if (!response.ok){
            throw new Error(`HTTP error; status: ${response.status}`);
        }
        const data = await response.json();
        document.querySelector(".modal-body").innerHTML = `
        <div class="d-flex justify-content-center align-items-center" style="height: 312px;">
            <div class="alert alert-success" role="alert">${data.message}</div>
        </div>
        `;
    } catch (error){
        console.log(error);
        throw error;
    }
};