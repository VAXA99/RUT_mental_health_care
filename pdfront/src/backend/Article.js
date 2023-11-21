// import axios from "axios";
// import baseUrl from "../base-url";
//
//
// const validateStatus = status => (status >= 200 && status <= 300) || [500].includes(status);
//
// const articleBaseUrl = baseUrl + '/articles'
// export default {
//     writeArticle: async(data) => {
//         try {
//             let response = await axios.post(articleBaseUrl + '/write',
//                 data,
//                 {
//                     validateStatus,
//                 },
//                 {headers: {
//                     'Authorization': `Bearer ${}`
//                     }
//         })
//     }
// }