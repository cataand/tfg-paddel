import Head from "next/head";
import { SubmitHandler } from "react-hook-form";
import axios, { AxiosError, AxiosProgressEvent } from "axios";
import { useState } from "react";
import PredictForm, { PredictInputs } from "@/components/PredictForm";
import SmallNav from "@/components/SmallNav";
import Footer from "@/components/Footer";

const Home = () => {
  const [progress, setProgress] = useState<number>(0);
  const [uploadSpeed, setUploadSpeed] = useState<number>(NaN);
  const [submitted, setSubmittend] = useState<boolean>(false);
  const [uploadFinished, setUploadFinished] = useState<boolean>(false);
  const [result, setResult] = useState<object>();

  const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_LOCATION,
  });

  const onSubmit: SubmitHandler<PredictInputs> = (data) => {
    setSubmittend(true);

    const formData = new FormData();
    formData.append("video_hand", data.videoHand);
    formData.append("dominant_hand", data.dominantHand);
    formData.append("age", data.age);
    formData.append("sex", data.sex);
    formData.append("video", data.video[0]);

    http
      .post("/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e: AxiosProgressEvent) => {
          setProgress((100 * e.loaded) / e.total!);
          setUploadSpeed(e.rate! / 1000000);
          setUploadFinished(e.loaded === e.total!);
        },
      })
      .then((r) => r.data)
      .then((data) => setResult(data))
      .catch((e: AxiosError) =>
        setResult({ result: "error", message: e.message })
      );
  };

  return (
    <>
      <Head>
        <title>PaDDeL</title>
      </Head>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SmallNav></SmallNav>

        {!submitted && !result && (
          <PredictForm onSubmit={onSubmit}></PredictForm>
        )}
        {submitted && !result && (
          <>
            <div className="mt-8 border-b border-zinc-900/10 pb-8 dark:border-white/10">
              <div className="h-1.5 w-full rounded-sm bg-zinc-200 dark:bg-zinc-700">
                <div
                  className="h-1.5 rounded-sm bg-indigo-600 dark:bg-indigo-400"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div
                className="mt-2 flex justify-between text-sm"
                id="email-error"
              >
                <span>{uploadSpeed.toFixed(2)} MB/s</span>
                {!uploadFinished && <span>Enviando datos...</span>}
                {uploadFinished && <span>Datos enviados</span>}
                <span>{progress.toFixed(2)}%</span>
              </div>
            </div>
            {uploadFinished && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <svg
                  aria-hidden="true"
                  className="h-16 w-16 animate-spin fill-indigo-600 text-zinc-200 dark:fill-indigo-400 dark:text-zinc-700"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="text-sm">Procesando datos...</span>
              </div>
            )}
          </>
        )}

        {result && <span>{JSON.stringify(result)}</span>}

        <Footer></Footer>
      </div>
    </>
  );
};

export default Home;
