import fs from 'fs';

export const  GET = ()  => {
  const folderPath = "../IHK-Prüfung/2005/Teil1"
  let retys = true;
  let randomFile = "";
  while (retys){
    const files = fs.readdirSync(folderPath);
    const randomIndex = Math.floor(Math.random() * files.length);
    randomFile = files[randomIndex];
    if (randomFile.endsWith(".png"))
      retys = false;
  }
  
  const fileContent = fs.readFileSync(`${folderPath}/${randomFile}`, 'utf-8');
  return new Response(fileContent, {status: 200});
  }