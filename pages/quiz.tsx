import React, { useContext, useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import AnswerBroad from "../Components/Quiz/AnswerBroad";
import Clock from "../Components/Quiz/Clock";
import QuizBody from "../Components/Quiz/QuizBody";
import SubmitBases from "../Components/Quiz/SubmitBases";
import Module from "../Components/Utils/Module";
import Timer from "../Components/Utils/Timer";
import { Store } from "../Data/Store/Store";
import { useCountdownTimer } from "use-countdown-timer";
import Head from "next/head";
export default function quiz() {
  // const [openModule, setOpenModule] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [timer, setTimer] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isActive, setIsActive] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state, dispatch } = useContext(Store);

  const { answer, currantQuestionId } = state;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: 1000 * 30,
  });
  const totalCorrectAns = answer?.filter(
    (list: { correct: boolean }) => list.correct
  ).length;
  const totalWrongAns = answer?.filter(
    (list: { correct: boolean }) => !list.correct
  ).length;

  // function toggle() {
  //   setIsActive(!isActive);
  // }

  // function reset() {
  //   setTimer(0);
  //   setIsActive(false);
  // }

  // if (timer == 4) {
  //   setIsActive(false);
  // }

  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   let interval: NodeJS.Timeout;
  //   if (isActive) {
  //     interval = setInterval(() => {
  //       setTimer((timer) => timer + 1);
  //     }, 1000);
  //   } else if (!isActive) {
  //     console.log("bi");
  //     clearInterval(interval);
  //   } else if (timer >= 30) {
  //     console.log("hi");
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [isActive, timer]);

  return (
    <Layout>
      <div>
        <Head>
          <title>Sajeeb Ahmed-Quiz</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/logo.png" />
        </Head>
      </div>
      <div className=" grid grid-cols-8 w-full">
        <div className="col-span-8 lg:col-span-6">
          <QuizBody
            countdown={countdown / 1000}
            start={start}
            reset={reset}
          ></QuizBody>
        </div>
        <div className=" col-span-2 hidden lg:block">
          <div className=" flex flex-col justify-center items-center ">
            <Clock time={countdown / 1000}></Clock>
            <div className=" flex ">
              <Timer time={countdown / 1000} type="mileSec"></Timer>
              <Timer time={countdown / 1000} type="Sec"></Timer>
            </div>
          </div>

          <AnswerBroad></AnswerBroad>
          <div className=" flex flex-col justify-evenly mt-4">
            <SubmitBases totalAns={totalCorrectAns} />
            <SubmitBases totalAns={totalWrongAns} color="red" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
