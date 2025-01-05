import { create } from "zustand";
import { Recommendation, RecommendationsId } from "../types";

interface RecomendationStore {
  likedGroups: Recommendation[]; // 좋아요한 그룹 ID 목록
  toggleLike: (groupId: number) => void;
}

// export const useRecomendationStore = create<RecomendationStore>(persist(set) => ({
//   likedGroup: [],
//   toggleLike: (groupId: any) => set((state: { likedGroup: any[]; }) => ({
//     likeGroups : state.likedGroup.includes(groupId)
//     ? state.likedGroup.filter((id: any) => id !== groupId)
//     : [...state.likedGroup, groupId]
//   }))
// }));


function persist(set: any) {
  throw new Error("Function not implemented.");
}
