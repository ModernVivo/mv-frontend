import { maxBy, minBy, get } from "lodash";

import { type UserInPaperType } from "~/types/types";

export const SORT_BY = {
  CITATION_COUNT: "citation_count",
  PUB_DATE: "pub_date",
};

// export const boxCitation = (data: UserInPaperType["paper"][], selectedOption: string) => {
//   if (data && Array.isArray(data)) {
//     let orderBy = false;
//     if(data[0]){
//       if( data[0].citation_count < 1 ){
//         orderBy = true;
//       }
//     }
//     const min = data[data.length-1]?.citation_count;
//     const max = data[0]?.citation_count;

//     if(min !== undefined && max !== undefined){

//       const range = max - min;
//       const colorsBox = !orderBy ? ['#4FC15433', '#A7B74833', '#FF918957'] : ['#FF918957', '#A7B74833', '#4FC15433'];
//       const colorsText = !orderBy ? ['#4FC154', '#A7B748', '#FB6257'] : ['#FB6257', '#A7B748', '#4FC154'];

//       data.filter((obj) => !!obj).map((obj) => {
//         const relativePosition = (obj.citation_count - min) / range;
//         return {
//           ...obj,
//           colorBox: colorsBox[Math.floor((1 - relativePosition) * (colorsBox.length - 1))],
//           colorText: colorsText[Math.floor((1 - relativePosition) * (colorsText.length - 1))],
//         }
//       })
//     }

//     if (selectedOption === 'date') {
//       data.filter((obj) => obj.colorBox === undefined).map((obj, i) => ({
//         ...obj,
//         colorBox: data[i-1]?.colorBox,
//         colorText: data[i-1]?.colorText,
//       }));
//     }
//   }
//   return data;
// }

export const boxCitation = (
  data: UserInPaperType["paper"][],
  selectedOption: string,
) => {
  let new_data = data;
  if (data && Array.isArray(data)) {
    let orderBy = false;
    if (data[0]) {
      if (data[0]?.citation_count < 1) {
        orderBy = true;
      }
    }
    // const min = data[data.length - 1]?.citation_count;
    // const max = data[0]?.citation_count;
    const min = get(minBy(data, o => o.citation_count), 'citation_count', 0);
    const max = get(maxBy(data, o => o.citation_count), 'citation_count', 0);

    if (min !== undefined && max !== undefined) {
      const range = max - min;
      const colorsBox = !orderBy
        ? ["#4FC15433", "#A7B74833", "#FF918957"]
        : ["#FF918957", "#A7B74833", "#4FC15433"];
      const colorsText = !orderBy
        ? ["#4FC154", "#A7B748", "#FB6257"]
        : ["#FB6257", "#A7B748", "#4FC154"];

      new_data = data.map((obj) => {
        const relativePosition = (obj.citation_count - min) / range;
        const colorsBox_calc =
          Math.floor((1 - relativePosition) * (colorsBox.length - 1)) || 0;
        const colorsText_calc =
          Math.floor((1 - relativePosition) * (colorsText.length - 1)) || 0;
        return {
          ...obj,
          colorBox: colorsBox[colorsBox_calc],
          colorText: colorsText[colorsText_calc],
        };
      });
    }

    // if (selectedOption === SORT_BY.PUB_DATE) {
    //   new_data = data.map((obj, i) => {
    //     if(obj.colorBox === undefined){
    //       // obj.colorBox = data[i-1]?.colorBox
    //       // obj.colorText = data[i-1]?.colorText
    //       return {
    //         ...obj,
    //         colorBox: data[i-1]?.colorBox,
    //         colorText: data[i-1]?.colorTextcolorBox,
    //       }
    //     }
    //     return obj
    //   });
    // }
  }
  return new_data;
};
