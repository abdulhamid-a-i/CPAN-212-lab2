import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import { PATHS, STORAGE_MODE } from "../config.js";
import {nowIso} from "./time.js";


async function ensureDirs() {
    const dirs = [PATHS.DATA_DIR, PATHS.BLOB_DIR, PATHS.EXPORT_DIR];
    if (STORAGE_MODE === "sync"){
        for (const d of dirs) fs.mkdirSync(d,{recursive: true});
        if (!fs.existsSync(PATHS.DOC_INDEX)) fs.writeFileSync(PATHS.DOC_INDEX, "[]","utf-8");
        if (!fs.existsSync(PATHS.AUDIT_LOG)) fs.writeFileSync(PATHS.AUDIT_LOG, "", "utf-8");
        return;
    }
    for (const d of dirs) await fsp.mkdir(d, {recursive:true});
    try { await fsp.access(PATHS.DOC_INDEX); } catch { await fsp.writeFile(PATHS.DOC_INDEX, "[]", "utf-8");}
    try {await fsp.access(PATHS.AUDIT_LOG); } catch {await fsp.writeFile(PATHS.AUDIT_LOG, "", "utf-8")}
}

export async function readIndex() {
    await ensureDirs();
    if (STORAGE_MODE === "sync"){
        const txt = fs.readFileSync(PATHS.DOC_INDEX, "utf-8");
        return JSON.parse(txt || "[]");
    }
    const txt = await fsp.readFile(PATHS.DOC_INDEX,"utf-8");
    return JSON.parse(txt || "[]");
}

export async function writeIndex(docs) {
    await ensureDirs();
    const json = JSON.stringify(docs, null, 2);
    if (STORAGE_MODE === "sync"){
        const tmp = `${PATHS.DOC_INDEX}.tmp`;
        fs.writeFileSync(tmp,json,"utf8");
        fs.renameSync(tmp, PATHS.DOC_INDEX);
        return;
    }
    const tmp = `${PATHS.DOC_INDEX}.tmp`;
    fsp.writeFileSync(tmp,json,"utf8");
    fsp.renameSync(tmp, PATHS.DOC_INDEX);

}

export async function writeBlob(docid, text){
    await ensureDirs();
    const filePath = path.join(PATHS.BLOB_DIR, `${docId}.txt`);
    
}

export async function readBlob(docid){

}

export async function writeExport(filename, payload){

}

export async function appendAudit(eventObj){

}