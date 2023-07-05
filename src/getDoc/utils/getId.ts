export default function getID() {
  const id = "CID" + String(Math.trunc(Math.random() * 1000000000));
  return id;
}

export function isCID(CID: string | null) {
  if (CID) {
    if (CID.startsWith("CID") && CID?.length >= 10) {
      return true;
    }
  }
  return false;
}
