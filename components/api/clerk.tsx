export async function Clerk_backendApi_users(mode:string = 'boolean',userId: string) {
    const url = `https://api.clerk.com/v1/users/${userId}`;
    const authToken = `Bearer ${process.env.CLERK_SECRET_KEY}`;
    try {
        const options = {
            method: 'GET',
            contentType: 'application/json',
            headers: {
                Authorization: authToken,
            },
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Request was not successful');
        };
        const result = await response.json();
        if(mode==='boolean'){
            return true;
        }else{
            return result;
        };
    } catch (error: any) {
        console.log('Error message:', error.message);
        return false;
    }
};