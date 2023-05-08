export const GET = async () => {
    const gotfile = false;
    let urlString = "https://ihk-quiz.netlify.app/IHK-Prüfung";
    let sendFile = {}
    while (!gotfile) {
        const response = await fetch(urlString + '/index.json');
        const jsonData = await response.json();
        console.log(jsonData);
        if (jsonData.folders.length != 0) {
            const randomfolder = jsonData.folders[Math.floor(Math.random() * jsonData.folders.length)];
            urlString += "/" + randomfolder;
            console.log(urlString);
            continue;
        }
        if (jsonData.files != 0) {
            const randomfile = jsonData.files[Math.floor(Math.random() * jsonData.files.length)];
            urlString += "/" + randomfile;
            break;
        }
    }
    const response = await fetch(urlString);
    sendFile = await response.json();
    return new Response(JSON.stringify(sendFile), { status: 200 });
}