export default function createSchema(nodes: {}) {
  return (type: string, options: any) => {
    const [name, node] = Object.entries(nodes).find(
      ([name, node]) => name?.toLowerCase() === type?.toLowerCase()
    ) as [string, any];
    return node && node(options);
  };
}
// export default function createSchema(nodes: ((param: any) => void)[]) {
//   return (type: string, options: any) => {
//     const node = nodes.find((node)=>node.name.toLowerCase() === type.toLowerCase())
//     return node && node(options)
//   };
// }
