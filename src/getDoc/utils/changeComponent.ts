type props = { type: string; options: any };
export default function changeComponent(
  component: props,
  data: props,
  config?: {
    delete?: boolean;
    addChild?: boolean;
    newChild?: props;
  }
) {
  if (component.options?.id === data.options?.id) {
    if(config?.newChild){
      component.options.children.push(config.newChild)
    }
    component.options = data.options;
    return;
  } else {
    component?.options?.children?.forEach((child: props, i: number) => {
      if (child?.options?.id === data.options?.id) {
        if(config?.newChild){
          child.options.children.push(config.newChild)
        } else if(config?.delete){
          component.options.children.splice(i, 1)
        } 
        child.options = data.options;
        return;
      } else changeComponent(child, data, config);
    });
  }
}
