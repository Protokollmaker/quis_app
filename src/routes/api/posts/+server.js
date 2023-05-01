
export const GET = async() => {
    return new Response(JSON.stringify({message:"Hello"}), {status: 200})
}