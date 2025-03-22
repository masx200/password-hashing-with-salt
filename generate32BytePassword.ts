function generate32BytePassword() {
    const charset = "abcdefghijklmnopqrstuvwxyz0123456789"; // 字符集定义 [[6]][[8]]
    const randomValues = new Uint8Array(32); // 生成32字节的随机值 [[2]][[9]]
    crypto.getRandomValues(randomValues); // 加密安全的随机数生成 [[3]][[4]]

    let password = "";
    for (let i = 0; i < 32; i++) {
        const index = randomValues[i] % charset.length; // 取模确保字符集范围
        password += charset[index];
    }
    return password;
}
export { generate32BytePassword };
// 使用示例
