import type { DocumentResponseStatus } from "@/components/documents/document-data"

const STORAGE_KEY = "document-responses"

type StoredDocumentResponses = Record<string, DocumentResponseStatus>

function readAll(): StoredDocumentResponses {
  if (typeof window === "undefined") return {}

  const raw = window.sessionStorage.getItem(STORAGE_KEY)
  if (!raw) return {}

  try {
    return JSON.parse(raw) as StoredDocumentResponses
  } catch {
    return {}
  }
}

export function loadDocumentResponse(id: string): DocumentResponseStatus | null {
  return readAll()[id] ?? null
}

export function saveDocumentResponse(id: string, status: DocumentResponseStatus) {
  const all = readAll()
  all[id] = status
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}
