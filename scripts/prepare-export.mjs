import { copyFile, readdir } from 'node:fs/promises';
import path from 'node:path';

// Next's static export can emit nested RSC segment files while the client requests
// dot-delimited names. Keep both forms so plain static hosts serve client navigation.
const root=path.resolve('out');
let copied=0;
async function visit(directory){
  for(const entry of await readdir(directory,{withFileTypes:true})){
    const file=path.join(directory,entry.name);
    if(entry.isDirectory()){await visit(file);continue}
    if(!entry.isFile()||!entry.name.endsWith('.txt'))continue;
    const parts=path.relative(root,file).split(path.sep);
    const index=parts.findIndex(part=>part.startsWith('__next.'));
    if(index<0||index===parts.length-1)continue;
    const alias=path.join(root,...parts.slice(0,index),parts.slice(index).join('.'));
    await copyFile(file,alias);copied++;
  }
}
await visit(root);
console.log(`Prepared ${copied} static route-data aliases.`);
