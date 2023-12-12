import { useQuery } from '@tanstack/react-query';


function useDepartmentFiles() {

  const result = useQuery({
    queryKey: ['department_Reports'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_VAR_BASE_URL}/dataList`
        , {
          method: 'GET',
          headers:{
            "Accept":"application/json"
          }
          
        },
      )

      return await res.json()
    },
    staleTime:30000,
    // retry: 1,
    retryDelay: 1500,
    // refetchOnWindowFocus: true,


  })


  return result;

}

//反轉Department的Key value資料
function reCategory(data) {

  const categories = {
    INTERNAL: '內科',
    SURGERY: '外科',
    ORTHOPEDICS: '骨科',
    RADIOLOGY: '放射科',
    PROPOSAL: '臨床醫師未提回',
    REVIEWS: '報告覆閱工作',
    PROCESS: '本周已完成報告'
  };

  const medicalCategories = ['內科', '外科', '骨科', '放射科'];
  const adminCategories = ['臨床醫師未提回', '報告覆閱工作'];
  const process = ['本周已完成報告'];

  const result = {
    medical: [],
    admin: [],
    process: []
  };

  data.forEach(item => {
    const key = Object.keys(item)[0];
    const value = item[key];
    if (key in categories) {
      const category = categories[key];
      if (medicalCategories.includes(category)) {
        result.medical.push({ category, value });
      } else if (adminCategories.includes(category)) {
        result.admin.push({ category, value });
      } else if (process.includes(category)) {
        result.process.push({ category, value });
      }
    } else if (key === 'process') {
      result.process = value;
    }
  });

  const resultArray = Object.values(result);


  return resultArray;
}

export { useDepartmentFiles, reCategory };