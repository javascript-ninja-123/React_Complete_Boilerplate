


export const fileReader = (file) => {
const reader  = new FileReader();
if(file) {
   reader.readAsText(file);
}
reader.onloadend = () => {
  console.log(reader.result)
};
}
