import { LIMITS } from "../config";

export function parseJsonBody(req){
    return new Promise((resolve, reject) => {
        let bytes = 0;
        const chunks = [];
        // on is an event listener
        req.on("data", (chunk) => {
            bytes += chunk.length;
            if (bytes > LIMITS.MAX_BODY_BYTES){
                reject(new Error("Request body too large"));
                req.destroy;
                return;
            }
            chunks.push(chunk);
        });
        
        req.on("end", () => {
            try{
                const raw = Buffer.concat(chunks).toString("utf-8").trim();
                if (!raw) return resolve({});
                resolve(JSON.parse(raw));
            } catch {
                reject(new Error("Invalid JSON"));
            }
        });

        req.on("error",(err) => reject(err));
    })
}