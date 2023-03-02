import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import scheme from "../Images/main.png";
import waterPart1 from "../Images/water1.png";
import waterPart2 from "../Images/water2.png";
import waterPart3 from "../Images/water3.png";
import waterPart4 from "../Images/water4.png";
import pipes from "../Images/pipes.png";
import boilerFirst from "../Images/firefirst.png";
import boilerSecond from "../Images/firesecond.png";
import boilerThird from "../Images/firethird.png";
import all from "../Images/all.png";
import styles from "./ShemePage.module.css";
import {Image} from "antd";

const SchemePage = () => {
    const params = useSelector(state => state.params.params);
    const returnPressure = params.filter(param => param.device_id === "14783441")[0]?.value;
    const boilerCircuit = params.filter(param => param.device_id === "14783501")[0]?.value;
    const pumpDifference = params.filter(param => param.device_id === "14783465")[0]?.value;
    const pressureBefore = params.filter(param => param.device_id === "14783591")[0]?.value;
    const tempFiling = params.filter(param => param.device_id === "14783567")[0]?.value;
    const tempReturn = params.filter(param => param.device_id === "14783639")[0]?.value;
    const rawWater = params.filter(param => param.device_id === "14783435")[0]?.value;

    const FetchWaterParam = params.filter(param => param.device_id === "14784365")[0]?.value;
    const[waterParam, setWaterParam] = useState("");
    useEffect(() => {
        if (FetchWaterParam === "1") {
            setWaterParam(waterPart1)
        }
        if (FetchWaterParam === "2") {
            setWaterParam(waterPart2)
        }
        if (FetchWaterParam === "3") {
            setWaterParam(waterPart3)
        }
        if (FetchWaterParam === "4") {
            setWaterParam(waterPart4)
        }
        if (FetchWaterParam === "0") {
            setWaterParam("")
        }
    }, [FetchWaterParam])

    const FetchBoilerFirst = params.filter(param => param.device_id === "15270213")[0]?.value;
    const[boilerFirstParam, setBoilerFirstParam] = useState("");
    useEffect(() => {
        if (FetchBoilerFirst > 0) {
            setBoilerFirstParam(boilerFirst)
        }
        else {
            setBoilerFirstParam("")
        }
    }, [FetchBoilerFirst])

    const FetchBoilerSecond= params.filter(param => param.device_id === "15270219")[0]?.value;
    const[boilerSecondParam, setBoilerSecondParam] = useState("");
    useEffect(() => {
        if (FetchBoilerSecond > 0) {
            setBoilerSecondParam(boilerSecond)
        }
        else {
            setBoilerSecondParam("")
        }
    }, [FetchBoilerSecond])

    const FetchBoilerThird= params.filter(param => param.device_id === "15270231")[0]?.value;
    const[boilerThirdParam, setBoilerThirdParam] = useState("");
    useEffect(() => {
        if (FetchBoilerThird > 0) {
            setBoilerThirdParam(boilerThird)
        }
        else {
            setBoilerThirdParam("")
        }
    }, [FetchBoilerThird])

    return (
            <div className={styles.div}>
                <div className={styles.tFirst}>{FetchBoilerFirst}</div>
                <div className={styles.tSecond}>{FetchBoilerSecond}</div>
                <div className={styles.tThird}>{FetchBoilerThird}</div>
                <div className={styles.returnPressure}>{returnPressure}</div>
                <div className={styles.boilerCircuit}>{boilerCircuit}</div>
                <div className={styles.boilerCircuitStaticFirst}>3.553</div>
                <div className={styles.boilerCircuitStaticThird}>0.291</div>
                <div className={styles.pumpDifference}>{pumpDifference}</div>
                <div className={styles.boilerCircuitFive}>3.870</div>
                <div className={styles.boilerCircuitSeven}>4.967</div>
                <div className={styles.pressureBefore}>{pressureBefore}</div>
                <div className={styles.tempFiling}>{tempFiling}</div>
                <div className={styles.tempReturn}>{tempReturn}</div>
                <div className={styles.rawWater}>{rawWater}</div>
                <Image src={scheme} preview={false}/>
                <Image src={pipes} preview={false} rootClassName={styles.Img}/>
                <Image src={waterParam} preview={false} rootClassName={styles.Img}/>
                <Image src={boilerFirstParam} preview={false} rootClassName={styles.Img}/>
                <Image src={boilerSecondParam} preview={false} rootClassName={styles.Img}/>
                <Image src={boilerThirdParam} preview={false} rootClassName={styles.Img}/>
                <Image src={all} preview={false} rootClassName={styles.Img}/>
            </div>
    );
};

export default SchemePage;