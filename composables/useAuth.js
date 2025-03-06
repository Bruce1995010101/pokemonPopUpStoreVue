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
        if (!result.data.value.account) {
            // console.log(result.data.value.account);
            // window.location.href = "/";
            navigateTo('/'); 

        }
    };

    return { checkUserAuthority };
};
