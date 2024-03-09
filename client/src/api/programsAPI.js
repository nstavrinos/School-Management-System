const baseUrl = 'http://localhost:5000/';

async function getAll(endpoint) {
    // Fetch programms data from your API
    try {
        const response = await fetch(`${baseUrl}${endpoint}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getById(endpoint, id) {
    try {
        const response = await fetch(`${baseUrl}${endpoint}/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function create(endpoint, data) {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

async function update(endpoint, id, data) {
    try {
        const response = await fetch(`${baseUrl}${endpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

async function remove(endpoint, id) {
    try {
    
        const response = await fetch(`${baseUrl}${endpoint}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

export { getAll, getById, create, update, remove };
