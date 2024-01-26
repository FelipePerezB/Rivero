// const { data: res } = (await api(`users/cache/progress/${subjectId}`, {
//   cache: "no-store",
//   method: "POST",
//   body: JSON.stringify({
//     content: lessonProgress,
//   }),
// })) as {
//   data: string;
// };

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

