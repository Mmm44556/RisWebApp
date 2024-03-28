import { useQuery, useMutation } from '@tanstack/react-query';
import { createToast } from '@utils/systemToastify';

//獲取所有報告分類數量
function useDepartmentFiles() {

  const result = useQuery({
    queryKey: ['department_Reports'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_VAR_BASE_URL}/dataList`
        , {
          method: 'GET',
          headers: {
            "Accept": "application/json"
          }
        },
      )
      return await res.json();
    },
    initialData: () => {
   
      return ({
        data: [{ INTERNAL: 0 },
        { SURGERY: 0 },
        { ORTHOPEDICS: 0 },
        { RADIOLOGY: 0 },
        { PROPOSAL: 0 },
        { REVIEWS: 0 },
        { PRECESS: 0 }]
      })

    }
  })
  return result;
}

//更新所有報告分類數量
function updateDepartmentReportsCounts(queryClient) {
  const mutate = useMutation({
    mutationFn: async ({ department, count }) => {
      const upperCaseD = department.toUpperCase();
      const departmentReports = queryClient.getQueryData(["department_Reports"]);
      const updatedDepartments = departmentReports.data.map(e => {
        if (Object.hasOwn(e, upperCaseD)) {
          return { [upperCaseD]: e[upperCaseD] + count };
        }
        return e;
      })
      queryClient.setQueryData(["department_Reports"], { status: '200', data: updatedDepartments });
      return updatedDepartments;
    },
    onMutate: async () => {

    },
    onSuccess: async () => {
      console.log('更新完成')
    }
  })
  return mutate;
}
//更新當前部門底下的特定病患資料
function useUpdatedAllReport(queryClient) {
  const mutate = useMutation({
    mutationFn: async ({ oldData, currentData }) => {
      const { data } = oldData;
      const updatedData = { ...oldData, reports: [currentData] }
      //轉換成blob存入FORM格式
      const jsonForm = JSON.stringify(updatedData);
      const blobRes = new Blob([jsonForm], { type: 'application/json' });
      const formData = new FormData();
      formData.append('response', blobRes, '.json');

      const result = await fetch(`${import.meta.env.VITE_VAR_BASE_URL}/dataList/${data.department}`
        , {
          method: 'PUT',
          headers: {
            "Accept": "application/json"
          },
          body: formData,
        },
      );
      const jsonResult = await result.json();
      if (jsonResult.status == 200) {
        return jsonResult
      }
      throw new Error(jsonResult.msg);

    },
    onMutate: async ({ oldData, currentData }) => {
      const data = queryClient.getQueryData(['department', oldData.data.department]);
      const filteredData = data.map(e => {
        if (e.fileId == oldData.fileId) {
          return oldData;
        }
        return e
      });
      queryClient.setQueryData(['department', oldData.data.department], filteredData);
      createToast(`資料更新中...`, {
        type: 'info',
        theme: 'colored',
        position: "bottom-right",
        autoClose: 3500
      });

      return filteredData;
    },
    onSuccess: async (res) => {
      createToast(res.msg, {
        type: 'success',
        theme: 'colored',
        position: "bottom-right",
        autoClose: 4000
      });
    },
    onError: async (err) => {
      createToast(err.message, {
        type: 'error',
        theme: 'colored',
        position: "bottom-right",
        autoClose: 5000
      });
    }
  })
  return mutate;
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

export { useDepartmentFiles, updateDepartmentReportsCounts, useUpdatedAllReport, reCategory };