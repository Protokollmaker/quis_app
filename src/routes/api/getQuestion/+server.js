
export const GET = async() => {
    let gotfile = false;
    let urlString = "https://hilarious-tapioca-0a4523.netlify.app/IHK-Prüfung";
    let sendFile = {}
    while (!gotfile){
        let response = await fetch(urlString+'/index.json');
        let jsonData = await response.json();
        console.log(jsonData);
        if (jsonData.folders.length != 0){
            var randomfolder = jsonData.folders[Math.floor(Math.random()*jsonData.folders.length)];
            urlString += "/"+randomfolder;
            console.log(urlString);
            continue;
        }
        if (jsonData.files != 0){
            var randomfile = jsonData.files[Math.floor(Math.random()*jsonData.files.length)];
            urlString += "/"+randomfile;
            break;
        }
    }
    let response = await fetch(urlString);
    sendFile = await response.json();
    return new Response(JSON.stringify(sendFile), { status: 200 });
}