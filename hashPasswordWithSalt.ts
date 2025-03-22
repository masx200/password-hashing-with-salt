async function hashPasswordWithSalt(
    password: string,
    options: Options = { algorithm: "SHA-512", saltlength: 64 },
): Promise<HashResult> {
    // 1. 生成16字节的随机盐值 [[2]][[4]]
    let { algorithm, saltlength, saltHex } = options;
    algorithm = algorithm.toUpperCase();
    //检测算法是否支持 "SHA-256"
    // "SHA-384"
    // "SHA-512"
    if (!["SHA-256", "SHA-384", "SHA-512"].includes(algorithm)) {
        throw new Error("algorithm not supported");
    }
    let salt: Uint8Array;
    if (saltHex) {
        // 如果传入了十六进制盐值字符串，将其转换为 Uint8Array
        salt = hexToUint8Array(saltHex);
    } else {
        // 否则，生成随机盐值
        salt = new Uint8Array(saltlength ?? 64);
        crypto.getRandomValues(salt);
    }
    // crypto.getRandomValues(salt);

    // 2. 将密码转换为UTF-8字节数组 [[7]]
    const encoder = new TextEncoder();
    const passwordBytes = encoder.encode(password);

    // 3. 合并盐值和密码（盐值在前，密码在后）[[4]]
    const merged = new Uint8Array(salt.length + passwordBytes.length);
    merged.set(salt);
    merged.set(passwordBytes, salt.length);

    // 4. 计算SHA-512哈希 [[5]][[7]]
    const hashBuffer = await crypto.subtle.digest(algorithm, merged);

    // 5. 转换为十六进制字符串 [[3]][[10]]

    return new HashResult({
        hash: toHex(hashBuffer),
        // 64字节的哈希值（SHA-512输出512位=64字节）
        salt: toHex(salt),
        algorithm, // 16字节的盐值
    });
}
function toHex(buffer: ArrayBuffer | Uint8Array) {
    return Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}
export interface Options {
    algorithm: string;
    saltlength?: number;
    saltHex?: string;
}
// 使用示例
export function hexToUint8Array(hex: string): Uint8Array {
    const array = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        array[i / 2] = parseInt(hex.slice(i, i + 2), 16);
    }
    return array;
}
export { hashPasswordWithSalt };
export { toHex };
class HashResult {
    hash: string;
    salt: string;
    algorithm: string;

    constructor({
        hash,
        salt,
        algorithm,
    }: {
        hash: string;
        salt: string;
        algorithm: string;
    }) {
        this.hash = hash;
        this.salt = salt;
        this.algorithm = algorithm;
    }

    toString(): string {
        return `HashResult {\n hash: "${this.hash}",\n salt: "${this.salt}",\n algorithm: "${this.algorithm}" \n}`;
    }
}
export { HashResult };
