import { type UserInPaperType } from "~/types/types";

export const boxCitation = (data: UserInPaperType[], selectedOption: string) => {
  if (data && Array.isArray(data)) {
    let orderBy = false;
    if(data[0]?.paper){
      if( data[0].paper?.citation_count < 1 ){
        orderBy = true;
      }
    }
    const min = data[data.length-1]?.paper?.citation_count;
    const max = data[0]?.paper?.citation_count;

    if(min !== undefined && max !== undefined){
      
      const range = max - min;
      const colorsBox = !orderBy ? ['#4FC15433', '#A7B74833', '#FF918957'] : ['#FF918957', '#A7B74833', '#4FC15433'];
      const colorsText = !orderBy ? ['#4FC154', '#A7B748', '#FB6257'] : ['#FB6257', '#A7B748', '#4FC154'];

      data.forEach((obj) => {
        if(obj.paper){
          const relativePosition = (obj.paper.citation_count - min) / range;
          obj.paper.colorBox = colorsBox[Math.floor((1 - relativePosition) * (colorsBox.length - 1))];
          obj.paper.colorText = colorsText[Math.floor((1 - relativePosition) * (colorsText.length - 1))]; 
        }
      });
    }

    if (selectedOption === 'date') {
      data.forEach((obj, i) => {
        if(obj.paper.colorBox === undefined){
          obj.paper.colorBox = data[i-1]?.paper.colorBox
          obj.paper.colorText = data[i-1]?.paper.colorText
        }
      });
    }
  }
  return data;
}