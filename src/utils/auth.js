// ...existing code...

async function checkToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login';
        return;
    }

    try {
        const response = await fetch('/api/verify-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Token inválido');
        }

        const data = await response.json();
        if (!data.valid) {
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Error verificando el token:', error);
        window.location.href = '/login';
    }
}

// ...existing code...
