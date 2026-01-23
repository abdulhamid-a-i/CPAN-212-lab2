import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// DEFINING ENVIRONMENT VARIABLES
export const PORT = 3000;

export const STORAGE_MODE = "async";

export const ROOT_DIR = path.resolve(_dirname, "..");

export const PATHS = {
    PUBLIC_DIR: path.join(ROOT_DIR, "public"),
    DATA_DIR: path.join(ROOT_DIR, "data"),
    DOC_INDEX: path.join(ROOT_DIR, "documents.json"),
    AUDIT_LOG: path.join(ROOT_DIR, "audit.log"),
    BLOB_DIR: path.join(ROOT_DIR, "blobs"),
    EXPORT_DIR: path.join(ROOT_DIR, "exports")
}

export const LIMITS = {
    MAX_BODY_BYTES: 1_000_000,
    MAX_DOC_BYTES: 200_00
}

export const ENUMS = {
    DOC_TYPES: ["ID_PROOF", "ADDRESS_PROOF", "BANK_STATEMENT", "SIGNED_FORM"],
    STATUSES: ["RECIEVED", "VALIDATED", "QUEUED", "PROCESSED", "REJECTED"],
    CONTENT_TYPES: ["text/plain"]
};

export const TRANSITIONS = {
    RECIEVED: ["VALIDATED", "REJECTED"],
    VALIDATED: ["QUEUED", "REJECTED"],
    QUEUED: ["PROCESSED", "REJECTED"],
    PROCESSED: [],
    REJECTED: []
};