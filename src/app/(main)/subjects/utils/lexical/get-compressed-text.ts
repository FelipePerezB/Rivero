export default function GetCompressedText(text: string){
  return `{"root":{"children":[{"children":[{"text":"${text}","direction":null,"format":0,"indent":0,"type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`
}