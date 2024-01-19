import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;
const timerProps = {
    isPlaying: true,
    size: 50,
    strokeWidth: 3
};

const renderTime = (dimension, time) => {
    if (dimension === "hours" && time === 0) {
        return null; // Do not render the component if the time is zero
    }
    const formattedTime = time < 10 ? `0${time}` : time; // Add leading zero for single-digit values
    if (dimension === "seconds") {
        return (
            <div className="time-wrapper">
                <div className="time" style={{ fontSize: "15px" }}>{formattedTime}</div>
            </div>
        );
    }
    return (
        <div className="time-wrapper">
            <div className="time" style={{ fontSize: "15px" }} >{formattedTime}:</div>
        </div>
    );
};

const getTimeHours = (time) => (time / hourSeconds) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeSeconds = (time) => time % minuteSeconds | 0;

export default function CountDownTimer({ totalTime, setModal }) {

    const startTime = Date.now() / 1000;
    const endTime = startTime + totalTime; // set the countdown duration  
    const remainingTime = endTime - startTime;
    const fourtyPercent = (40 / 100) * remainingTime
    const eightyPercent = (80 / 100) * remainingTime

    return (
        <div className="App">
            <CountdownCircleTimer
                {...timerProps}
                colors={["#4CBB17", "#004777", "#F7B801", "#A30000"]}
                colorsTime={[remainingTime, eightyPercent, fourtyPercent, 0]}
                duration={remainingTime}
                initialRemainingTime={remainingTime}
                onComplete={() => ({
                    shouldRepeat: false
                }, setModal(true))}
            >
                {({ elapsedTime, color }) => (
                    <>
                        <span style={{ color }} >
                            {renderTime("hours", getTimeHours(remainingTime - elapsedTime))}
                        </span>
                        <span style={{ color }}>
                            {renderTime(
                                "minutes",
                                getTimeMinutes(remainingTime - elapsedTime)
                            )}
                        </span>{" "}
                        <span style={{ color }}>
                            {renderTime(
                                "seconds",
                                getTimeSeconds(remainingTime - elapsedTime)
                            )}
                        </span>
                    </>
                )}
            </CountdownCircleTimer>
        </div>
    );
}
