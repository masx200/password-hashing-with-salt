import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const passlength = useSignal(15);
  const passincrement = $(function () {
    passlength.value++;
    passlength.value = Math.min(passlength.value, 50);
  });

  const passdecrement = $(function () {
    passlength.value--;
    passlength.value = Math.max(passlength.value, 1);
  });
  const onsubmit = $(async function (e: SubmitEvent) {
    // console.log(e);
    e.preventDefault();
  });
  return (
    <>
      <div
        style="
        display: flex;
        width: 100%;
        flex-direction: column;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        align-items: center;
      "
      >
        <img
          style="opacity: 0.7"
          width={250}
          height={150}
          src="./v2-1247d1214f9f61d8cb4ad7ad63bbc3d2_1440w.jpg"
          class="img-fluid"
          alt="哈希算法"
        />

        <div
          style="
          opacity: 0.8;
          margin: 0;
          background-color: white;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: auto;
        "
        >
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
              <input type="text" id="password" required class="form-control" />
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
                          type="range"
                          min="1"
                          max="50"
                          class="slider"
                          style="
                          background: linear-gradient(
                            90deg,
                            transparent 28.5714%,
                            rgb(0, 112, 246) 28.6714%
                          );
                        "
                        />
                        <div
                          id="slider-border-part"
                          style="--slider-border-part-width: 28.571428571428573%"
                        ></div>
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

            <button type="button" id="generatepassword" class="btn btn-primary">
              Generate
            </button>
            <label>
              <span style="text-align: center">
                <strong>Algorithm:</strong>
              </span>
              <select id="algorithm" class="form-select">
                <option value="SHA-256">SHA-256</option>
                <option value="SHA-384">SHA-384</option>
                <option value="SHA-512" selected>
                  SHA-512
                </option>
              </select>
            </label>
            <button type="button" id="button" class="btn btn-primary">
              Generate
            </button>
          </form>
          <div id="result">
            <table
              class="table table-bordered border-primary"
              style="margin: 0 auto; border-collapse: collapse; width: 100%"
            >
              <thead>
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
                  <td id="algorithm-table"></td>
                </tr>
                <tr>
                  <td>
                    <strong>Password:</strong>
                  </td>
                  <td id="password-table"></td>
                </tr>
                <tr>
                  <td>
                    <strong>Salt:</strong>
                  </td>
                  <td id="salt-table"></td>
                </tr>
                <tr>
                  <td>
                    <strong>Hash:</strong>
                  </td>
                  <td id="hash-table"></td>
                </tr>
              </tbody>
            </table>
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
      content: "Qwik site description",
    },
  ],
};
