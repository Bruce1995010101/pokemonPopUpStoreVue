export const useAuth = () => {

    // 🔹 取得當前使用者
    const checkUserAuthority = async () => {
        const result = await useAsyncData(
            "checkUserAuthority",
            async () => {
                return await $fetch("http://localhost:3000/checkUserAuthority", {
                    credentials: "include",
                });
            }
        );
        // console.log('useAuth',result.data.value);



        if (result.data.value.accountAuthority !== undefined) {
            // console.log('useAuthTrue', result.data.value);
            return result.data.value;
        } else {
            return false
        }
    };

    return { checkUserAuthority };
};
