import { debounce } from "lodash-es";
import { generate32BytePassword } from "./generate32BytePassword.ts";
import { hashPasswordWithSalt } from "./hashPasswordWithSalt.ts";
const debouncedGenerateHash = debounce(async function () {
    //@ts-ignore
    let password = document.getElementById("password").value;
    //@ts-ignore
    const algorithm = document.getElementById("algorithm").value;

    if (!password) {
        //@ts-ignore
        password =
            //@ts-ignore
            document.getElementById("password").value =
                generate32BytePassword();
    }

    try {
        const result = await hashPasswordWithSalt(password, {
            algorithm,
            saltlength:
                "SHA-384" == algorithm ? 48 : "SHA-256" == algorithm ? 32 : 64,
        });
        // 修改 HTML 模板为表格形式，并居中显示
        //@ts-ignore
        document.getElementById("hash-table").innerHTML = `${result.hash}`;
        //@ts-ignore
        document.getElementById("algorithm-table").innerHTML =
            `${result.algorithm}`;
        //@ts-ignore
        document.getElementById("password-table").innerHTML = `${password}`;
        //@ts-ignore
        document.getElementById("salt-table").innerHTML = `${result.salt}`;
    } catch (error) {
        console.error("Hashing failed:", error);
        alert("Hashing process failed");
    }
});

const generatePassword = debounce(async function () {
    //@ts-ignore
    document.getElementById("password").value = generate32BytePassword();
    await debouncedGenerateHash();
});

document.addEventListener(
    "DOMContentLoaded",
    function () {
        //@ts-ignore
        document.getElementById("button").onclick = async () => {
            await debouncedGenerateHash();
        };
        //@ts-ignore
        document.getElementById("generatepassword").onclick = async () => {
            await generatePassword();
        };
        //@ts-ignore
        document.getElementById("password").oninput = async () => {
            //@ts-ignore

            if (document.getElementById("password")?.value.length > 0) {
                await debouncedGenerateHash();
            }
        };
        //@ts-ignore
        document.getElementById("password").onchange = async () => {
            //@ts-ignore
            if (document.getElementById("password")?.value.length > 0) {
                await debouncedGenerateHash();
            }
        };

        // 通过 id 获取 select 元素
        const selectElement = document.getElementById("algorithm");

        // 绑定 change 事件
        //@ts-ignore
        selectElement.addEventListener("change", async function () {
            // 执行其他操作...
            //@ts-ignore
            if (document.getElementById("password")?.value.length > 0) {
                await debouncedGenerateHash();
            }
        });
    },
    { once: true },
);
