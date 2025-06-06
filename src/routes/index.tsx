import {
  $,
  component$,
  type Signal,
  useComputed$,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { debounce } from "lodash-es";
import { hashPasswordWithSalt } from "../../hashPasswordWithSalt.ts";
import { generate32BytePassword } from "../../generate32BytePassword.ts";
import Table, { type DataType } from "../integrations/react/table.tsx";
import "antd/dist/reset.css";
import { TableProps } from "antd";

const generatePassworddebounced = debounce(async function (
  password: string,
  setpassword: (pass: string) => void,
  algorithm: string,
  sethash: (hash: string) => void,
  setalgorithm: (algorithm: string) => void,
  // setpassword: (pass: string) => void,
  settablesalt: (salt: string) => void,
  passlength: number,
) {
  password = generate32BytePassword(passlength);
  setpassword(password);
  await debouncedGenerateHash(
    password,
    setpassword,
    algorithm,
    sethash,
    setalgorithm,
    // setpassword,
    settablesalt,
    passlength,
  );
});
const debouncedGenerateHash = debounce(async function (
  password: string,
  setpassword: (pass: string) => void,
  algorithm: string,
  sethash: (hash: string) => void,
  setalgorithm: (algorithm: string) => void,
  // setpassword: (pass: string) => void,
  settablesalt: (salt: string) => void,
  passlength: number,
) {
  //@ts-ignore

  if (!password) {
    password = generate32BytePassword(passlength);
    setpassword(password);
    //@ts-ignore
  }

  try {
    const result = await hashPasswordWithSalt(password, {
      algorithm,
      saltlength: "SHA-384" == algorithm
        ? 48
        : "SHA-256" == algorithm
        ? 32
        : 64,
    });

    sethash(result.hash);
    // 修改 HTML 模板为表格形式，并居中显示
    //@ts-ignore
    setalgorithm(result.algorithm);
    //@ts-ignore
    setpassword(password);
    //@ts-ignore
    settablesalt(result.salt);
    //@ts-ignore
  } catch (error) {
    console.error("Hashing failed:", error);
    alert("Hashing process failed" + "\n" + String(error));
  }
});
export default component$(() => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "value",
      dataIndex: "value",
      key: "value",
    },
  ];

  const hashref = useSignal("");
  const saltref = useSignal("");
  const password = useSignal(() => generate32BytePassword(15));
  const algorithmref = useSignal("SHA-512");
  const passlength = useSignal(15);

  const percent = useComputed$(() => {
    return Math.round(((passlength.value - 1) / (50 - 1)) * 100);
  });
  const passincrement = $(async function () {
    passlength.value++;
    passlength.value = Math.min(passlength.value, 50);
  });
  const generatePassword = $(async function () {
    await generatePassworddebounced(
      password.value,
      (pass) => {
        password.value = pass;
      },
      algorithmref.value,
      (hash) => {
        hashref.value = hash;
      },
      (algorithm) => {
        algorithmref.value = algorithm;
      },
      // (pass) => {
      //   password.value = pass;
      // },
      (salt) => {
        saltref.value = salt;
      },
      passlength.value,
    );
  });
  const passdecrement = $(async function () {
    passlength.value--;
    passlength.value = Math.max(passlength.value, 1);
  });
  const onsubmit = $(async function (e: SubmitEvent) {
    // console.log(e);
    e.preventDefault();
  });

  const buttonClick = $(async function () {
    await debouncedGenerateHash(
      password.value,
      (pass) => {
        password.value = pass;
      },
      algorithmref.value,
      (hash) => {
        hashref.value = hash;
      },
      (algorithm) => {
        algorithmref.value = algorithm;
      },
      // (pass) => {
      //   password.value = pass;
      // },
      (salt) => {
        saltref.value = salt;
      },
      passlength.value,
    );
  });
  useTask$(async ({ track }) => {
    const algorithmrefvalue = track(() => algorithmref.value);

    const passlengthrefvalue = track(() => passlength.value);
   
    const passwordrefvalue = track(() => password.value);
/* 在密码长度变化时自动重新生成 */
    if (passlengthrefvalue > 0&&passlengthrefvalue!=passwordrefvalue.length) {
      await generatePassworddebounced(
        password.value,
        (pass) => {
          password.value = pass;
        },
        algorithmrefvalue,
        (hash) => {
          hashref.value = hash;
        },
        (algorithm) => {
          algorithmref.value = algorithm;
        },
        // (pass) => {
        //   password.value = pass;
        // },
        (salt) => {
          saltref.value = salt;
        },
        passlengthrefvalue
      );
    }
  });
  useTask$(async ({ track }) => {
    const algorithmrefvalue = track(() => algorithmref.value);

  
    const passwordrefvalue = track(() => password.value);
/* 在密码长度变化时自动重新生成 */
    if (password.value.length > 0) {
      await debouncedGenerateHash(
        passwordrefvalue,
        (pass) => {
          password.value = pass;
        },
        algorithmrefvalue,
        (hash) => {
          hashref.value = hash;
        },
        (algorithm) => {
          algorithmref.value = algorithm;
        },
        // (pass) => {
        //   password.value = pass;
        // },
        (salt) => {
          saltref.value = salt;
        },
        passlength.value,
      );
    }
  });
  const datasource: Signal<DataType[]> = useComputed$(() => [
    {
      key: "1",
      name: "Algorithm",

      value: algorithmref.value,
    },
    {
      key: "2",
      name: "Password",

      value: password.value,
    },
    {
      key: "3",
      name: "Salt",

      value: saltref.value,
    },
    {
      key: "4",
      name: "Hash",

      value: hashref.value,
    },
  ]);
  console.log(columns, datasource.value);
  return (
    <>
      <div style="
        display: flex;
        width: 100%;
        flex-direction: column;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        align-items: center;
      ">
        <img
          style="opacity: 0.8"
          width={250}
          height={150}
          src="./v2-1247d1214f9f61d8cb4ad7ad63bbc3d2_1440w.jpg"
          class="img-fluid"
          alt="哈希算法"
        />

        <div style="
          opacity: 0.9;
          margin: 0;
          background-color: white;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: auto;
        ">
          <h1 class="mb-3 fw-semibold lh-1">Password Hashing Tool</h1>

          <form
            preventdefault:submit
            onSubmit$={onsubmit}
            id="form"
            style="
            display: flex;
            flex-direction: column;
            gap: 15px;
            width: 100%;
            justify-content: center;
            align-content: center;
            align-items: stretch;
          "
          >
            <label>
              <span style="text-align: center">
                <strong>Password:</strong>
              </span>
              <input
                type="text"
                id="password"
                required
                class="form-control"
                bind:value={password}
              />
            </label>
            <section class="password-generator bg-white">
              <div data-v-1f0937b5="" class="generator-container">
                <div class="generator-settings">
                  <div class="length-settings">
                    <div>
                      <label
                        for="length"
                        class="first body-1 mb-16 mb-lg-0 me-lg-16 me-xl-48"
                      >
                        <span>密码长度</span>:
                        <span class="ms-8 ms-lg-16 fw-bold body-2">
                          {passlength.value}
                        </span>
                      </label>
                    </div>
                    <div class="slider-settings">
                      <button
                        onclick$={passdecrement}
                        preventdefault:click
                        class="button-circle outline size-md theme-dark shadow-none me-12"
                      >
                        <div role="img" class="icon icon-16 icon-minus"></div>
                      </button>
                      <div class="slider-container">
                        <input
                          bind:value={passlength}
                          type="range"
                          min="1"
                          max="50"
                          class="slider"
                          style={`background: linear-gradient(
                            90deg,
                            transparent ${percent.value}%,
                            rgb(0, 112, 246) ${percent.value}%
                          );
                            `}
                        />
                        <div
                          id="slider-border-part"
                          style={`--slider-border-part-width: ${percent.value}%`}
                        >
                        </div>
                      </div>
                      <button
                        preventdefault:click
                        class="button-circle outline size-md theme-dark shadow-none ms-12"
                        onclick$={passincrement}
                      >
                        <div role="img" class="icon icon-16 icon-plus"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <button
              type="button"
              id="generatepassword"
              class="btn btn-primary"
              preventdefault:click
              onclick$={generatePassword}
            >
              Generate
            </button>
            <label>
              <span style="text-align: center">
                <strong>Algorithm:</strong>
              </span>
              <select
                id="algorithm"
                class="form-select"
                bind:value={algorithmref}
              >
                <option value="SHA-256">SHA-256</option>
                <option value="SHA-384">SHA-384</option>
                <option value="SHA-512" selected>
                  SHA-512
                </option>
              </select>
            </label>
            <button
              type="button"
              id="button"
              class="btn btn-primary"
              preventdefault:click
              onclick$={buttonClick}
            >
              Generate
            </button>
          </form>
          <div id="result" class="ant-app css-var-«r6»">
            <Table columns={columns} dataSource={datasource.value} />
            {
              /* <table
              class="table table-bordered border-primary"
              style="margin: 0 auto; border-collapse: collapse; width: 100%"
            >
              <thead class="table-light">
                <tr>
                  <th>参数</th>
                  <th>值</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Algorithm:</strong>
                  </td>
                  <td id="algorithm-table">{algorithmref.value}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Password:</strong>
                  </td>
                  <td id="password-table">{password.value}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Salt:</strong>
                  </td>
                  <td id="salt-table">{saltref.value}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Hash:</strong>
                  </td>
                  <td id="hash-table">{hashref.value}</td>
                </tr>
              </tbody>
            </table> */
            }
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Password Hashing with Salt",
  meta: [
    {
      name: "description",
      content: "Password Hashing with Salt",
    },
  ],
};
