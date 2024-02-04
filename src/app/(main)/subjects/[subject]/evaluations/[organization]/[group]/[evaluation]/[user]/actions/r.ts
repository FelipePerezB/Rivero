'use server'
export const readImage = async (formData: FormData) => {
  const img = formData.get('image') as File
  if (img) {
    const reader = new FileReader();
  
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        const base64String = event.target.result.split(',')[1];
        console.log(base64String);
        // Aquí puedes hacer lo que quieras con la cadena base64, como enviarla a un servidor, mostrarla en una imagen, etc.
      }
    };
  
    reader.readAsDataURL(img);
  }
  
  console.log(img)
}