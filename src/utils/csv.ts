import { type UserInPaperType } from "~/types/types";

export const createCsv = (data: UserInPaperType[]) => {
  let count = 0;
  let csvData = 'Paper title, Paper Journal, Publication Date, Citation Count,';
  let hasConditions = false;

  for (const d of data) {
    if(d.paper){
      if(Object.keys(d.paper.paper_condition_value).length > 0){
        hasConditions = true;
        d.paper?.paper_condition_value.forEach((condition) => {
          csvData += condition.condition.condition_display_name + ',';
        });
        csvData += '\n';
        break;
      }
    }
  };
  data.map((d: UserInPaperType) => {
    count++;
    if(d.paper){
      if(Object.keys(d.paper.paper_condition_value).length > 0){
        csvData += `"${d.paper?.title}","${d.paper?.journal.long_name}","${d.paper?.pub_date as unknown as string}","${d.paper?.citation_count}",`;
        d.paper?.paper_condition_value.map((condition) => {
          csvData += `"${condition.value}",`;
        });
        
        csvData += '\n';
      } else {
        if(!hasConditions){
          csvData += '\n';
        }
        csvData += `"${d.paper?.title}","${d.paper?.journal.long_name}","${d.paper?.pub_date as unknown as string}","${d.paper?.citation_count}"\n`;
      }
    }
  })

  const anchor = document.createElement('a');
  anchor.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
  anchor.target = '_blank';
  anchor.download = 'download.csv';
  anchor.click();
}