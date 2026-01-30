import crypto from "crypto";

export function sha256Hext(text){
    return crypto.createHash("sha256").update(text,"utf-8").digest("hex");
}