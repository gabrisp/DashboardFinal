import LocalStorageManager from "./localStorage";

const APIURL = "https://bildy-rpmaya.koyeb.app/api/";


// USER
const createUser = async (fName, lName, email, password) => {
    const response = await fetch(APIURL + "user/register", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({email, password}),
    });
    const data = await response.json();
    return data;
};

const updateUser = async (token, fName, lName, email, password, nif = "40000000W") => {
    const response = await fetch(APIURL + "user/register", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "PUT",
        body: JSON.stringify(
        {
            name: fName,
            surnames: lName,
            nif: nif,
            email, 
            password
        }
    ),
    });
    const data = await response.json();
    return data;
};


const loginUser = async (email, password) => {
    const response = await fetch(APIURL + "user/login", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({email, password}),
    });
    const data = await response.json();
    LocalStorageManager.setToken(data.token);
    return data;
};  

const getUser = async (token) => {
    console.log(LocalStorageManager.getToken());
    if (!token) {
        return null;
    }
    const response = await fetch(APIURL + "user", {
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`
        }
    });
    const data = await response.json();
    return data;
};

const validateToken = async (code, token, data) => {
    try {
        const response = await fetch(APIURL + "user/validation", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            method: "PUT",
            body: JSON.stringify({ code }),
        });

        // Check if the response status is OK (200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const finishUser = await updateUser(token, data.fName, data.lName, data.email, data.password, data.nif);
        return finishUser; // Return the parsed data
    } catch (error) {
        console.error("Error validating token:", error.message);
        throw error; // Optionally rethrow the error if it should be handled further up
    }
};



const uploadLogo = async (id, image) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
        const response = await fetch(
            `https://bildy-rpmaya.koyeb.app/api/client/logo/${id}`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${LocalStorageManager.getToken()}`,
                },
                body: formData,
            }
        );

        if (response.ok) {
            const data = await response.json();
            console.log('Response:', data);
        } else {
            const error = await response.text();
            console.error('Error response:', error);
        }
    } catch (error) {
        console.error('Error uploading logo:', error);
    }

};

// CLIENT
const createClient = async (client, image) => {
    const response = await fetch(APIURL + "client", {
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(client),
    });
    const data = await response.json();
    if (image) {
        await uploadLogo(data._id, image);
    }
    return data;
};

const getClients = async () => {
    const response = await fetch(APIURL + "client", {
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`
        }
    });
    return response.json();
};  

const getClient = async (id) => {
    const response = await fetch(APIURL + `client/${id}`, {
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`
        }
    });
    const data = await response.json();
    return data;
};  
const deleteClient = async (id) => {
    const response = await fetch(APIURL + `client/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`
        }
    });
    const data = await response.json();
    return data;
};

const updateClient = async (id, client) => {
    const response = await fetch(APIURL + `client/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(client),
    });
    const data = await response.json();
    return data;
};

const activateProject = async (id, active) => {
    const response = await fetch(APIURL + `project/activate/${id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({active: active}),
    });
    const data = await response.json();
    return data;
};

// PROJECT
const getProjects = async () => {
    const response = await fetch(APIURL + "project", {
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`
        }
    });
    const data = await response.json();
    return data;
};
const getProjectsByClient = async (id) => {
    const response = await fetch(APIURL + `project/${id}`, {
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`,
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data;
};
const getProject = async (id) => {
    const response = await fetch(APIURL + `project/one/${id}`, {
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`
        }
    });
    const data = await response.json();
    return data;
};  

const createProject = async (project) => {
    const response = await fetch(APIURL + "project", {
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(project),
    });
    const data = await  response.json();
    return data;
};

const updateProject = async (id, project) => {
    const response = await fetch(APIURL + `project/${id}`, {
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`,
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(project),
    });
    const data = await response.json();
    return data;
};  

// DELIVERY NOTE
const createDeliveryNote = async (deliveryNote) => {
    const response = await fetch(APIURL + "deliverynote", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(deliveryNote),
    });
    const data = await response.json();
    return data;
};  
const getDeliveryNotesByProject = async (id) => {
    const response = await fetch(APIURL + `deliverynote/project/${id}`, {
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`
        }
    });
    const data = await response.json();
    return data;
};
const updateDeliveryNote = async (id, deliveryNote) => {
    const response = await fetch(APIURL + `deliverynote/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(deliveryNote),
    });
    const data = await response.json();
    return data;
};

const getDeliveryNote = async () => {
    const response = await fetch(APIURL + "deliverynote", {
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`
        }
    });
    return response.json();
};  

const getDeliveryNoteById = async (id) => {
    const response = await fetch(APIURL + `deliverynote/${id}`, {
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`
        }
    });
    const data = await response.json();
    return data;
};

const downloadDeliveryNote = async (id) => {
    const response = await fetch(APIURL + `deliverynote/pdf/${id}`, {
        headers: {
            "Authorization": `Bearer ${LocalStorageManager.getToken()}`,
        }
    });

    // Check if the response is OK
    if (!response.ok) {
        throw new Error('Failed to download the delivery note');
    }

    const blob = await response.blob(); // Get the response as a Blob
    const url = window.URL.createObjectURL(blob); // Create a URL for the Blob
    const a = document.createElement('a'); // Create a temporary anchor element
    a.href = url; // Set the href to the Blob URL
    a.download = `delivery_note_${id}.pdf`; // Set the desired file name
    document.body.appendChild(a); // Append the anchor to the body
    a.click(); // Programmatically click the anchor to trigger the download
    a.remove(); // Remove the anchor from the document
    window.URL.revokeObjectURL(url); // Clean up the Blob URL
};



const APIConnect = {
    user: {
        create: createUser,
        login: loginUser,
        validate: validateToken,
        get: getUser,
    },  
    clients: {
        create: createClient,
        get: getClients,
        getOne: getClient,
        delete: deleteClient,
        update: updateClient,
        uploadLogo: uploadLogo,
    },  
    projects: {
        get: getProjects,
        getOne: getProject,
        create: createProject,
        update: updateProject,
        getByClient: getProjectsByClient,
        activate: activateProject,
    },  
    deliveryNote: {
        create: createDeliveryNote,
        get: getDeliveryNote,
        download: downloadDeliveryNote,
        getOne: getDeliveryNoteById,
        update: updateDeliveryNote,
        getByProject: getDeliveryNotesByProject,
    },  
};

export default APIConnect;