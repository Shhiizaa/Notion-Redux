export const selectUserId = (store) => store.user.data?.id;
export const selectUserEmail = (store) => store.user.data?.email;
export const selectLoading = (store) => store.user.loading;
export const selectCreatedAt = (store) => store.user.data.createdAt;
